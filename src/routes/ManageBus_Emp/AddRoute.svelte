<script>
    import { onMount, createEventDispatcher } from "svelte";
    import { Tooltip, Button } from "flowbite-svelte";
    import Swal from "sweetalert2";
    import { Route, navigate } from "svelte-routing";

    let BusStops = [];
    let route = {
        RouteName: "",
        Origin: "",
        Destination: "",
    };

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
            console.error(
                "There was a problem with the fetch operation:",
                error,
            );
        });

    async function saveChanges() {
        try {
            console.log("Starting saveChanges function");
            console.log("Route data being sent:", route);

            const res = await fetch(`/api/AddRoute`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(route),
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
            title: "คุณต้องการบันทึกเส้นทางการเดินทางนี้หรือไม่?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "บันทึก",
            denyButtonText: `ไม่บันทึก`,
        });

        if (result.isConfirmed) {
            try {
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
                <h2 class="text-2xl font-bold leading-7 text-gray-900 flex items-center gap-x-3">
                    <b>เพิ่มเส้นทางการเดินทาง</b>
                </h2>
                <p class="mt-2 text-sm leading-6 text-gray-600">
                    กรุณากรอกรายละเอียดเส้นทางการเดินทางที่ต้องการเพิ่ม
                </p>

                <div
                    class="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6"
                >
                    <div class="sm:col-span-full">
                        <label
                            for="trip-name"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >ชื่อเที่ยวรถ</label
                        >
                        <div class="mt-2">
                            <input
                                bind:value={route.RouteName}
                                type="text"
                                name="trip-name"
                                id="trip-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="origin-bus-stop"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >สถานีต้นทาง</label
                        >
                        <div class="mt-2">
                            <select
                                bind:value={route.Origin}
                                id="origin-bus-stop"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="" selected
                                    >เลือกสถานีต้นทาง</option
                                >
                                {#each BusStops as data}
                                    <option value={data.BusStopID}
                                        >{data.Name}</option
                                    >
                                {/each}
                            </select>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="destination-bus-stop"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >สถานีปลายทาง</label
                        >
                        <div class="mt-2">
                            <select
                                bind:value={route.Destination}
                                id="destination-bus-stop"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            >
                                <option value="" selected
                                    >เลือกสถานีปลายทาง</option
                                >
                                {#each BusStops as data}
                                    <option value={data.BusStopID}
                                        >{data.Name}</option
                                    >
                                {/each}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

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
        </div>
    </form>
</div>
