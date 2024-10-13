<script lang="ts">
  import Sidebar from "@/lib/Sidebar.svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  let tripType = "1"; // 1 for one-way, 0 for round-trip
  let availableSeats: string[] = [];
  let unavailableSeats: string[] = [];
  let selectedSeat: string | null = null;
  let allSeats: string[] = [];
  let scheduleID: string;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    tripType = urlParams.get("type") || "1";
    scheduleID = urlParams.get("goTrip") || "";
    fetchSeatData();
  });
  function fetchSeatData() {
    // Simulating API call with both available and unavailable seats
    availableSeats = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
    unavailableSeats = ["A3", "A4", "B3", "B4", "C3", "C4", "D3", "D4"];

    // Generate all possible seats
    allSeats = [];
    for (let col of ["A", "B", "C", "D"]) {
      for (let i = 1; i <= 9; i++) {
        allSeats.push(`${col}${i}`);
      }
    }
  }

  function toggleSeat(seat: string) {
    if (availableSeats.includes(seat)) {
      selectedSeat = selectedSeat === seat ? null : seat;
    }
  }

  $: seatStatuses = allSeats.map((seat) => {
    if (seat === selectedSeat) return "selected";
    if (availableSeats.includes(seat)) return "available";
    if (unavailableSeats.includes(seat)) return "unavailable";
    return "unavailable";
  });

  function proceedToPayment() {
    if (selectedSeat && scheduleID) {
      const queryParams = new URLSearchParams();
      queryParams.set("scheduleID", scheduleID);
      queryParams.set("seat", selectedSeat);
      navigate(`/payment?${queryParams.toString()}`);
    }
  }
</script>

<div class="flex ml-16">
  <Sidebar current={2} />
  <div class="m-10 mx-20 w-4/5">
    <div class="text-3xl mb-5">เลือกที่นั่ง</div>

    <div class="bg-slate-100 p-5 rounded-md max-w-2xl mx-auto">
      <div class="grid grid-cols-4 gap-4">
        <div
          class="col-span-2 border border-orange-600 rounded-md h-16 flex items-center justify-center"
        >
          ประตู
        </div>
        <div
          class="col-span-2 border border-orange-600 rounded-md h-16 flex items-center justify-center"
        >
          พขร.
        </div>

        {#each allSeats as seat, i}
          <button
            class="border rounded-md h-16 flex items-center justify-center
                  {seatStatuses[i] === 'selected'
              ? 'bg-orange-500 text-white font-bold'
              : seatStatuses[i] === 'available'
                ? 'border-orange-600 hover:bg-orange-200'
                : 'bg-gray-300 cursor-not-allowed'}"
            on:click={() => toggleSeat(seat)}
            disabled={seatStatuses[i] === "unavailable"}
          >
            {seat}
          </button>
        {/each}

        <div class="col-span-2"></div>
        <div
          class="col-span-2 border border-orange-600 rounded-md h-16 flex items-center justify-center"
        >
          ประตูฉุกเฉิน
        </div>
        <div class="col-span-2"></div>
        <div
          class="col-span-2 border border-orange-600 rounded-md h-16 flex items-center justify-center"
        >
          ห้องน้ำ
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-5 gap-10">
      <a
        class="bg-gray-500 text-2xl text-white px-3 py-1 rounded-md hover:bg-gray-600"
        href="/trip">ย้อนกลับ</a
      >
      <button
        class="bg-orange-500 text-2xl text-white px-3 py-1 rounded-md hover:bg-orange-600"
        on:click={proceedToPayment}
        disabled={!selectedSeat || !scheduleID}
      >
        ดำเนินการต่อ
      </button>
    </div>

    {#if selectedSeat}
      <div class="text-center mt-5 text-xl">
        ที่นั่งที่เลือก: <span class="font-bold text-orange-500"
          >{selectedSeat}</span
        >
      </div>
    {/if}
  </div>
</div>
