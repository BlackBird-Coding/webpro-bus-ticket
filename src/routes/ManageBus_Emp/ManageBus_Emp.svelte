<script lang="ts" src="../path/to/flowbite/dist/flowbite.min.js">
    import Swal from "sweetalert2";
    import { navigate } from "svelte-routing";
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
    import SvgSchedule from "@/lib/components/SvgSchedule.svelte"
    import SvgRoute from "@/lib/components/SvgRoute.svelte"
    import SvgBus from "@/lib/components/SvgBus.svelte"
    import SvgStation from "@/lib/components/SvgStation.svelte"

    let schedules = [];

    function getSchedules() {
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
        getSchedules();
    });

    function goToPage(id, mode) {
        navigate(`/EditSchedule?id=${id}&mode=${mode}`, { replace: false }); // Pass the button ID as a query parameter
    }

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
                        getSchedules();
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
    <div class="flex flex-wrap items-center gap-3 w-full mb-8">
        <h1 class="flex text-2xl"><b>จัดการเที่ยวรถ</b></h1>

        <div class="flex lg:ml-auto w-full lg:w-1/4 gap-x-3 justify-end">
            <a href="/AddBus"
                ><Button
                    id="add-bus"
                    class="ml-0 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-3 py-2"
                >
                    <div>
                        <SvgBus></SvgBus>
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

            <a href="/AddStation"
                ><Button
                    id="add-station"
                    type="button"
                    class="ml-0 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-3 py-2"
                    ><div>
                       <SvgStation></SvgStation>
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

            <a href="/AddRoute"
                ><Button
                    id="add-route"
                    class="ml-0 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-3 py-2"
                >
                    <div>
                        <SvgRoute></SvgRoute>
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
            <Button
                on:click={() => goToPage(0, "add")}
                id="add-schedule"
                class="ml-0 text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-3 py-2"
            >
                <div>
                    <SvgSchedule></SvgSchedule>
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
        </div>
    </div>
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
