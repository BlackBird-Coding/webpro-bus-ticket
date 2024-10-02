<script>
  import { onMount } from "svelte";

  let myBindDate = new Date().toJSON().slice(0, 10);
  let routes = [];
  let originProvince = "";
  let destinationProvince = "";
  let destinationOptions = [];
  let originBusStops = [];
  let destinationBusStops = [];

  onMount(async () => {
    try {
      const response = await fetch("/api/routes"); // Adjust API endpoint
      const data = await response.json();
      routes = data.routes;
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
      ...new Set(matchingRoutes.map((route) => route.OriginProvince)),
    ];
  }

  function updateDestinationBusStops() {
    const matchingRoutes = routes.filter(
      (route) => route.DestinationProvince === destinationProvince
    );
    destinationBusStops = [
      ...new Set(matchingRoutes.map((route) => route.DestinationBusStop)),
    ];
  }
</script>

<div class="max-w-md mx-auto p-5 bg-white rounded-lg shadow-md">
  <div class="text-xl mb-3">ค้นหาเที่ยวรถ</div>

  <!-- Trip Type Selection -->
  <div class="mb-3">
    <label><input type="radio" name="triptype" /> ไป-กลับ</label>
    <label class="ml-5"
      ><input type="radio" name="triptype" /> เที่ยวเดียว</label
    >
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
      value={myBindDate}
      on:change={(e) => (myBindDate = e.target.value || myBindDate)}
      class="border p-2 w-full"
    />
  </div>

  <!-- Date Picker for Return -->
  <div class="mb-3 flex">
    <label class="w-32" for="returnDate">วันเดินทางกลับ</label>
    <input
      name="returnDate"
      type="date"
      value={myBindDate}
      on:change={(e) => (myBindDate = e.target.value || myBindDate)}
      class="border p-2 w-full"
    />
  </div>

  <!-- Search Button -->
  <button
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
  >
    ค้นหาเที่ยวรถ
  </button>
</div>
