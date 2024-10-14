<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  let scheduleID: string;
  let seatMap = {};
  let availableSeats: string[] = [];
  let unavailableSeats: string[] = [];
  let selectedSeat: string | null = null;
  let allSeats: string[] = [];

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    scheduleID = urlParams.get("goTrip") || "";

    fetchSeatData(scheduleID);

    // Generate all possible seats (adjust range as needed)
    allSeats = [];
    for (let col of ["A", "B", "C", "D"]) {
      for (let i = 1; i <= 9; i++) {
        allSeats.push(`${col}${i}`);
      }
    }
  });

  async function fetchSeatData(scheduleID: string) {
    try {
      const response = await fetch(`/api/available-seats/${scheduleID}`);
      const data = await response.json();

      availableSeats = data.availableSeats.map((seat) => seat.SeatCode);
      seatMap = data.availableSeats.map((seat) => ({
        code: seat.SeatCode,
        id: seat.SeatID,
      }));
      unavailableSeats = allSeats.filter(
        (seat) => !availableSeats.includes(seat)
      );
    } catch (error) {
      console.error("Error fetching seat data:", error);
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
      queryParams.set(
        "seatId",
        seatMap.find((seat) => seat.code === selectedSeat).id
      );

      navigate(`/rebooking/payment?${queryParams.toString()}`);
    }
  }

  $: isSubmitDisabled = !selectedSeat;
</script>

<div class="flex ml-16">
  <div class="m-10 mx-20 w-4/5">
    <div class="text-3xl mb-5">เลือกที่นั่ง</div>

    <div class="mb-10">
      <h2 class="text-2xl mb-3">เที่ยวรถ</h2>
      <div class="bg-slate-100 p-5 rounded-md max-w-2xl mx-auto">
        <div class="grid grid-cols-4 gap-4">
          <div
            class="col-span-2 border border-blue-600 rounded-md h-16 flex items-center justify-center"
          >
            ประตู
          </div>
          <div
            class="col-span-2 border border-blue-600 rounded-md h-16 flex items-center justify-center"
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
            class="col-span-2 border border-blue-600 rounded-md h-16 flex items-center justify-center"
          >
            ประตูฉุกเฉิน
          </div>
          <div class="col-span-2"></div>
          <div
            class="col-span-2 border border-blue-600 rounded-md h-16 flex items-center justify-center"
          >
            ห้องน้ำ
          </div>
        </div>
      </div>

      {#if selectedSeat}
        <div class="text-center mt-3 text-xl">
          ที่นั่งที่เลือก: <span class="font-bold text-orange-500"
            >{selectedSeat}</span
          >
        </div>
      {/if}
    </div>

    <div class="flex justify-center mt-5 gap-10">
      <a
        class="bg-gray-500 text-2xl text-white px-3 py-1 rounded-md hover:bg-gray-600"
        href="/trip">ย้อนกลับ</a
      >
      <button
        class="bg-orange-500 text-2xl text-white px-3 py-1 rounded-md hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        on:click={proceedToPayment}
        disabled={isSubmitDisabled}
      >
        ดำเนินการต่อ
      </button>
    </div>
  </div>
</div>
