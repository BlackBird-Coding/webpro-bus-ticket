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

<div class="search-container">
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
    <label class="w-32">วันเดินทางไป</label>
    <input
      type="date"
      value={myBindDate}
      on:change={(e) => (myBindDate = e.target.value || myBindDate)}
      class="border p-2 w-full"
    />
  </div>

  <!-- Date Picker for Return -->
  <div class="mb-3 flex">
    <label class="w-32">วันเดินทางกลับ</label>
    <input
      type="date"
      value={myBindDate}
      on:change={(e) => (myBindDate = e.target.value || myBindDate)}
      class="border p-2 w-full"
    />
  </div>

  <!-- Search Button -->
  <button class="search-button w-full mt-5">ค้นหาเที่ยวรถ</button>
</div>

<style>
  .search-container {
    max-width: 400px;
    margin: auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  .search-button {
    background-color: #f26522;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  .search-button:hover {
    background-color: #e54d15;
  }
</style>
