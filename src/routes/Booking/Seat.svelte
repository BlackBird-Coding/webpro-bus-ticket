<script lang="ts">
  import Sidebar from "@/lib/Sidebar.svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  let goScheduleID: string;
  let returnScheduleID: string;
  let goSeatMap = {};
  let returnSeatMap = {};

  // Separate state for go and return trips
  let goAvailableSeats: string[] = [];
  let goUnavailableSeats: string[] = [];
  let goSelectedSeat: string | null = null;
  let returnAvailableSeats: string[] = [];
  let returnUnavailableSeats: string[] = [];
  let returnSelectedSeat: string | null = null;

  let allSeats: string[] = [];

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    goScheduleID = urlParams.get("goTrip") || "";
    returnScheduleID = urlParams.get("returnTrip") || "";

    fetchSeatData(goScheduleID, true);
    if (returnScheduleID) {
      fetchSeatData(returnScheduleID, false);
    }

    // Generate all possible seats (adjust range as needed)
    allSeats = [];
    for (let col of ["A", "B", "C", "D"]) {
      for (let i = 1; i <= 9; i++) {
        allSeats.push(`${col}${i}`);
      }
    }
  });

  async function fetchSeatData(scheduleID: string, isGoTrip: boolean) {
    try {
      const response = await fetch(`/api/available-seats/${scheduleID}`);
      const data = await response.json();

      const availableSeats = data.availableSeats.map((seat) => seat.SeatCode);
      const seatMap = data.availableSeats.map((seat) => ({
        code: seat.SeatCode,
        id: seat.SeatID,
      }));

      if (isGoTrip) {
        goAvailableSeats = availableSeats;
        goSeatMap = seatMap;
        goUnavailableSeats = allSeats.filter(
          (seat) => !availableSeats.includes(seat)
        );
      } else {
        returnAvailableSeats = availableSeats;
        returnSeatMap = seatMap;
        returnUnavailableSeats = allSeats.filter(
          (seat) => !availableSeats.includes(seat)
        );
      }
    } catch (error) {
      console.error("Error fetching seat data:", error);
    }
  }

  function toggleSeat(seat: string, isGoTrip: boolean) {
    if (isGoTrip) {
      if (goAvailableSeats.includes(seat)) {
        goSelectedSeat = goSelectedSeat === seat ? null : seat;
      }
    } else {
      if (returnAvailableSeats.includes(seat)) {
        returnSelectedSeat = returnSelectedSeat === seat ? null : seat;
      }
    }
  }

  $: goSeatStatuses = allSeats.map((seat) => {
    if (seat === goSelectedSeat) return "selected";
    if (goAvailableSeats.includes(seat)) return "available";
    if (goUnavailableSeats.includes(seat)) return "unavailable";
    return "unavailable";
  });

  $: returnSeatStatuses = allSeats.map((seat) => {
    if (seat === returnSelectedSeat) return "selected";
    if (returnAvailableSeats.includes(seat)) return "available";
    if (returnUnavailableSeats.includes(seat)) return "unavailable";
    return "unavailable";
  });

  function proceedToPayment() {
    if (goSelectedSeat && goScheduleID) {
      const queryParams = new URLSearchParams();
      queryParams.set("goScheduleID", goScheduleID);
      queryParams.set(
        "goSeatId",
        goSeatMap.find((seat) => seat.code === goSelectedSeat).id
      );

      if (returnScheduleID && returnSelectedSeat) {
        queryParams.set("returnScheduleID", returnScheduleID);
        queryParams.set(
          "returnSeatId",
          returnSeatMap.find((seat) => seat.code === returnSelectedSeat).id
        );
      }

      navigate(`/payment?${queryParams.toString()}`);
    }
  }

  $: isSubmitDisabled =
    !goSelectedSeat || (returnScheduleID && !returnSelectedSeat);
</script>

<div class="flex ml-16">
  <Sidebar current={2} />
  <div class="m-10 mx-20 w-4/5">
    <div class="text-3xl mb-5">เลือกที่นั่ง</div>

    <!-- Go Trip Seat Selection -->
    <div class="mb-10">
      <h2 class="text-2xl mb-3">เที่ยวไป</h2>
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
                    {goSeatStatuses[i] === 'selected'
                ? 'bg-orange-500 text-white font-bold'
                : goSeatStatuses[i] === 'available'
                  ? 'border-orange-600 hover:bg-orange-200'
                  : 'bg-gray-300 cursor-not-allowed'}"
              on:click={() => toggleSeat(seat, true)}
              disabled={goSeatStatuses[i] === "unavailable"}
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

      {#if goSelectedSeat}
        <div class="text-center mt-3 text-xl">
          ที่นั่งที่เลือก (เที่ยวไป): <span class="font-bold text-orange-500"
            >{goSelectedSeat}</span
          >
        </div>
      {/if}
    </div>

    <!-- Return Trip Seat Selection -->
    {#if returnScheduleID}
      <div class="mb-10">
        <h2 class="text-2xl mb-3">เที่ยวกลับ</h2>
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
                      {returnSeatStatuses[i] === 'selected'
                  ? 'bg-orange-500 text-white font-bold'
                  : returnSeatStatuses[i] === 'available'
                    ? 'border-orange-600 hover:bg-orange-200'
                    : 'bg-gray-300 cursor-not-allowed'}"
                on:click={() => toggleSeat(seat, false)}
                disabled={returnSeatStatuses[i] === "unavailable"}
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

        {#if returnSelectedSeat}
          <div class="text-center mt-3 text-xl">
            ที่นั่งที่เลือก (เที่ยวกลับ): <span
              class="font-bold text-orange-500">{returnSelectedSeat}</span
            >
          </div>
        {/if}
      </div>
    {/if}

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
