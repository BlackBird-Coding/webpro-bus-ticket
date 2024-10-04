<script>
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell } from 'flowbite-svelte';
</script>
<div class="m-10">
    <Table hoverable={true}>
        <TableHead class="bg-slate-200 rounded-md py-2 text-lg text-center">
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
                    <a class="text-red-600 hover:underline" href="/">แสดงตั๋ว</a>
                </TableBodyCell>
            </TableBodyRow>
            <TableBodyRow class="text-center">
                <TableBodyCell>000002</TableBodyCell>
                <TableBodyCell>ชวัล แซ่ย่าง</TableBodyCell>
                <TableBodyCell>20/10/2024</TableBodyCell>
                <TableBodyCell>กรุงเทพ-หัวหิน</TableBodyCell>
                <TableBodyCell>A1</TableBodyCell>
                <TableBodyCell>600.00 บาท</TableBodyCell>
                <TableBodyCell>จองเสร็จสิ้น</TableBodyCell>
                <TableBodyCell class="flex gap-5">
                    <a class="text-blue-500 hover:underline" href="/">เลื่อนตั๋ว</a>
                    <a class="text-red-600 hover:underline" href="/">แสดงตั๋ว</a>
                </TableBodyCell>
            </TableBodyRow>
        </TableBody>
    </Table>
</div>