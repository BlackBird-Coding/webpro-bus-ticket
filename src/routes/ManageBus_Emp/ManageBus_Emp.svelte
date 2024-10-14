<script lang="ts" src="../path/to/flowbite/dist/flowbite.min.js">
    import Swal from "sweetalert2";
    import { Link, Route, navigate } from "svelte-routing";
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
        Tooltip,
        Button,
    } from "flowbite-svelte";
    import { onMount } from "svelte";

    let schedules = [];

    // Function to navigate to the second page with the ID passed in the URL
    function goToPage(id, mode) {
        navigate(`/EditSchedule?id=${id}&mode=${mode}`, { replace: false }); // Pass the button ID as a query parameter
    }


function getSchedules () {
    fetch(`/api/getSchedules`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            schedules = data.schedule;
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error,
            );
        });

}
    
onMount(() => {
getSchedules()
})

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
                        getSchedules()
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

<div class="m-10">
    <div class="flex flex-wrap items-center gap-3 w-full">
        <h1 class="flex text-xl">จัดการเที่ยวรถ</h1>

        <form class="flex items-center lg:ml-auto w-full lg:w-1/4">
            <!-- Adjust width here -->
            <label
                for="search"
                class="mb-4 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >Search</label
            >
            <div class="relative w-full">
                <div
                    class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
                >
                    <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>
                <input
                    type="search"
                    id="search"
                    class="block w-full py-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="ค้นหาเที่ยวรถ"
                    required
                />
                <button
                    type="submit"
                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Search</button
                >
            </div>
        </form>

        <Button
                on:click={() => goToPage(0, "add")}
                id="add-schedule"
                class="ml-0 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-3 py-2"
            >
                <div>
                    <svg
                        class="w-6 h-6 fill-[#ffffff]"
                        version="1.1"
                        id="_x32_"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 512 512"
                        xml:space="preserve"
                        fill="#000000"
                        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g><g id="SVGRepo_iconCarrier">
                            <style type="text/css">
                                .st0 {
                                    fill: #ffffff;
                                }
                            </style>
                            <g>
                                <rect
                                    x="119.256"
                                    y="222.607"
                                    class="st0"
                                    width="50.881"
                                    height="50.885"
                                ></rect>
                                <rect
                                    x="341.863"
                                    y="222.607"
                                    class="st0"
                                    width="50.881"
                                    height="50.885"
                                ></rect>
                                <rect
                                    x="267.662"
                                    y="222.607"
                                    class="st0"
                                    width="50.881"
                                    height="50.885"
                                ></rect>
                                <rect
                                    x="119.256"
                                    y="302.11"
                                    class="st0"
                                    width="50.881"
                                    height="50.885"
                                ></rect>
                                <rect
                                    x="267.662"
                                    y="302.11"
                                    class="st0"
                                    width="50.881"
                                    height="50.885"
                                ></rect>
                                <rect
                                    x="193.46"
                                    y="302.11"
                                    class="st0"
                                    width="50.881"
                                    height="50.885"
                                ></rect>
                                <rect
                                    x="341.863"
                                    y="381.612"
                                    class="st0"
                                    width="50.881"
                                    height="50.885"
                                ></rect>
                                <rect
                                    x="267.662"
                                    y="381.612"
                                    class="st0"
                                    width="50.881"
                                    height="50.885"
                                ></rect>
                                <rect
                                    x="193.46"
                                    y="381.612"
                                    class="st0"
                                    width="50.881"
                                    height="50.885"
                                ></rect>
                                <path
                                    class="st0"
                                    d="M439.277,55.046h-41.376v39.67c0,14.802-12.195,26.84-27.183,26.84h-54.025 c-14.988,0-27.182-12.038-27.182-26.84v-39.67h-67.094v39.297c0,15.008-12.329,27.213-27.484,27.213h-53.424 c-15.155,0-27.484-12.205-27.484-27.213V55.046H72.649c-26.906,0-48.796,21.692-48.796,48.354v360.246 c0,26.661,21.89,48.354,48.796,48.354h366.628c26.947,0,48.87-21.692,48.87-48.354V103.4 C488.147,76.739,466.224,55.046,439.277,55.046z M453.167,462.707c0,8.56-5.751,14.309-14.311,14.309H73.144 c-8.56,0-14.311-5.749-14.311-14.309V178.089h394.334V462.707z"
                                ></path>
                                <path
                                    class="st0"
                                    d="M141.525,102.507h53.392c4.521,0,8.199-3.653,8.199-8.144v-73.87c0-11.3-9.27-20.493-20.666-20.493h-28.459 c-11.395,0-20.668,9.192-20.668,20.493v73.87C133.324,98.854,137.002,102.507,141.525,102.507z"
                                ></path>
                                <path
                                    class="st0"
                                    d="M316.693,102.507h54.025c4.348,0,7.884-3.513,7.884-7.826V20.178C378.602,9.053,369.474,0,358.251,0H329.16 c-11.221,0-20.349,9.053-20.349,20.178v74.503C308.81,98.994,312.347,102.507,316.693,102.507z"
                                ></path>
                            </g>
                        </g></svg
                    >
                </div></Button
            >
            <Tooltip
                class="text-xs z-50 py-1"
                type="dark"
                triggeredBy="#add-schedule"
                placement="bottom"
            >
                Add Schedule
            </Tooltip>

        <a href="/AddStation"
            ><Button
                id="add-station"
                type="button"
                class="ml-0 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-3 py-2"
                ><div>
                    <svg
                        class="w-6 h-6 fill-[#ffffff]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        ><path
                            fill="currentColor"
                            d="M20 3H7V2H6a1.78 1.78 0 0 0-1.41 1H2v2h1.73C2 10.58 2 22 2 22h5V5h13m2 3.5a2.5 2.5 0 1 0-3 2.5v11h1V11a2.5 2.5 0 0 0 2-2.5m-7 3V16h-1v6h-1.5v-5h-1v5H10v-6H9v-4.5a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5m-3-5A1.5 1.5 0 1 0 13.5 8A1.5 1.5 0 0 0 12 6.5"
                        /></svg
                    >
                </div></Button
            >
            <Tooltip
                class="text-xs z-50 py-1"
                type="dark"
                triggeredBy="#add-station"
                placement="bottom"
            >
                Add Station
            </Tooltip></a
        >
        <a href="/AddBus"
            ><Button
                id="add-bus"
                class="ml-0 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-3 py-2"
            >
                <div>
                    <svg
                        class="w-6 h-6 fill-[#ffffff]"
                        viewBox="0 0 448 512"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
                        <path
                            d="M224 0C348.8 0 448 35.2 448 80V96 416c0 17.7-14.3 32-32 32v32c0 17.7-14.3 32-32 32H352c-17.7 0-32-14.3-32-32V448H128v32c0 17.7-14.3 32-32 32H64c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32V96 80C0 35.2 99.2 0 224 0zM64 128V256c0 17.7 14.3 32 32 32H352c17.7 0 32-14.3 32-32V128c0-17.7-14.3-32-32-32H96c-17.7 0-32 14.3-32 32zM80 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
                        ></path>
                    </svg>
                </div></Button
            >
            <Tooltip
                class="text-xs z-50 py-1"
                type="dark"
                triggeredBy="#add-bus"
                placement="bottom"
            >
                Add Bus
            </Tooltip></a
        >
        <a href="/AddRoute"
            ><Button
                id="add-route"
                class="ml-0 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-3 py-2"
            >
                <div>
                    <svg
                        class="w-6 h-6 fill-none"
                        xmlns="http://www.w3.org/2000/svg"
                        stroke="#ffffff"
                        ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        ></g><g id="SVGRepo_iconCarrier">
                            <path
                                d="M6 21C7.5 19.4 9 17.9673 9 16.2C9 14.4327 7.65685 13 6 13C4.34315 13 3 14.4327 3 16.2C3 17.9673 4.5 19.4 6 21ZM6 21H17.5C18.8807 21 20 19.8807 20 18.5C20 17.1193 18.8807 16 17.5 16H15M18 11C19.5 9.4 21 7.96731 21 6.2C21 4.43269 19.6569 3 18 3C16.3431 3 15 4.43269 15 6.2C15 7.96731 16.5 9.4 18 11ZM18 11H14.5C13.1193 11 12 12.1193 12 13.5C12 14.8807 13.1193 16 14.5 16H15.6"
                                stroke="#ffffff"
                                stroke-width="2.5"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                            ></path>
                        </g></svg
                    >
                </div></Button
            >
            <Tooltip
                class="text-xs z-50 py-1"
                type="dark"
                triggeredBy="#add-route"
                placement="bottom"
            >
                Add Route
            </Tooltip></a
        >
    </div>

    <br />
    <Table hoverable={true}>
        <TableHead class="bg-slate-200 rounded-md py-2 text-base text-center">
            <TableHeadCell>เลขเที่ยวรถ</TableHeadCell>
            <TableHeadCell>เที่ยวรถ</TableHeadCell>
            <TableHeadCell>เวลาออกเดินทาง - ถึงปลายทาง</TableHeadCell>
            <TableHeadCell>จำนวนที่นั่ง</TableHeadCell>
            <TableHeadCell>รายละเอียด</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each schedules as data}
                <TableBodyRow class="text-center">
                    <TableBodyCell>{data.ScheduleCode}</TableBodyCell>
                    <TableBodyCell
                        >{data.ScheduleName} ({data.Type})</TableBodyCell
                    >
                    <TableBodyCell
                        >({data.DepartureTime.toLocaleString().slice(2, -3)}) -
                        ({data.ArrivalTime.toLocaleString().slice(
                            2,
                            -3,
                        )})</TableBodyCell
                    >
                    <TableBodyCell>{data.Capacity}</TableBodyCell>
                    <TableBodyCell>
                        <button
                            on:click={() => goToPage(data.ScheduleID, "view")}
                            class="text-blue-500 hover:underline">คลิก</button
                        >
                    </TableBodyCell>
                    <TableBodyCell class="flex gap-5">
                        <button
                            on:click={() => goToPage(data.ScheduleID, "edit")}
                            class="text-orange-400 hover:text-aorange-500 hover:underline"
                            >แก้ไข</button
                        >
                        <button
                            on:click={deleteCard(data.ScheduleID)}
                            class="text-red-600 hover:underline"
                            id="showCardButton"
                        >
                            ลบ</button
                        >
                    </TableBodyCell>
                </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>
