<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { Tooltip, Button } from "flowbite-svelte";
  import Swal from "sweetalert2";
  import Trip from "../Booking/Trip.svelte";
  import { Route, navigate } from "svelte-routing";
  import { Upload } from "lucide-svelte";
  import { base64 } from "@sveu/browser";

  let id = null;
  let isDisabled = true; // เริ่มต้นไม่ disabled
  let mode = null;
  let BusStops = [];
  let Buses = [];

  let departureDateTime = null;
  let departureDate = null;
  let departureTime = null;

  let arrivalDateTime = null;
  let arrivalDate = null;
  let arrivalTime = null;

  let employees = [];
  let dataToSend = [];

  let fileInput;
  let previewImage = null;
  let errorMessage = "";
  let maxFileSizeMB = 1; // Default max file size is 1MB

  let tripdata = {
    RouteName: null,
    BusID: null,
    Price: null,
    EmployeeID: null,
    Origin: null,
    Destination: null,
    departureDate: null,
    departureDateTime: null,
    arrivalDate: null,
    arrivalTime: null,
    DepartureTime: new Date(departureDate + " " + departureTime + ".00"),
    ArrivalTime: new Date(arrivalDate + " " + arrivalTime + ".00"),
    DriverID: null,
    Description: null,
    Image: null,
  };

  fetch("/api/employees", {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      employees = data.employees;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  fetch("/api/getBuses", {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      console.log(data);
      Buses = data.Buses;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  fetch(`/api/BusStops`, {
    method: "GET",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    })
    .then((data) => {
      BusStops = data.BusStops;
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  function saveChanges() {
    return fetch(`/api/AddSchedule`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tripdata),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`HTTP error! status: ${res.status}, body: ${text}`);
          });
        }
        return res.json();
      })
      .then(() => {
        console.log("Successfully saved Bus");
      });
  }

  function saveEdit() {
    Swal.fire({
      title: "คุณต้องการบันทึกสถานีนี้หรือไม่?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "บันทึก",
      denyButtonText: `ไม่บันทึก`,
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(tripdata);
        saveChanges()
          .then(() => {
            Swal.fire("บันทึกเรียบร้อย!", "", "success");
            navigate(`/ManageBus_Emp`, { replace: true });
          })
          .catch((error) => {
            console.error("SaveStation error:", error);
            Swal.fire("เกิดข้อผิดพลาด!", "ไม่สามารถบันทึกข้อมูลได้", "error");
          });
      } else if (result.isDenied) {
        Swal.fire("การบันทึกถูกยกเลิก", "", "info");
        navigate(`/ManageBus_Emp`, { replace: true });
      }
    });
  }

  function cancel() {
    Swal.fire({
      title: "คุณต้องการละทิ้งการแก้ไขใช่หรือไม่?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ไม่`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        navigate(`/ManageBus_Emp`, { replace: true });
      }
    });
  }
</script>

<div>
  <form style="margin: 4% 5%;">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-6">
        <h2 class="text-2xl font-semibold leading-7 text-gray-900">
          เพิ่มเที่ยว
        </h2>
        <p class="mt-1 text-sm leading-6 text-gray-600">
          กรุณากรอกรายละเอียดเที่ยวรถที่ต้องการเพิ่ม
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-full">
            <label
              for="trip-name"
              class="block text-sm font-medium leading-6 text-gray-900"
              >ชื่อเที่ยวรถ</label
            >
            <div class="mt-2">
              <input
                bind:value={tripdata.Name}
                type="text"
                name="trip-name"
                id="trip-name"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="col-span-4">
            <label
              for="bus"
              class="block text-sm font-medium leading-6 text-gray-900"
              >รถบัส</label
            >
            <div class="mt-2">
              <select
                bind:value={tripdata.BusID}
                name="bus"
                id="bus"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" selected>เลือกรถบัส</option>
                {#each Buses as data}
                  <option value={data.BusID}>
                    {data.BusCode}: {data.Type}
                    {data.Capacity} ที่นั่ง
                  </option>
                {/each}
              </select>
            </div>
          </div>

          <div class="col-span-2">
            <label
              for="price"
              class="block text-sm font-medium leading-6 text-gray-900"
              >ราคา</label
            >
            <div class="mt-2">
              <input
                type="text"
                name="price"
                id="price"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-6">
            <label
              for="type"
              class="block text-base font-medium leading-6 text-gray-900"
              >เส้นทางการเดินทาง (สถานีต้นทาง - ปลายทาง)</label
            >
            <div class="mt-2">
              <select
                bind:value={tripdata.RouteID}
                name="route"
                id="route"
                autocomplete="address-level2"
                class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                {#each routes as data}
                  <option value={data.RouteID}>
                    {data.RouteCode}: {data.OriginBusStop} - {data.DestinationBusStop}
                  </option>
                {/each}
              </select>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="departure-time"
              class="block text-sm font-medium leading-6 text-gray-900"
              >เวลาออกเดินทาง</label
            >
            <div class="mt-2 flex space-x-4">
              <div class="relative flex-1">
                <input
                  bind:value={tripdata.arrivalTime}
                  type="date"
                  id="departure-date"
                  class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path></svg
                  >
                </div>
              </div>
              <div class="relative flex-1">
                <input
                  bind:value={tripdata.arrivalDate}
                  type="time"
                  id="departure-time"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    ></path></svg
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label
              for="arrival-time"
              class="block text-sm font-medium leading-6 text-gray-900"
              >เวลาถึงปลายทาง</label
            >
            <div class="mt-2 flex space-x-4">
              <div class="relative flex-1">
                <input
                  bind:value={tripdata.departureDate}
                  type="date"
                  id="arrival-date"
                  class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    ></path></svg
                  >
                </div>
              </div>
              <div class="relative flex-1">
                <input
                  bind:value={tripdata.departureTime}
                  type="time"
                  id="arrival-time"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div
                  class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                >
                  <svg
                    class="w-5 h-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    ><path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    ></path></svg
                  >
                </div>
              </div>
            </div>
          </div>

          <div class="sm:col-span-6">
            <label
              for="driver"
              class="block text-sm font-medium leading-6 text-gray-900"
              >พนักงานขับรถ (หลัก)</label
            >
            <div class="mt-2">
              <select
                bind:value={tripdata.EmployeeID}
                id="driver"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" selected>เลือกพนักงานขับรถ</option>
                {#each employees as employee}
                  <option value={employee.UserID}>
                    {employee.EmployeeCode} - {employee.Fname}
                    {employee.Lname} ({employee.Phone})
                  </option>
                {/each}
              </select>
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="description"
              class="block text-sm font-medium leading-6 text-gray-900"
              >รายละเอียด</label
            >
            <div class="mt-2">
              <textarea
                bind:value={tripdata.Description}
                id="description"
                name="description"
                rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              ></textarea>
            </div>
          </div>

          <div class="col-span-full">
            <label
              for="cover-photo"
              class="block text-sm font-medium leading-6 text-gray-900"
              >รูปภาพ</label
            >
            <div
              class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
            >
              <div class="text-center">
                <svg
                  class="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zM9.75 7.5a.75.75 0 00-.75.75v2.25h-1.5a.75.75 0 000 1.5h1.5v2.25a.75.75 0 001.5 0v-2.25h1.5a.75.75 0 000-1.5h-1.5V8.25a.75.75 0 00-.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    for="file-upload"
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>อัพโหลดรูปภาพ</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      class="sr-only"
                    />
                  </label>
                  <p class="pl-1">หรือลากและวาง</p>
                </div>
                <p class="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF ไม่เกิน 10MB
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <Button
          on:click={cancel}
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900">Cancel</Button
        >
        <button
          on:click={saveEdit}
          type="button"
          class="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >Save</button
        >
      </div>
    </div>
  </form>
</div>
