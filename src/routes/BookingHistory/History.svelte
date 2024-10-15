<script>
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from "flowbite-svelte";

  // Dummy bookings data

  let bookings = [];

  let statusToText = {
    0: "ยังไม่ใช้งาน",
    1: "ใช้งานแล้ว",
  };

  fetch(`/api/historyCus`, {
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
      console.log("fetch", data);
      bookings = data.histories;
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });

  // Navigation functions
  function goToReschedule(bookingId) {
    window.location.href = `/reschedule?id=${bookingId}`;
  }

  function goToTicketDetails(bookingId) {
    window.location.href = `/ticket-details?id=${bookingId}`;
  }
</script>

<div class="m-10">
  <div class="flex flex-wrap items-center gap-5 w-full mb-8">
    <h1 class="flex text-2xl row-span-3"><b>ตรวจสอบประวัติการจอง</b></h1>
  </div>
  <Table hoverable={true}>
    <TableHead class="bg-slate-200 rounded-md py-2 text-base text-center">
      <TableHeadCell>เลขที่การจอง</TableHeadCell>
      <TableHeadCell>ผู้โดยสาร</TableHeadCell>
      <TableHeadCell>เบอร์โทรศัพท์</TableHeadCell>
      <TableHeadCell>วันที่เดินทาง</TableHeadCell>
      <TableHeadCell>เที่ยวรถ</TableHeadCell>
      <TableHeadCell>เลขที่นั่ง</TableHeadCell>
      <TableHeadCell>ราคาสุทธิ</TableHeadCell>
      <TableHeadCell>สถานะตั๋ว</TableHeadCell>
      <TableHeadCell>Action</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each bookings as booking}
        <TableBodyRow class="text-center">
          <TableBodyCell>{booking.BookingCode}</TableBodyCell>
          <TableBodyCell
            >{booking.Fname} {booking.Lname} ({booking.Gender})</TableBodyCell
          >
          <TableBodyCell>{booking.Phone}</TableBodyCell>
          <TableBodyCell>{booking.DepartureTime}</TableBodyCell>
          <TableBodyCell>{booking.ScheduleName} ({booking.Type})</TableBodyCell>
          <TableBodyCell>{booking.SeatCode}</TableBodyCell>
          <TableBodyCell>{booking.Price}</TableBodyCell>
          <TableBodyCell>{statusToText[booking.Status]}</TableBodyCell>
          <TableBodyCell class="flex gap-5">
            <a
              class="text-orange-400 hover:underline"
              href={`/reschedule?code=` +
                booking.BookingCode +
                "&id=" +
                booking.BookingID +
                "&route=" +
                booking.RouteID}>เลื่อนตั๋ว</a
            >
            <a
              class="text-green-500 hover:underline"
              href={`/ticket-details?id=` + booking.BookingID}>แสดงตั๋ว</a
            >
          </TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
</div>
