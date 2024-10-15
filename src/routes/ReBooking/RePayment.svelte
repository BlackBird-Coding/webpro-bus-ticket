<script>
  import { onMount } from "svelte";
  import Swal from "sweetalert2";
  import qrcode from "@/assets/QRCode.png";
  import { fly } from "svelte/transition";
  import { ArrowRight, Ticket, CreditCard } from "lucide-svelte";
  import { navigate } from "svelte-routing";

  let scheduleID;
  let seatId;
  let bookingId;
  let newPrice = 0;
  let oldPrice = 0;
  let priceDifference = 0;
  let showDetails = false;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    scheduleID = urlParams.get("scheduleID");
    seatId = urlParams.get("seatId");
    bookingId = urlParams.get("bookingId");

    if (scheduleID && seatId && bookingId) {
      fetchBookingDetails();
    }
  });

  async function fetchBookingDetails() {
    try {
      const response = await fetch(`/api/booking/${bookingId}`);
      const bookingData = await response.json();
      oldPrice = bookingData.bookings.Price;

      const newPriceResponse = await fetch(
        `/api/getSchedulePrice/${scheduleID}`
      );
      const newPriceData = await newPriceResponse.json();
      newPrice = newPriceData.price;

      calculatePriceDifference();
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  }

  function calculatePriceDifference() {
    priceDifference = newPrice - oldPrice;
  }

  async function handlePayment() {
    if (priceDifference <= 0) {
      await handleSuccessfulRebooking();
      return;
    }

    const result = await Swal.fire({
      title: "รอสักครู่... กำลังจ่ายเงินให้คุณ",
      imageUrl: qrcode,
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: "QR Code",
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    if (result.dismiss === Swal.DismissReason.timer) {
      await handleSuccessfulPayment();
    }
  }

  async function saveRebookingAndPayment(rebookingData, paymentData) {
    try {
      const response = await fetch("/api/rebook-and-pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rebooking: rebookingData,
          payment: paymentData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save rebooking and payment");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error saving rebooking and payment:", error);
      throw error;
    }
  }

  async function handleSuccessfulRebooking() {
    try {
      const rebookingData = {
        scheduleID,
        seatId,
        bookingId,
      };

      const result = await saveRebookingAndPayment(rebookingData, null);

      Swal.fire({
        icon: "success",
        title: "การจองใหม่สำเร็จ!",
        text: `รหัสการจองใหม่ของคุณคือ ${result.BookingCode}. ไม่จำเป็นต้องชำระเงินเพิ่มเติม.`,
      }).then(() => {
        navigate("/history", { replace: true });
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "โอ๊ะ...",
        text: "เกิดข้อผิดพลาดบางอย่างในกระบวนการจองใหม่.",
      });
    }
  }

  async function handleSuccessfulPayment() {
    try {
      const rebookingData = {
        scheduleID,
        seatId,
        bookingId,
      };

      const paymentData = {
        amount: priceDifference,
        paymentMethod: "QR Code",
      };

      const result = await saveRebookingAndPayment(rebookingData, paymentData);

      Swal.fire({
        icon: "success",
        title: "การจองใหม่สำเร็จ!",
        text: `รหัสการจองใหม่ของคุณคือ ${result.BookingCode}. รหัสการชำระเงิน: ${result.PaymentCode}`,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "โอ๊ะ...",
        text: "เกิดข้อผิดพลาดบางอย่างในกระบวนการจองใหม่และการชำระเงิน.",
      });
    }
  }
</script>

<div class="flex ml-16 gap-5">
  <div class="bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full mx-auto my-10">
    <div class="flex flex-col space-y-4">
      <h2 class="text-2xl font-bold text-gray-800">สรุปการชำระเงิน</h2>

      <div class="flex justify-between items-center">
        <span class="text-gray-600 font-medium">ส่วนต่างที่ต้องชำระ</span>
        <span class="text-2xl font-bold text-blue-600"
          >{priceDifference > 0 ? priceDifference.toFixed(2) : "0.00"} บาท</span
        >
      </div>

      <div
        transition:fly={{ y: 20, duration: 300 }}
        class="bg-gray-50 rounded-md p-4 space-y-3"
      >
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <Ticket size={18} class="text-gray-500 mr-2" />
            <span class="text-gray-600">ราคาตั๋วใหม่</span>
          </div>
          <span class="font-medium">{newPrice.toFixed(2)} บาท</span>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex items-center">
            <Ticket size={18} class="text-gray-500 mr-2" />
            <span class="text-gray-600">ราคาตั๋วเดิม</span>
          </div>
          <span class="font-medium">{oldPrice.toFixed(2)} บาท</span>
        </div>
      </div>

      <button
        on:click={handlePayment}
        class="bg-blue-500 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
      >
        {priceDifference > 0 ? "ดำเนินการชำระเงิน" : "ยืนยันการเปลี่ยนแปลง"}
        <ArrowRight size={18} class="ml-2" />
      </button>
    </div>
  </div>
</div>
