<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  let routeId = "";
  let goTrips: any[] = [];
  let tripDate = "";
  let selectedGoTrip: string | null = null;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    routeId = urlParams.get("id") || "";
    tripDate = urlParams.get("date") || "";

    fetchTripData(routeId, tripDate);
  });

  async function fetchTripData(routeId: string, tripDate: string) {
    try {
      const response = await fetch(
        `/api/trips?routeId=${routeId}&date=${tripDate}`
      );
      const data = await response.json();
      goTrips = data.trips || [];
    } catch (err) {
      console.error("Error fetching trip data:", err);
    }
  }

  function selectTrip(scheduleId: string) {
    selectedGoTrip = selectedGoTrip === scheduleId ? null : scheduleId;
  }

  function proceedToSeatSelection() {
    if (!selectedGoTrip) {
      alert("Please select a trip before proceeding.");
      return;
    }

    const queryParams = new URLSearchParams();
    queryParams.set("goTrip", selectedGoTrip);
    navigate(`/rebooking/seat?${queryParams.toString()}`);
  }

  $: isSubmitDisabled = !selectedGoTrip;
</script>

<div class="flex ml-16">
  <div class="m-10 mx-20 w-4/5">
    <div class="text-3xl">เลือกเที่ยวรถ</div>

    <div class="mt-5">
      <div class="text-2xl mb-5">เที่ยวรถ</div>
      <Table hoverable={true}>
        <TableHead
          class="bg-[#4F75FF] rounded-md py-2 text-lg text-center text-white"
        >
          <TableHeadCell>รถออก</TableHeadCell>
          <TableHeadCell>เส้นทาง</TableHeadCell>
          <TableHeadCell>ที่นั่งว่าง</TableHeadCell>
          <TableHeadCell>ราคา</TableHeadCell>
        </TableHead>
        <TableBody>
          {#each goTrips as trip}
            <TableBodyRow
              class="text-center cursor-pointer"
              color={selectedGoTrip === trip.ScheduleID ? "green" : "default"}
              on:click={() => selectTrip(trip.ScheduleID)}
            >
              <TableBodyCell>{trip.DepartureTime}</TableBodyCell>
              <TableBodyCell>{trip.RouteName}</TableBodyCell>
              <TableBodyCell>{trip.AvailableSeat}</TableBodyCell>
              <TableBodyCell>{trip.Price} บาท</TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </div>

    <div class="flex justify-center my-5">
      <button
        class="bg-orange-500 text-2xl text-white px-3 py-1 rounded-md hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        on:click={proceedToSeatSelection}
        disabled={isSubmitDisabled}
      >
        ดำเนินการต่อ
      </button>
    </div>
  </div>
</div>
