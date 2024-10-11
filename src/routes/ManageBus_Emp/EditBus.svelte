<script>
    import { onMount } from "svelte";
    import { Tooltip, Button } from "flowbite-svelte";

    let inputs = [{}]; // Array to store input values
    let id = null;
    let tripdata = [];
    let isDisabled = true; // เริ่มต้นไม่ disabled

    function toggleDisabled() {
        isDisabled = !isDisabled; // สลับค่า disabled
    }

    function addInput() {
        // Add a new empty input field
        inputs = [...inputs, {}];
    }

    function handleInputChange(event, index) {
        // Update the specific input field's value
        inputs[index] = event.target.value;
    }

    function submitForm() {
        // Do something with form data (e.g., submit)
        console.log(inputs);
    }

    // Extract the ID from the URL when the page loads
    onMount(() => {
        const urlParams = new URLSearchParams(window.location.search);
        id = urlParams.get("id"); // Get the "id" from the query string
        const body = JSON.stringify({ id });
        console.log("Request body:", body);
    });

    fetch(`/api/EditBus`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            console.log("fetch", data);
            tripdata = data.routes;
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error,
            );
        });
</script>

<div>
    <form style="margin: 4% 5%;">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <div class="flex flex-wrap items-center justify-between w-full">
                    <div>
                        <h2
                            class="text-xl font-semibold leading-7 text-gray-900"
                        >
                            เพิ่มเที่ยวรถ {id}
                        </h2>
                        <p class="mt-1 text-sm leading-6 text-gray-600">
                            กรุณากรอกรายละเอียดเที่ยวรถที่ต้องการเพิ่ม
                        </p>
                    </div>

                    {#if isDisabled}
                    <div class="flex items-center gap-3">
                        <a href="/AddBus"
                            ><Button
                                id="add-bus"
                                class="ml-0 text-white bg-amber-400 hover:bg-amber-500 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-3 py-2"
                            >
                                <div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        />
                                    </svg>
                                </div></Button
                            >
                            <Tooltip
                                class="text-xs z-50 py-1"
                                type="dark"
                                triggeredBy="#add-bus"
                                placement="bottom"
                            >
                                แก้ไขข้อมูล
                            </Tooltip></a
                        >

                        <a href="/AddStation"
                            ><Button
                                id="add-station"
                                type="button"
                                class="ml-0 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-3 py-2"
                                ><div>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                </div></Button
                            >
                            <Tooltip
                                class="text-xs z-50 py-1"
                                type="dark"
                                triggeredBy="#add-station"
                                placement="bottom"
                            >
                                ลบเที่ยวรถ
                            </Tooltip></a
                        >
                    </div>
                    {/if}
                </div>

                <div class="sm:col-span-6 mt-8">
                    <label
                        for="name"
                        class="block text-base font-medium leading-6 text-gray-900"
                        >ชื่อเที่ยวรถ</label
                    >
                    <div class="mt-2">
                        <input
                            value={tripdata.RouteName}
                            type="text"
                            name="name"
                            id="name"
                            autocomplete="given-name"
                            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>

                <div
                    class="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6"
                >
                    <div class="sm:col-span-3">
                        <label
                            for="origin-bus-stop"
                            class="block text-base font-medium leading-6 text-gray-900"
                            >สถานีต้นทาง</label
                        >
                        <div class="mt-2">
                            {#if isDisabled}
                                <input
                                    value={tripdata.OriginBusStop}
                                    type="text"
                                    name="origin-bus-stop"
                                    id="origin-bus-stop"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            {:else}
                                <select
                                    id="origin-bus-stop"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option selected>เลือกสถานี</option>
                                    <option value="bkk">กรุงเทพ</option>
                                </select>
                            {/if}
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="destination-bus-stop"
                            class="block text-base font-medium leading-6 text-gray-900"
                            >สถานีปลายทาง</label
                        >
                        <div class="mt-2">
                            {#if isDisabled}
                                <input
                                    value={tripdata.DestinationBusStop}
                                    type="text"
                                    name="destination-bus-stop"
                                    id="destination-bus-stop"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            {:else}
                                <select
                                    id="destination-bus-stop"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option selected>เลือกสถานี</option>
                                    <option value="bkk">กรุงเทพ</option>
                                </select>
                            {/if}
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="departure-time"
                            class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >เวลาออกเดินทาง</label
                        >
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
                            >
                                <svg
                                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            {#if isDisabled}
                                <input
                                    value={tripdata.DepartureTime}
                                    type="text"
                                    name="departure-time"
                                    id="departure-time"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            {:else}
                                <input
                                    type="time"
                                    id="departure-time"
                                    class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    min="09:00"
                                    max="18:00"
                                    value="00:00"
                                    required
                                />
                            {/if}
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="arrival-time"
                            class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                            >เวลาถึงปลายทาง</label
                        >
                        <div class="relative">
                            <div
                                class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none"
                            >
                                <svg
                                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            {#if isDisabled}
                                <input
                                    value={tripdata.ArrivalTime}
                                    type="text"
                                    name="arrival-time"
                                    id="arrival-time"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            {:else}
                                <input
                                    type="time"
                                    id="arrival-time"
                                    class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    min="09:00"
                                    max="18:00"
                                    value="00:00"
                                    required
                                />
                            {/if}
                        </div>
                    </div>
                </div>

                <div
                    class="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-5"
                >
                    <h2
                        class="text-base font-semibold leading-7 text-black mb-1"
                    >
                        พนักงานผู้รับผิดชอบ
                    </h2>

                    {#each inputs as input, index}
                        <div class="sm:col-span-1 sm:col-start-1">
                            <label
                                for="empID"
                                class="block text-sm font-medium leading-6 text-gray-900"
                                >รหัสพนักงาน</label
                            >
                            <div class="mt-2">
                                <input
                                    type="text"
                                    name="empID"
                                    id="empID"
                                    autocomplete="address-level2"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-1">
                            <label
                                for="emp-name"
                                class="block text-sm font-medium leading-6 text-gray-900"
                                >ชื่อจริง</label
                            >
                            <div class="mt-2">
                                <input
                                    disabled
                                    type="text"
                                    name="emp-name"
                                    id="emp-name"
                                    autocomplete="address-level1"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-1">
                            <label
                                for="emp-lname"
                                class="block text-sm font-medium leading-6 text-gray-900"
                                >นามสกุล</label
                            >
                            <div class="mt-2">
                                <input
                                    disabled
                                    type="text"
                                    name="emp-lname"
                                    id="emp-lname"
                                    autocomplete="postal-code"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-1">
                            <label
                                for="postal-code"
                                class="block text-sm font-medium leading-6 text-gray-900"
                                >เบอร์โทรศัพท์</label
                            >
                            <div class="mt-2">
                                <input
                                    disabled
                                    type="text"
                                    name="postal-code"
                                    id="postal-code"
                                    autocomplete="postal-code"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-1">
                            <label
                                for="countries"
                                class="block text-sm font-medium leading-6 text-gray-900"
                                >ตำแหน่ง</label
                            >
                            <div class="mt-2">
                                <select
                                    disabled
                                    id="countries"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option selected>เลือกตำแหน่ง</option>
                                    <option value="rider">หนักงานขับรถ</option>
                                    <option value="checker"
                                        >พนักงานตรวจตั๋ว</option
                                    >
                                    <option value="caretaker"
                                        >พนักงานดูแล/ทำความสะอาด</option
                                    >
                                </select>
                            </div>
                        </div>
                    {/each}

                    <div class="sm:col-span-1">
                        <button
                            on:click={addInput}
                            type="button"
                            class=" bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 mt-2 mb-6 rounded inline-flex items-center"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-4 mr-2"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                />
                            </svg>
                            <span class="text-sm">เพิ่มพนักงาน</span>
                        </button>
                    </div>

                    <div class="col-span-full mb-6">
                        <label
                            for="about"
                            class="block text-base font-medium leading-6 text-gray-900"
                            >รายละเอียด</label
                        >
                        <div class="mt-2">
                            <textarea
                                id="about"
                                name="about"
                                rows="3"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            ></textarea>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label
                            for="cover-photo"
                            class="block text-base font-medium leading-6 text-gray-900"
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
                                    data-slot="icon"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                                <div
                                    class="mt-4 flex text-sm leading-6 text-gray-600"
                                >
                                    <label
                                        for="file-upload"
                                        class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            class="sr-only"
                                        />
                                    </label>
                                    <p class="pl-1">or drag and drop</p>
                                </div>
                                <p class="text-xs leading-5 text-gray-600">
                                    PNG, JPG, GIF up to 10MB
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {#if ! isDisabled}
            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    class="text-sm font-semibold leading-6 text-gray-900"
                    >Cancel</button
                >
                <button
                    type="submit"
                    class="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >Save</button
                >
            </div>
            {/if}
        </div>
    </form>
</div>
