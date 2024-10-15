<script>
  import { onMount } from "svelte";
  import Sidebar from "@/lib/Sidebar.svelte";
  import Swal from "sweetalert2";
  import qrcode from "@/assets/QRCode.png";
  import { fly } from "svelte/transition";
  import { ArrowRight, Ticket, CreditCard } from "lucide-svelte";
  import { navigate } from "svelte-routing";

  let goScheduleID;
  let goSeatId;
  let returnScheduleID;
  let returnSeatId;
  let goPrice = 0;
  let returnPrice = 0;
  let totalPrice = 0;
  let showDetails = false;

  // Form data
  let firstName = "";
  let lastName = "";

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    goScheduleID = urlParams.get("goScheduleID");
    goSeatId = urlParams.get("goSeatId");
    returnScheduleID = urlParams.get("returnScheduleID");
    returnSeatId = urlParams.get("returnSeatId");

    if (goScheduleID && goSeatId) {
      fetch(`/api/getSchedulePrice/${goScheduleID}`)
        .then((response) => response.json())
        .then((data) => {
          goPrice = data.price;
          updateTotalPrice();
        });
    }

    if (returnScheduleID && returnSeatId) {
      fetch(`/api/getSchedulePrice/${returnScheduleID}`)
        .then((response) => response.json())
        .then((data) => {
          returnPrice = data.price;
          updateTotalPrice();
        });
    }

    fetch("/api/user")
      .then((response) => response.json())
      .then((userData) => {
        firstName = userData.user.details.fname;
        lastName = userData.user.details.lname;
      });
  });

  function updateTotalPrice() {
    totalPrice = goPrice + returnPrice;
  }

  async function handlePayment() {
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

  async function saveBookingAndPayment(bookingData, paymentData) {
    try {
      const response = await fetch("/api/book-and-pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          booking: bookingData,
          payment: paymentData,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save booking and payment");
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error saving booking and payment:", error);
      throw error;
    }
  }

  async function handleSuccessfulPayment() {
    try {
      const bookingData = {
        goScheduleID,
        goSeatId,
        returnScheduleID,
        returnSeatId,
      };

      const paymentData = {
        amount: totalPrice,
        paymentMethod: "QR Code",
      };

      const result = await saveBookingAndPayment(bookingData, paymentData);

      Swal.fire({
        icon: "success",
        title: "Booking Successful!",
      }).then(() => {
        navigate("/history");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong with the booking process.",
      });
    }
  }
</script>

<div class="flex ml-16 gap-5">
  <Sidebar current={3}></Sidebar>
  <div class="w-3/5 p-5 ml-10 flex flex-col gap-5">
    <div class="text-3xl font-semibold">Complete your order</div>
    <div class="flex flex-col text-xl mt-5 gap-5">
      <div>Personal Details</div>
      <div class="flex gap-5 text-lg">
        <input
          value={firstName}
          class="border border-gray-400 pl-2 rounded-md w-3/6 bg-gray-200"
          type="text"
          placeholder="ชื่อ"
          disabled
        />
        <input
          value={lastName}
          class="border border-gray-400 pl-2 rounded-md w-3/6 bg-gray-200"
          type="text"
          placeholder="นามสกุล"
          disabled
        />
      </div>
    </div>
    <!-- <div class="flex flex-col text-xl mt-5 gap-5">
      <div>ข้อมูลผู้ติดต่อ</div>
      <div class="flex flex-col gap-4 text-lg">
        <label for="contact-first-name" class="ml-2 w-1/5">ชื่อ</label>
        <input
          id="contact-first-name"
          bind:value={contactFirstName}
          class="border border-gray-400 pl-2 rounded-md w-full"
          type="text"
          placeholder="ชื่อผู้ติดต่อ"
          required
        />
      </div>

      <div class="flex flex-col gap-4 text-lg">
        <label for="contact-last-name" class="ml-2 w-1/5">นามสกุล</label>
        <input
          id="contact-last-name"
          bind:value={contactLastName}
          class="border border-gray-400 pl-2 rounded-md w-full"
          type="text"
          placeholder="นามสกุลผู้ติดต่อ"
          required
        />
      </div>

      <div class="flex flex-col gap-4 text-lg">
        <label for="phone" class="ml-2 w-1/5">โทรศัพท์มือถือ</label>
        <input
          id="phone"
          bind:value={phone}
          class="border border-gray-400 pl-2 rounded-md w-full"
          type="text"
          placeholder="หมายเลขโทรศัพท์มือถือ"
          required
        />
      </div>

      <div class="flex flex-col gap-4 text-lg">
        <label for="email" class="ml-2 w-1/5">อีเมล</label>
        <input
          id="email"
          bind:value={email}
          class="border border-gray-400 pl-2 rounded-md w-full"
          type="email"
          placeholder="กรอกอีเมล (ถ้ามี) เพื่อรับข้อมูลการจอง"
        />
      </div>
    </div> -->
  </div>
  <div class="bg-white rounded-lg shadow-lg p-6 w-1/4">
    <div class="flex flex-col space-y-4">
      <h2 class="text-2xl font-bold text-gray-800">สรุปการชำระเงิน</h2>

      <div class="flex justify-between items-center">
        <span class="text-gray-600 font-medium">ราคารวม</span>
        <span class="text-2xl font-bold text-blue-600"
          >{totalPrice.toFixed(2)} บาท</span
        >
      </div>

      <button
        on:click={() => (showDetails = !showDetails)}
        class="flex items-center justify-center text-blue-500 hover:text-blue-700 transition-colors duration-200"
      >
        {showDetails ? "ซ่อนรายละเอียด" : "แสดงรายละเอียด"}
        <ArrowRight size={16} class="ml-1" />
      </button>

      {#if showDetails}
        <div
          transition:fly={{ y: 20, duration: 300 }}
          class="bg-gray-50 rounded-md p-4 space-y-3"
        >
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <Ticket size={18} class="text-gray-500 mr-2" />
              <span class="text-gray-600">ราคาตั๋วขาไป</span>
            </div>
            <span class="font-medium">{goPrice.toFixed(2)} บาท</span>
          </div>
          {#if returnScheduleID}
            <div class="flex justify-between items-center">
              <div class="flex items-center">
                <Ticket size={18} class="text-gray-500 mr-2" />
                <span class="text-gray-600">ราคาตั๋วขากลับ</span>
              </div>
              <span class="font-medium">{returnPrice.toFixed(2)} บาท</span>
            </div>
          {/if}
        </div>
      {/if}

      <button
        on:click={handlePayment}
        class="bg-blue-500 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center"
      >
        ดำเนินการชำระเงิน
        <ArrowRight size={18} class="ml-2" />
      </button>
    </div>
  </div>
</div>
