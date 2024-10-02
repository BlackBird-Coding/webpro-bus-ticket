<script>
  // @ts-nocheck
  import ramen from "../assets/ramen.png";
  import { onMount } from "svelte";

  let myBindDate = new Date().toJSON().slice(0, 10);

  let routes = []; // All routes fetched from the backend
  let originProvince = ""; // Selected origin province
  let destinationProvince = ""; // Selected destination province
  let destinationOptions = []; // Filtered destination options
  let originBusStops = []; // Filtered bus stops for the selected origin province
  let destinationBusStops = []; // Filtered bus stops for the selected destination province

  onMount(async () => {
    try {
      const response = await fetch("/api/routes"); // Adjust your API endpoint
      const data = await response.json(); // Assuming the API returns a JSON array of routes
      routes = data.routes;
      console.log("Routes fetched:", routes);
    } catch (err) {
      console.error("Error fetching routes:", err);
    }
  });

  // Watch for changes in originProvince and update the destination and bus stop options
  $: if (originProvince) {
    updateDestinationOptions();
    updateOriginBusStops();
  }

  $: if (destinationProvince) {
    updateDestinationBusStops();
  }

  // Update destination options based on selected origin province
  function updateDestinationOptions() {
    const matchingRoutes = routes.filter(
      (route) => route.OriginProvince === originProvince
    );
    destinationOptions = [
      ...new Set(matchingRoutes.map((route) => route.DestinationProvince)),
    ];
  }

  // Update origin bus stops based on selected origin province
  function updateOriginBusStops() {
    const matchingRoutes = routes.filter(
      (route) => route.OriginProvince === originProvince
    );
    originBusStops = [
      ...new Set(matchingRoutes.map((route) => route.OriginProvince)),
    ];
  }

  // Update destination bus stops based on selected destination province
  function updateDestinationBusStops() {
    const matchingRoutes = routes.filter(
      (route) => route.DestinationProvince === destinationProvince
    );
    destinationBusStops = [
      ...new Set(matchingRoutes.map((route) => route.DestinationBusStop)),
    ];
  }
</script>

<div>
  <div>
    <div class="flex justify-end m-10">
      <img class="w-2/4 mt-16 h-2/3" src={ramen} alt="" />
      <div class="m-10 bg-white rounded-lg w-2/4">
        <div class="p-5 flex flex-col gap-5">
          <div class="text-xl">ค้นหาเที่ยวรถ</div>
          <hr />
          <div class="flex">
            <h1 class="w-28">เดินทาง</h1>
            <div class="flex gap-10">
              <label class="flex items-center" for="">
                <input
                  class="aspect-square w-5 mr-2"
                  type="radio"
                  name="triptype"
                />ไป-กลับ
              </label>
              <label class="flex items-center" for="">
                <input
                  class="aspect-square w-5 mr-2"
                  type="radio"
                  name="triptype"
                />เที่ยวเดียว
              </label>
            </div>
          </div>
          <!-- Origin Province Select -->
          <label for="origin">ต้นทาง</label>
          <select id="origin" bind:value={originProvince}>
            <option value="">--เลือกจังหวัด--</option>
            {#each [...new Set(routes.map((route) => route.OriginProvince))] as province}
              <option value={province}>{province}</option>
            {/each}
          </select>

          <!-- Origin Bus Stop Select -->
          <label for="originBusStop">จุดขึ้นรถ</label>
          <select id="originBusStop" disabled={!originProvince}>
            <option value="">--เลือกจุดขึ้นรถ--</option>
            {#each originBusStops as busStop}
              <option value={busStop}>{busStop}</option>
            {/each}
          </select>

          <!-- Destination Province Select -->
          <label for="destination">ปลายทาง</label>
          <select
            id="destination"
            bind:value={destinationProvince}
            disabled={!originProvince}
          >
            <option value="">--เลือกจังหวัด--</option>
            {#each destinationOptions as destination}
              <option value={destination}>{destination}</option>
            {/each}
          </select>

          <!-- Destination Bus Stop Select -->
          <label for="destinationBusStop">จุดลงรถ</label>
          <select id="destinationBusStop" disabled={!destinationProvince}>
            <option value="">--เลือกจุดลงรถ--</option>
            {#each destinationBusStops as busStop}
              <option value={busStop}>{busStop}</option>
            {/each}
          </select>
          <div class="flex">
            <div class="w-28">วันเดินทางไป</div>
            <input
              type="date"
              class="border-2 rounded-md px-2"
              value={myBindDate}
              on:change={(e) => (myBindDate = e.target.value || myBindDate)}
            />
          </div>
          <div class="flex">
            <div class="w-28">วันเดินทางกลับ</div>
            <input
              type="date"
              class="border-2 rounded-md px-2"
              value={myBindDate}
              on:change={(e) => (myBindDate = e.target.value || myBindDate)}
            />
          </div>
          <div>
            <button
              class="flex justify-center items-center gap-1 bg-violet-500 rounded-lg px-4 py-2 text-white hover:bg-violet-600 hover:shadow-sm hover:scale-105 hover:shadow-violet-500 transition-transform duration-500"
              >ค้นหาเที่ยวรถ</button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
