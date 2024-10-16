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
  let statusToText = {
    0: "ยังไม่ใช้งาน",
    1: "ใช้งานแล้ว",
  };

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
      console.error("There was a problem with the fetch operation:", error);
    });
</script>

<div class="m-10">
  <div class="flex flex-wrap items-center gap-5 w-full mb-8">
    <h1 class="flex text-2xl row-span-3"><b>ตรวจสอบประวัติการจอง</b></h1>
  </div>

  <Table hoverable={true}>
    <TableHead class="bg-slate-200 rounded-md py-2 text-base text-center">
      <TableHeadCell>เลขที่การจอง</TableHeadCell>
      <TableHeadCell>ผู้โดยสาร</TableHeadCell>
      <TableHeadCell>เที่ยวรถ</TableHeadCell>
      <TableHeadCell>เวลาออกเดินทาง - ถึงปลายทาง</TableHeadCell>
      <TableHeadCell>เลขที่นั่ง</TableHeadCell>
      <TableHeadCell>สถานะตั๋ว</TableHeadCell>
      <TableHeadCell>Action</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each history as data}
        <TableBodyRow class="text-center">
          <TableBodyCell>{data.BookingCode}</TableBodyCell>
          <TableBodyCell
            >{data.CustomerName}{data.Gender
              ? ` (${data.Gender})`
              : ""}</TableBodyCell
          >
          <TableBodyCell
            >{data.ScheduleCode}: {data.ScheduleName} ({data.Type})</TableBodyCell
          >
          <TableBodyCell
            >({data.DepartureTime.slice(2, -3)}) - ({data.ArrivalTime.slice(
              2,
              -3
            )})</TableBodyCell
          >
          <TableBodyCell>{data.SeatCode}</TableBodyCell>
          <TableBodyCell>{statusToText[data.Status]}</TableBodyCell>
          <TableBodyCell class="flex gap-5">
            <a
              class="text-orange-400 hover:underline"
              href={`/reschedule?code=` +
                data.BookingCode +
                "&id=" +
                data.BookingID +
                "&route=" +
                data.RouteID}>เลื่อนตั๋ว</a
            >
            <a
              class="text-green-500 hover:underline"
              href={`/ticket-details?id=` + data.BookingID}>แสดงตั๋ว</a
            >
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>
