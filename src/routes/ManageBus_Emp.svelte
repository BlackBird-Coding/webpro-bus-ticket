<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
</script>

<div class="m-10">
    <h1 class="text-xl">จัดการเที่ยวรถ</h1>
    <br>
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