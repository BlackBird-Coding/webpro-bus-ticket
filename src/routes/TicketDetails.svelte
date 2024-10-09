<script>
    import { onMount } from 'svelte';
  
    let ticketId;
    let ticket;
  
    // Example tickets array
    const tickets = [
      { id: "000001", name: "ชวัล แซ่ย่าง", date: "20/10/2024", route: "กรุงเทพ-หัวหิน", seat: "A1", price: "600.00 บาท", status: "จองเสร็จสิ้น" },
      { id: "000002", name: "ชวัล แซ่ย่าง", date: "20/10/2024", route: "กรุงเทพ-หัวหิน", seat: "A2", price: "600.00 บาท", status: "จองเสร็จสิ้น" }
    ];
  
    onMount(() => {
      // Get the query parameter from the URL
      const searchParams = new URLSearchParams(window.location.search);
      ticketId = searchParams.get('id');
  
      // Find the ticket by its ID
      ticket = tickets.find(t => t.id === ticketId);
    });
  </script>
  
  {#if ticket}
    <div class="p-6 bg-black text-white rounded-lg w-full max-w-sm mx-auto">
      <h1 class="text-lg font-bold">TICKET DETAILS</h1>
      <p>เลขที่การจอง: {ticket.id}</p>
      <p>ชื่อผู้โดยสาร: {ticket.name}</p>
      <p>วันที่เดินทาง: {ticket.date}</p>
      <p>ต้นทาง-ปลายทาง: {ticket.route}</p>
      <p>เลขที่นั่ง: {ticket.seat}</p>
      <p>ราคาสุทธิ: {ticket.price}</p>
      <p>สถานะการจอง: {ticket.status}</p>
    </div>
  {:else}
    <p>Loading ticket details...</p>
  {/if}
  