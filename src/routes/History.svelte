<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
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
    <br>
    <Table hoverable={true}>
        <TableHead class="bg-slate-200 rounded-md py-2 text-base text-center">
            <TableHeadCell>เลขที่การจอง</TableHeadCell>
            <TableHeadCell>ชื่อผู้โดยสาร</TableHeadCell>
            <TableHeadCell>วันที่เดินทาง</TableHeadCell>
            <TableHeadCell>ต้นทาง-ปลายทาง</TableHeadCell>
            <TableHeadCell>เลขที่นั่ง</TableHeadCell>
            <TableHeadCell>ราคาสุทธิ</TableHeadCell>
            <TableHeadCell>สถานะการจอง</TableHeadCell>
            <TableHeadCell>
                <span class="sr-only">Action</span>
            </TableHeadCell>
        </TableHead>
        <TableBody>
            <TableBodyRow class="text-center">
                <TableBodyCell>000001</TableBodyCell>
                <TableBodyCell>ชวัล แซ่ย่าง</TableBodyCell>
                <TableBodyCell>20/10/2024</TableBodyCell>
                <TableBodyCell>กรุงเทพ-หัวหิน</TableBodyCell>
                <TableBodyCell>A1</TableBodyCell>
                <TableBodyCell>600.00 บาท</TableBodyCell>
                <TableBodyCell>จองเสร็จสิ้น</TableBodyCell>
                <TableBodyCell class="flex gap-5">
                  <a class="text-blue-500 hover:underline" href="/">เลื่อนตั๋ว</a>
                  <div class="flex gap-5 justify-center">
                    <!-- Link to ticket-details page with ticket ID as a query parameter -->
                    <a class="text-red-600 hover:underline" href={`/ticket-details?id=000001`}>แสดงตั๋ว</a>
                  </div>
                </TableBodyCell>
            </TableBodyRow>

            <TableBodyRow class="text-center">
                <TableBodyCell>000002</TableBodyCell>
                <TableBodyCell>ชวัล แซ่ย่าง</TableBodyCell>
                <TableBodyCell>20/10/2024</TableBodyCell>
                <TableBodyCell>กรุงเทพ-หัวหิน</TableBodyCell>
                <TableBodyCell>A2</TableBodyCell>
                <TableBodyCell>600.00 บาท</TableBodyCell>
                <TableBodyCell>จองเสร็จสิ้น</TableBodyCell>
                <TableBodyCell class="flex gap-5">
                  <a class="text-blue-500 hover:underline" href="/">เลื่อนตั๋ว</a>
                  <!-- Link to ticket-details page with ticket ID as a query parameter -->
                  <a class="text-red-600 hover:underline" href={`/ticket-details?id=000002`}>แสดงตั๋ว</a>
                </TableBodyCell>
            </TableBodyRow>              
        </TableBody>
    </Table>
</div>