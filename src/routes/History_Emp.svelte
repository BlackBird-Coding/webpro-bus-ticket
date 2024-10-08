<script>
    import {
        Table,
        TableBody,
        TableBodyCell,
        TableBodyRow,
        TableHead,
        TableHeadCell,
    } from "flowbite-svelte";
</script>

<div class="m-10">
    <div class='flex flex-wrap items-center gap-5 w-full'>
        <h1 class="flex text-xl row-span-3">จัดการเที่ยวรถ</h1>
        <div class='flex lg:ml-auto max-lg:w-full'>
            <div
                class="flex xl:w-80 max-xl:w-full bg-gray-100 px-6 py-3 rounded outline outline-transparent focus-within:outline-[#007bff] focus-within:bg-transparent"
            >
                <input
                    type="text"
                    placeholder="Search something..."
                    class="w-full text-sm bg-transparent rounded outline-none pr-2"
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192.904 192.904"
                    width="16px"
                    class="cursor-pointer fill-gray-400"
                >
                    <path
                        d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"
                    >
                    </path>
                </svg>
            </div>
        </div>
    </div>

    <br />
    <Table hoverable={true}>
        <TableHead class="bg-slate-200 rounded-md py-2 text-base text-center">
            <TableHeadCell>เลขที่การจอง</TableHeadCell>
            <TableHeadCell>ชื่อเที่ยวรถ</TableHeadCell>
            <TableHeadCell>ต้นทาง-ปลายทาง</TableHeadCell>
            <TableHeadCell>เวลาออกเดินทาง-ถึงปลายทาง</TableHeadCell>
            <TableHeadCell>จำนวนที่นั่ง</TableHeadCell>
            <TableHeadCell>
                <span class="sr-only">Action</span>
            </TableHeadCell>
        </TableHead>
        <TableBody>
            <TableBodyRow class="text-center">
                <TableBodyCell>000001</TableBodyCell>
                <TableBodyCell>กรุงเทพ-หัวหิน</TableBodyCell>
                <TableBodyCell>กรุงเทพ-หัวหิน</TableBodyCell>
                <TableBodyCell>10.00-12.00</TableBodyCell>
                <TableBodyCell>40</TableBodyCell>
                <TableBodyCell class="flex gap-5">
                    <a class="text-blue-500 hover:underline" href="/">แก้ไข</a>
                    <a class="text-red-600 hover:underline" href="/">ลบ</a>
                </TableBodyCell>
            </TableBodyRow>
            <TableBodyRow class="text-center">
                <TableBodyCell>000002</TableBodyCell>
                <TableBodyCell>กรุงเทพ-เชียงใหม่</TableBodyCell>
                <TableBodyCell>กรุงเทพ-เชียงใหม่</TableBodyCell>
                <TableBodyCell>10.00-19.00</TableBodyCell>
                <TableBodyCell>40</TableBodyCell>
                <TableBodyCell class="flex gap-5">
                    <a class="text-blue-500 hover:underline" href="/">แก้ไข</a>
                    <a class="text-red-600 hover:underline" href="/">ลบ</a>
                </TableBodyCell>
            </TableBodyRow>
        </TableBody>
    </Table>
</div>
