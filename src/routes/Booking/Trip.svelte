<script lang="ts">
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";
  import Sidebar from "@/lib/Sidebar.svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  let routeId = "";
  let tripType = "1"; // 1 is One-way, 0 is Round-trip
  let goTrips: any[] = [];
  let returnTrips: any[] = [];
  let tripDate = "";
  let returnDate = "";
  let selectedGoTrip: string | null = null;
  let selectedReturnTrip: string | null = null;

  onMount(() => {
    const urlParams = new URLSearchParams(window.location.search);
    routeId = urlParams.get("id") || "";
    tripDate = urlParams.get("date") || "";
    tripType = urlParams.get("type") || "1";
    returnDate = urlParams.get("return") || "";

    fetchTripData(routeId, tripDate, returnDate);
  });

  async function fetchTripData(
    routeId: string,
    tripDate: string,
    returnDate: string
  ) {
    try {
      const response = await fetch(
        `/api/trips?routeId=${routeId}&date=${tripDate}`
      );
      const data = await response.json();
      goTrips = data.trips || [];

      if (tripType === "0" && returnDate) {
        const returnResponse = await fetch(
          `/api/return-trips?routeId=${routeId}&date=${returnDate}`
        );
        const returnData = await returnResponse.json();
        returnTrips = returnData.returnTrips || [];
      }
    } catch (err) {
      console.error("Error fetching trip data:", err);
    }
  }

  function selectTrip(scheduleId: string, isReturn: boolean = false) {
    if (isReturn) {
      selectedReturnTrip = scheduleId;
    } else {
      selectedGoTrip = scheduleId;
    }

    if (
      tripType === "1" ||
      (tripType === "0" && selectedGoTrip && selectedReturnTrip)
    ) {
      proceedToSeatSelection();
    }
  }

  function proceedToSeatSelection() {
    const queryParams = new URLSearchParams();
    queryParams.set("goTrip", selectedGoTrip!);
    if (tripType === "0" && selectedReturnTrip) {
      queryParams.set("returnTrip", selectedReturnTrip);
    }
    navigate(`/seat?${queryParams.toString()}`);
  }
</script>

<div class="flex ml-16">
  <Sidebar current={1} />
  <div class="m-10 mx-20 w-4/5">
    <div class="text-3xl">เลือกเที่ยวรถ</div>

    <!-- Outbound Trips -->
    <div class="mt-5">
      <div class="text-2xl mb-5">เที่ยวไป</div>
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
              class="text-center cursor-pointer hover:bg-gray-100 {selectedGoTrip ===
              trip.ScheduleId
                ? 'bg-blue-300'
                : ''}"
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

    <!-- Return Trips (only show if tripType is round-trip) -->
    {#if tripType === "0"}
      <div class="mt-5">
        <div class="text-2xl mb-5">เที่ยวกลับ</div>
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
            {#each returnTrips as trip}
              <TableBodyRow
                on:click={() => selectTrip(trip.ScheduleID, true)}
                class="text-center cursor-pointer hover:bg-gray-100 {selectedGoTrip ===
                trip.ScheduleId
                  ? 'bg-blue-300'
                  : ''}"
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
    {/if}

    {#if tripType === "0" && (!selectedGoTrip || !selectedReturnTrip)}
      <div class="flex justify-center my-5">
        <button
          class="bg-orange-500 text-2xl text-white px-3 py-1 rounded-md hover:bg-orange-600"
          on:click={proceedToSeatSelection}
          disabled={!selectedGoTrip || !selectedReturnTrip}
        >
          ดำเนินการต่อ
        </button>
      </div>
    {/if}
  </div>
</div>
