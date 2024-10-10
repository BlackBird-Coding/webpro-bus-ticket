<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Radio,
  } from "flowbite-svelte";
  import Sidebar from "@/lib/Sidebar.svelte";
</script>

<div class="flex ml-16">
  <Sidebar current={1}></Sidebar>
  <div class="m-10 mx-20 w-4/5">
    <div class="text-3xl">เลือกเที่ยวรถ</div>
    <div class="mt-5">
      <div class="text-2xl mb-5">เที่ยวไป</div>
      <Table hoverable={true}>
        <TableHead
          class="bg-[#4F75FF] rounded-md py-2 text-lg text-center text-white"
        >
          <TableHeadCell>รถออก</TableHeadCell>
          <TableHeadCell>เส้นทาง</TableHeadCell>
          <TableHeadCell>ที่นั่งว่าง</TableHeadCell>
          <TableHeadCell>ราคา</TableHeadCell>
          <TableHeadCell>
            <span class="sr-only">Action</span>
          </TableHeadCell>
        </TableHead>
        <TableBody>
          <TableBodyRow class="text-center">
            <TableBodyCell>06:30</TableBodyCell>
            <TableBodyCell>กรุงเทพฯ(หมอชิต2) - หาดใหญ่</TableBodyCell>
            <TableBodyCell>100</TableBodyCell>
            <TableBodyCell>300.00 บาท</TableBodyCell>
            <TableBodyCell>
              <Radio name="go"></Radio>
            </TableBodyCell>
          </TableBodyRow>
          <TableBodyRow class="text-center">
            <TableBodyCell>06:30</TableBodyCell>
            <TableBodyCell>กรุงเทพฯ(หมอชิต2) - หาดใหญ่</TableBodyCell>
            <TableBodyCell>100</TableBodyCell>
            <TableBodyCell>300.00 บาท</TableBodyCell>
            <TableBodyCell>
              <Radio name="go"></Radio>
            </TableBodyCell>
          </TableBodyRow>
        </TableBody>
      </Table>
    </div>
    <div class="mt-5">
      <div class="text-2xl mb-5">เที่ยวกลับ</div>
      <Table hoverable={true}>
        <TableHead
          class="bg-[#4F75FF] rounded-md py-2 text-lg text-center text-white"
        >
          <TableHeadCell>รถออก</TableHeadCell>
          <TableHeadCell>เส้นทาง</TableHeadCell>
          <TableHeadCell>ที่นั่งว่าง</TableHeadCell>
          <TableHeadCell>ราคา</TableHeadCell>
          <TableHeadCell>
            <span class="sr-only">Action</span>
          </TableHeadCell>
        </TableHead>
        <TableBody>
          <TableBodyRow class="text-center">
            <TableBodyCell>06:30</TableBodyCell>
            <TableBodyCell>กรุงเทพฯ(หมอชิต2) - หาดใหญ่</TableBodyCell>
            <TableBodyCell>100</TableBodyCell>
            <TableBodyCell>300.00 บาท</TableBodyCell>
            <TableBodyCell>
              <Radio name="back"></Radio>
            </TableBodyCell>
          </TableBodyRow>
          <TableBodyRow class="text-center">
            <TableBodyCell>06:30</TableBodyCell>
            <TableBodyCell>กรุงเทพฯ(หมอชิต2) - หาดใหญ่</TableBodyCell>
            <TableBodyCell>100</TableBodyCell>
            <TableBodyCell>300.00 บาท</TableBodyCell>
            <TableBodyCell>
              <Radio name="back"></Radio>
            </TableBodyCell>
          </TableBodyRow>
        </TableBody>
      </Table>
    </div>
    <div class="flex justify-center my-5">
      <a
        class="bg-orange-500 text-2xl text-white px-3 py-1 rounded-md hover:bg-orange-600"
        href="/seat">ดำเนินการต่อ</a
      >
    </div>
  </div>
</div>
