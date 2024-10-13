<script>
  import { onMount } from "svelte";
  import Sidebar from "@/lib/Sidebar.svelte";
  import Swal from "sweetalert2";
  import qrcode from "@/assets/QRCode.png";
  import { fly } from "svelte/transition";
  import { ArrowRight, Ticket, CreditCard } from "lucide-svelte";

  let scheduleID;
  let seat;
  let totalPrice = 0;

  let showDetails = false;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    scheduleID = urlParams.get("scheduleID");
    seat = urlParams.get("seat");

    // Simulating API data
    if (scheduleID && seat) {
      totalPrice = calculateTotalPrice(scheduleID, seat);
    }
  });

  function calculateTotalPrice(scheduleID, seat) {
    // This is a mock calculation. In a real scenario, you'd fetch this from an API
    const basePrice = 300;
    const scheduleMultiplier = parseInt(scheduleID) * 0.1;
    const seatMultiplier =
      seat.charCodeAt(0) - 65 + parseInt(seat.slice(1)) * 0.05;
    return (
      Math.round(
        (basePrice +
          basePrice * scheduleMultiplier +
          basePrice * seatMultiplier) *
          100
      ) / 100
    );
  }

  async function handlePayment() {
    // In a real scenario, you'd make an API call here to process the payment
    // and get the QR code. For this example, we'll use a placeholder image.
    const result = await Swal.fire({
      title: "QR Code for Payment",
      imageUrl: qrcode, // Replace with actual QR code URL
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: "QR Code",
      confirmButtonText: "Close",
    });
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
          class="border border-gray-400 pl-2 rounded-md w-3/6"
          type="text"
          placeholder="ชื่อ"
        />
        <input
          class="border border-gray-400 pl-2 rounded-md w-3/6"
          type="text"
          placeholder="นามสกุล"
        />
      </div>
    </div>
    <div class="flex flex-col text-xl mt-5 gap-5">
      <div>ข้อมูลผู้ติดต่อ</div>
      <div class="flex flex-col gap-4 text-lg">
        <label for="first-name" class="ml-2 w-1/5">ชื่อ</label>
        <input
          id="first-name"
          class="border border-gray-400 pl-2 rounded-md w-full"
          type="text"
          placeholder="ชื่อ"
        />
      </div>

      <div class="flex flex-col gap-4 text-lg">
        <label for="last-name" class="ml-2 w-1/5">นามสกุล</label>
        <input
          id="last-name"
          class="border border-gray-400 pl-2 rounded-md w-full"
          type="text"
          placeholder="นามสกุล"
        />
      </div>

      <div class="flex flex-col gap-4 text-lg">
        <label for="phone" class="ml-2 w-1/5">โทรศัพท์มือถือ</label>
        <input
          id="phone"
          class="border border-gray-400 pl-2 rounded-md w-full"
          type="text"
          placeholder="หมายเลขโทรศัพท์มือถือ"
        />
      </div>

      <div class="flex flex-col gap-4 text-lg">
        <label for="email" class="ml-2 w-1/5">อีเมล</label>
        <input
          id="email"
          class="border border-gray-400 pl-2 rounded-md w-full"
          type="email"
          placeholder="กรอกอีเมล (ถ้ามี) เพื่อรับข้อมูลการจอง"
        />
      </div>
    </div>
  </div>
  <div class="bg-white rounded-lg shadow-lg p-6 w-1/4">
    <div class="flex flex-col space-y-4">
      <h2 class="text-2xl font-bold text-gray-800">สรุปการชำระเงิน</h2>

      <div class="flex justify-between items-center">
        <span class="text-gray-600 font-medium">ราคารวม</span>
        <span class="text-2xl font-bold text-blue-600"
          >{(totalPrice + 40).toFixed(2)} บาท</span
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
              <span class="text-gray-600">ราคาตั๋ว</span>
            </div>
            <span class="font-medium">{totalPrice.toFixed(2)} บาท</span>
          </div>
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <CreditCard size={18} class="text-gray-500 mr-2" />
              <span class="text-gray-600">ค่าธรรมเนียม</span>
            </div>
            <span class="font-medium">40.00 บาท</span>
          </div>
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
