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

    let showTooltip = false; // state to control tooltip visibility
    let tripdata = [];

    // Function to navigate to the second page with the ID passed in the URL
    function goToPage(id) {
        navigate(`/EditBus?id=${id}`, { replace: true }); // Pass the button ID as a query parameter
    }

    fetch(`/api/ManageBus_Emp`, {
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
            tripdata = data.routes;
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error,
            );
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
                fetch("/api/DeleteRoute", {
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
                        location.reload()
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
                Add Trip
            </Tooltip></a
        >

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
                Add Stop
            </Tooltip></a
        >
    </div>

    <br />
    <Table hoverable={true}>
        <TableHead class="bg-slate-200 rounded-md py-2 text-base text-center">
            <TableHeadCell>เลขเที่ยวรถ</TableHeadCell>
            <TableHeadCell>ชื่อเที่ยวรถ</TableHeadCell>
            <TableHeadCell>เวลาออกเดินทาง-ถึงปลายทาง</TableHeadCell>
            <TableHeadCell>จำนวนที่นั่ง</TableHeadCell>
            <TableHeadCell>รายละเอียด</TableHeadCell>
            <TableHeadCell>Action</TableHeadCell>
        </TableHead>
        <TableBody>
            {#each tripdata as trip}
                <TableBodyRow class="text-center">
                    <TableBodyCell>{trip.RouteID}</TableBodyCell>
                    <TableBodyCell>{trip.RouteName} ({trip.Type})</TableBodyCell
                    >
                    <TableBodyCell
                        >({trip.DepartureTime.toLocaleString()}) - ({trip.ArrivalTime.toLocaleString()})</TableBodyCell
                    >
                    <TableBodyCell>{trip.Capacity}</TableBodyCell>
                    <TableBodyCell>
                        <a class="text-blue-500 hover:underline" href="/EditBus"
                            >คลิก</a
                        >
                    </TableBodyCell>
                    <TableBodyCell class="flex gap-5">
                        <button
                            on:click={() => goToPage(trip.RouteID)}
                            class="text-blue-500 hover:underline">แก้ไข</button
                        >
                        <button
                            on:click={deleteCard(trip.RouteID)}
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
