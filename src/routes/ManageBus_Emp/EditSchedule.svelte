<script>
    import { onMount, createEventDispatcher } from "svelte";
    import { Tooltip, Button } from "flowbite-svelte";
    import Swal from "sweetalert2";
    import Trip from "../Booking/Trip.svelte";
    import { Route, navigate } from "svelte-routing";
    import { Upload } from "lucide-svelte";
    import { base64 } from "@sveu/browser";

    let inputs = [{}]; // Array to store input values
    let id = null;
    let tripdata = [];
    let isDisabled = true; // เริ่มต้นไม่ disabled
    let mode = null;
    let BusStops = [];
    let Buses = [];
    let routes = []

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

    const dispatch = createEventDispatcher();

    function handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage = e.target.result;
                dispatch("change", { image: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    }

    function handleDragOver(event) {
        event.preventDefault();
    }

    function handleDrop(event) {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage = e.target.result;
                dispatch("change", { image: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    }

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
            employees = data.employees;
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error,
            );
        });

    fetch("/api/routes", {
        method: "GET",
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            routes = data.routes;
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error,
            );
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
            Buses = data.Buses;
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error,
            );
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
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error,
            );
        });

    function toggleDisabled() {
        isDisabled = !isDisabled;
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
                toggleDisabled();
            }
        });
    }

    async function saveChanges() {
        // Prepare the data to be sent
        dataToSend = {
            ScheduleID: tripdata.ScheduleID,
            ScheduleName: tripdata.ScheduleName,
            RouteID: tripdata.RouteID,
            BusID: tripdata.BusID,
            Price: tripdata.Price,
            EmployeeID: tripdata.EmployeeID,
            Origin: tripdata.Origin,
            Destination: tripdata.Destination,
            DepartureTime: new Date(
                departureDate + " " + departureTime + ".00",
            ),
            ArrivalTime: new Date(arrivalDate + " " + arrivalTime + ".00"),
            EmployeeID: tripdata.EmployeeID,
            Description: tripdata.Description,
            Image: tripdata.Image,
        };
        console.log("datatosent:", JSON.stringify(dataToSend));
        console.log("image", tripdata.Image);
        console.log("image", base64(tripdata.Image));

        try {
            console.log("Starting saveChanges function");
            console.log("Route data being sent:", route);

            const res = await fetch(`/api/EditSchedule`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
            });

            console.log("Received response:", res);

            if (!res.ok) {
                const text = await res.text();
                console.error(
                    `HTTP error! status: ${res.status}, body: ${text}`,
                );
                throw new Error(
                    `HTTP error! status: ${res.status}, body: ${text}`,
                );
            }

            const data = await res.json();
            console.log("Response data:", data);
            console.log("Successfully saved Bus");
            return data; // Return the data in case it's needed later
        } catch (error) {
            console.error("SaveRoute error:", error);
            throw error; // Re-throw the error to be caught in saveEdit
        }
    }


    async function saveEdit() {
        const result = await Swal.fire({
            title: "คุณต้องการบันทึกตารางเดินรถนี้หรือไม่?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "บันทึก",
            denyButtonText: `ไม่บันทึก`,
        });

        if (result.isConfirmed) {
            try {
                tripdata.Image = previewImage;
                await saveChanges();
                console.log("sussces");
                await Swal.fire("บันทึกเรียบร้อย!", "", "success");
                navigate(`/ManageBus_Emp`, { replace: true });
            } catch (error) {
                console.error("SaveRoute error:", error);
                await Swal.fire(
                    "เกิดข้อผิดพลาด!",
                    "ไม่สามารถบันทึกข้อมูลได้",
                    "error",
                );
            }
        } else if (result.isDenied) {
            await Swal.fire("การบันทึกถูกยกเลิก", "", "info");
            navigate(`/ManageBus_Emp`, { replace: true });
        }
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
        mode = urlParams.get("mode");

        if (mode == "edit") {
            isDisabled = false;
        } else if (mode == "view") {
            isDisabled = true;
        }

        fetch(`/api/GetOneSchedule`, {
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
                tripdata = data.routes[0];

                previewImage = tripdata.Image;

                departureDateTime = new Date(tripdata.DepartureTime);
                departureDate = departureDateTime.toISOString().split("T")[0];
                departureTime = departureDateTime.toTimeString().slice(0, 5);

                arrivalDateTime = new Date(tripdata.ArrivalTime);
                arrivalDate = arrivalDateTime.toISOString().split("T")[0];
                arrivalTime = arrivalDateTime.toTimeString().slice(0, 5);
            })
            .catch((error) => {
                console.error(
                    "There was a problem with the fetch operation:",
                    error,
                );
            });
    });

    function deleteCard(id) {
        Swal.fire({
            title: "คุณยืนยันที่จะลบเที่ยวรถนี้หรือไม่",
            text: "หลังจากลบแล้ว คุณจะไม่สามารถกู้คืนได้",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "ยืนยัน!",
            cancelButtonText: "ยกเลิก",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch("/api/DeleteSchedule", {
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
                    .then(() => {
                        Swal.fire({
                            title: "ลบ!",
                            text: "เที่ยวรถถูกลบเรียบร้อยแล้ว",
                            icon: "success",
                        });
                        navigate(`/ManageBus_Emp`, { replace: true });
                    })
                    .catch((error) => {
                        console.error(
                            "There was a problem with the fetch operation:",
                            error,
                        );
                    });
            }
        });
    }
</script>

<div>
    <form style="margin: 4% 5%;">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <div class="flex flex-wrap items-center justify-between w-full">
                    {#if isDisabled}
                        <div>
                            <h1
                                class="text-2xl font-semibold leading-7 text-gray-900"
                            >
                                {tripdata.ScheduleCode}: {tripdata.ScheduleName}
                            </h1>
                            <p class="mt-3 text-xs text-red-500">
                                หากต้องการแก้ไขข้อมูล ให้คลิกปุ่มแก้ไขทางด้านขวา
                            </p>
                        </div>
                        <div class="flex items-center gap-3">
                            <Button
                                on:click={toggleDisabled}
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
                            </Tooltip>

                            <Button
                                on:click={deleteCard(tripdata.ScheduleID)}
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
                            </Tooltip>
                        </div>
                    {/if}
                </div>

                {#if !isDisabled}
                    <div class="sm:col-span-6">
                        <label
                            for="name"
                            class="block text-base font-medium leading-6"
                            >ชื่อเที่ยวรถ</label
                        >
                        <div class="mt-2">
                            <input
                                disabled={isDisabled}
                                bind:value={tripdata.ScheduleName}
                                type="text"
                                name="name"
                                id="name"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                {/if}

                <div
                    class="mt-6 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6"
                >
                    {#if !isDisabled}
                        {#each inputs as input, index}
                            <div class="sm:col-span-4 sm:col-start-1">
                                <label
                                    for="type"
                                    class="block text-base font-medium leading-6 text-gray-900"
                                    >รถบัส</label
                                >
                                <div class="mt-2">
                                    <select
                                        bind:value={tripdata.BusID}
                                        disabled={isDisabled}
                                        name="bus"
                                        id="bus"
                                        autocomplete="address-level2"
                                        class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                        {#each Buses as data}
                                            <option value={data.BusID}>
                                                {data.BusCode}: {data.Type}
                                                {data.Capacity} ที่นั่ง
                                            </option>
                                        {/each}
                                    </select>
                                </div>
                            </div>
                        {/each}
                    {:else}
                        <div class="sm:col-span-2">
                            <label
                                for="type"
                                class="block text-base font-medium leading-6 text-gray-900"
                                >ประเภทรถ</label
                            >
                            <div class="mt-2">
                                <input
                                    disabled
                                    bind:value={tripdata.Type}
                                    type="text"
                                    name="type"
                                    id="type"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div class="sm:col-span-2">
                            <label
                                for="capacity"
                                class="block text-base font-medium leading-6 text-gray-900"
                                >จำนวนที่นั่ง</label
                            >
                            <div class="mt-2">
                                <input
                                    disabled={isDisabled}
                                    value={tripdata.Capacity}
                                    type="text"
                                    name="capacity"
                                    id="capacity"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    {/if}

                    <div class="sm:col-span-2">
                        <label
                            for="price"
                            class="block text-base font-medium leading-6 text-gray-900"
                            >ราคา</label
                        >
                        <div class="mt-2">
                            <input
                                disabled={isDisabled}
                                bind:value={tripdata.Price}
                                type="text"
                                name="price"
                                id="price"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    {#if isDisabled}
                        <div class="sm:col-span-3">
                            <label
                                for="origin-bus-stop"
                                class="block text-base font-medium leading-6 text-gray-900"
                                >สถานีต้นทาง</label
                            >
                            <div class="mt-2">
                                <textarea
                                    disabled
                                    value={tripdata.OriginBusStop +
                                        "\n" +
                                        tripdata.OriginAddress +
                                        " " +
                                        tripdata.OriginSubprovince +
                                        " " +
                                        tripdata.OriginProvince}
                                    name="origin-bus-stop"
                                    id="origin-bus-stop"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div class="sm:col-span-3">
                            <label
                                for="destination-bus-stop"
                                class="block text-base font-medium leading-6 text-gray-900"
                                >สถานีปลายทาง</label
                            >
                            <div class="mt-2">
                                <textarea
                                    disabled
                                    value={tripdata.DestinationBusStop +
                                        "\n" +
                                        tripdata.DestinationAddress +
                                        " " +
                                        tripdata.DestinationSubprovince +
                                        " " +
                                        tripdata.DestinationProvince}
                                    type="text"
                                    name="destination-bus-stop"
                                    id="destination-bus-stop"
                                    autocomplete="given-name"
                                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                    {:else}
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
                    {/if}

                    <div class="sm:col-span-3">
                        <label
                            for="departure-time"
                            class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                        >
                            เวลาออกเดินทาง
                        </label>
                        <div class="flex space-x-4">
                            <div class="relative w-1/2">
                                <input
                                    disabled={isDisabled}
                                    type="date"
                                    bind:value={arrivalDate}
                                    id="departure-date"
                                    class=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                                <div
                                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                                >
                                    <svg
                                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                            <div class="relative w-1/2">
                                <input
                                    disabled={isDisabled}
                                    bind:value={arrivalTime}
                                    type="time"
                                    id="departure-time"
                                    class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    min="09:00"
                                    max="18:00"
                                    required
                                />

                                <div
                                    class="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none"
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
                            </div>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="departure-time"
                            class="block mb-2 text-base font-medium text-gray-900 dark:text-white"
                        >
                            เวลาถึงปลายทาง
                        </label>
                        <div class="flex space-x-4">
                            <div class="relative w-1/2">
                                <input
                                    type="date"
                                    bind:value={departureDate}
                                    id="departure-date"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    disabled={isDisabled}
                                />
                                <div
                                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                                >
                                    <svg
                                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fill-rule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                </div>
                            </div>

                            <div class="relative w-1/2">
                                <input
                                    disabled={isDisabled}
                                    bind:value={departureTime}
                                    type="time"
                                    id="departure-time"
                                    class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required
                                />
                                <div
                                    class="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none"
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
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="mt-6 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-4"
                >
                    <h2
                        class="text-base font-semibold leading-7 text-black mb-1"
                    >
                        พนักงานขับรถ (หลัก)
                    </h2>

                    {#each inputs as input, index}
                        <div class="sm:col-span-4 sm:col-start-1">
                            <div>
                                <select
                                    bind:value={tripdata.EmployeeID}
                                    disabled={isDisabled}
                                    name="empID"
                                    id="empID"
                                    autocomplete="address-level2"
                                    class="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                >
                                    {#each employees as employee}
                                        <option value={employee.UserID}>
                                            {employee.EmployeeCode} - {employee.Fname}
                                            {employee.Lname} ({employee.Phone})
                                        </option>
                                    {/each}
                                </select>
                            </div>
                        </div>
                    {/each}
                    <!--
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
                -->

                    <div class="col-span-full mb-6 mt-4">
                        <label
                            for="about"
                            class="block text-base font-medium leading-6 text-gray-900"
                            >รายละเอียด</label
                        >
                        <div class="mt-2">
                            <textarea
                                bind:value={tripdata.Description}
                                disabled={isDisabled}
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
                        {#if isDisabled}
                            <img class="mt-3" src={tripdata.Image} alt="" />
                        {:else}
                            <div
                                class="mt-3 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10"
                                on:dragover={handleDragOver}
                                on:drop={handleDrop}
                                role="button"
                                tabindex="0"
                                aria-label="อัพโหลดรูปภาพ"
                            >
                                <div class="text-center">
                                    {#if previewImage}
                                        <img
                                            src={previewImage}
                                            alt="รูปภาพที่อัพโหลด"
                                            class="mx-auto h-32 w-32 object-cover rounded-lg"
                                        />
                                    {:else}
                                        <Upload
                                            class="mx-auto h-12 w-12 text-gray-300"
                                        />
                                    {/if}
                                    <div
                                        class="mt-4 flex text-sm leading-6 text-gray-600"
                                    >
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
                                                on:change={handleFileChange}
                                                bind:this={fileInput}
                                                accept="image/*"
                                            />
                                        </label>
                                        <p class="pl-1">หรือลากและวาง</p>
                                    </div>
                                    <p class="text-xs leading-5 text-gray-600">
                                        PNG, JPG, GIF ไม่เกิน 10MB
                                    </p>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
            </div>

            {#if !isDisabled}
                <div class="mt-6 flex items-center justify-end gap-x-6">
                    <Button
                        on:click={cancel}
                        type="button"
                        class="text-sm font-semibold leading-6 text-gray-900"
                        >Cancel</Button
                    >
                    <button
                        on:click={saveEdit}
                        type="button"
                        class="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >Save</button
                    >
                </div>
            {/if}
        </div>
    </form>
</div>
