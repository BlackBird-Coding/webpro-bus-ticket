<script>
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from "flowbite-svelte";

    let history = [];

    fetch(`/api/history`, {
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
            history = data.history;
        })
        .catch((error) => {
            console.error(
                "There was a problem with the fetch operation:",
                error,
            );
        });
</script>

<div class="m-10">
    <div class="flex flex-wrap items-center gap-5 w-full">
        <h1 class="flex text-xl row-span-3">ตรวจสอบประวัติการจอง</h1>
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
                    placeholder="ค้นหาประวัติการจอง"
                    required
                />
                <button
                    type="submit"
                    class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >Search</button
                >
            </div>
        </form>
    </div>

    <br />
    <Table hoverable={true}>
        <TableHead class="bg-slate-200 rounded-md py-2 text-base text-center">
            <TableHeadCell>เลขที่การจอง</TableHeadCell>
            <TableHeadCell>ชื่อผู้โดยสาร</TableHeadCell>
            <TableHeadCell>ชื่อเที่ยวรถ</TableHeadCell>
            <TableHeadCell>เวลาออกเดินทาง-ถึงปลายทาง</TableHeadCell>
            <TableHeadCell>ประเภทรถ</TableHeadCell>
            <TableHeadCell>เลขที่นั่ง</TableHeadCell>
            <TableHeadCell>สถานะการจอง</TableHeadCell>
            <TableHeadCell>
                <span class="sr-only">Action</span>
            </TableHeadCell>
        </TableHead>
        <TableBody>
            {#each history as data}
            <TableBodyRow class="text-center">
                <TableBodyCell>{data.BookingID}</TableBodyCell>
                <TableBodyCell>{data.Fname} {data.Lname}</TableBodyCell>
                <TableBodyCell>{data.RouteName}</TableBodyCell>
                <TableBodyCell>{data.DepartureTime} - {data.ArrivalTime}</TableBodyCell>
                <TableBodyCell>{data.Type}</TableBodyCell>
                <TableBodyCell>{data.SeatNumber}</TableBodyCell>
                <TableBodyCell>{data.Status}</TableBodyCell>
                <TableBodyCell class="flex gap-5">
                    <a class="text-orange-400 hover:underline" href="/">เลื่อนตั๋ว</a>
                </TableBodyCell>
            </TableBodyRow>
            {/each}
        </TableBody>
    </Table>
</div>
