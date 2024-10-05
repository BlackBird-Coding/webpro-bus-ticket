<script lang="ts">
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  let myBindDate = new Date().toJSON().slice(0, 10);
  let returnDate = ""; // For return trip
  let routes: any[] = [];
  let originProvince = "";
  let destinationProvince = "";
  let destinationOptions: any[] = [];
  let originBusStops: any[] = [];
  let destinationBusStops: any[] = [];
  let tripType = 0; // 1: One-way, 0: Round-trip

  onMount(async () => {
    try {
      const response = await fetch("/api/routes"); // Adjust API endpoint
      const data = await response.json();
      routes = data.routes || []; // Ensure routes exist in the response
      console.log("Routes fetched:", routes);
    } catch (err) {
      console.error("Error fetching routes:", err);
    }
  });

  $: if (originProvince) {
    updateDestinationOptions();
    updateOriginBusStops();
  }

  $: if (destinationProvince) {
    updateDestinationBusStops();
  }

  function updateDestinationOptions() {
    const matchingRoutes = routes.filter(
      (route) => route.OriginProvince === originProvince
    );
    destinationOptions = [
      ...new Set(matchingRoutes.map((route) => route.DestinationProvince)),
    ];
  }

  function updateOriginBusStops() {
    const matchingRoutes = routes.filter(
      (route) => route.OriginProvince === originProvince
    );
    originBusStops = [
      ...new Set(matchingRoutes.map((route) => route.OriginBusStop)),
    ]; // Changed to map `OriginBusStop`
  }

  function updateDestinationBusStops() {
    const matchingRoutes = routes.filter(
      (route) => route.DestinationProvince === destinationProvince
    );
    destinationBusStops = [
      ...new Set(matchingRoutes.map((route) => route.DestinationBusStop)),
    ];
  }

  function searchTrips() {
    // Filter the routes that match both origin and destination provinces
    const matchingRoute = routes.find(
      (route) =>
        route.OriginProvince === originProvince &&
        route.DestinationProvince === destinationProvince
    );

    // If a matching route is found, log the RouteID, otherwise indicate no match
    if (matchingRoute) {
      console.log("Found RouteID:", matchingRoute.RouteID);
    } else {
      console.log("No matching route found.");
    }

    console.log("Searching trips with:", {
      originProvince,
      destinationProvince,
      myBindDate,
      returnDate,
      tripType,
      RouteID: matchingRoute?.RouteID,
    });

    navigate(`/booking/trip/${matchingRoute?.RouteID}`); // Adjust the route to navigate to
  }
</script>

<div class="w-1/2 h-fit my-10 mx-auto p-5 bg-white rounded-lg shadow-md">
  <div class="text-xl mb-3">ค้นหาเที่ยวรถ</div>

  <!-- Trip Type Selection -->
  <div class="mb-3">
    <label>
      <input type="radio" name="triptype" value="0" bind:group={tripType} /> ไป-กลับ
    </label>
    <label class="ml-5">
      <input type="radio" name="triptype" value="1" bind:group={tripType} /> เที่ยวเดียว
    </label>
  </div>

  <!-- Origin Province Selection -->
  <div class="mb-3">
    <label for="origin">จังหวัดต้นทาง</label>
    <select id="origin" bind:value={originProvince} class="w-full p-2 border">
      <option value="">--เลือกจังหวัด--</option>
      {#each [...new Set(routes.map((route) => route.OriginProvince))] as province}
        <option value={province}>{province}</option>
      {/each}
    </select>
  </div>

  <!-- Origin Bus Stop Selection -->
  <div class="mb-3">
    <label for="originBusStop">จุดขึ้นรถ</label>
    <select
      id="originBusStop"
      class="w-full p-2 border"
      disabled={!originProvince}
    >
      <option value="">--เลือกจุดขึ้นรถ--</option>
      {#each originBusStops as busStop}
        <option value={busStop}>{busStop}</option>
      {/each}
    </select>
  </div>

  <!-- Destination Province Selection -->
  <div class="mb-3">
    <label for="destination">จังหวัดปลายทาง</label>
    <select
      id="destination"
      bind:value={destinationProvince}
      class="w-full p-2 border"
      disabled={!originProvince}
    >
      <option value="">--เลือกจังหวัด--</option>
      {#each destinationOptions as destination}
        <option value={destination}>{destination}</option>
      {/each}
    </select>
  </div>

  <!-- Destination Bus Stop Selection -->
  <div class="mb-3">
    <label for="destinationBusStop">จุดลงรถ</label>
    <select
      id="destinationBusStop"
      class="w-full p-2 border"
      disabled={!destinationProvince}
    >
      <option value="">--เลือกจุดลงรถ--</option>
      {#each destinationBusStops as busStop}
        <option value={busStop}>{busStop}</option>
      {/each}
    </select>
  </div>

  <!-- Date Picker for Outbound -->
  <div class="mb-3 flex">
    <label for="outboundDate" class="w-32">วันเดินทางไป</label>
    <input
      name="outboundDate"
      type="date"
      bind:value={myBindDate}
      class="border p-2 w-full"
    />
  </div>

  <!-- Date Picker for Return -->
  <div class="mb-3 flex">
    <label class="w-32" for="returnDate">วันเดินทางกลับ</label>
    <input
      name="returnDate"
      type="date"
      bind:value={returnDate}
      class="border p-2 w-full"
    />
  </div>

  <!-- Search Button -->
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
    on:click={searchTrips}
  >
    ค้นหาเที่ยวรถ
  </button>
</div>
