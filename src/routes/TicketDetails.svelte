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
      const searchParams = new URLSearchParams(window.location.search);
      ticketId = searchParams.get('id');
      ticket = tickets.find(t => t.id === ticketId);
    });
  </script>
  
  {#if ticket}
    <div class="p-6 bg-white text-gray-900 rounded-lg w-full max-w-lg mx-auto shadow-lg mt-10">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-xl font-bold text-gray-900">TICKET DETAILS</h1>
        <button class="text-gray-500 hover:text-black transition duration-200 text-2xl font-bold">✕</button>
      </div>
  
      <!-- User Info -->
      <div class="bg-gray-100 p-4 rounded-lg mb-4">
        <div class="flex items-center">
          <div class="bg-gray-300 w-12 h-12 flex items-center justify-center rounded-full mr-4">
            <span class="text-lg font-bold text-gray-700">ช</span> <!-- Placeholder for user initials -->
          </div>
          <div>
            <h2 class="text-lg font-semibold text-gray-900">{ticket.name}</h2>
            <p class="text-sm text-gray-500">เลขที่การจอง: {ticket.id}</p>
          </div>
        </div>
      </div>
  
      <!-- Event Details -->
      <div class="bg-gray-100 p-4 rounded-lg mb-4">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-base font-semibold text-gray-900">{ticket.route}</p>
            <p class="text-sm text-gray-500">📅 วันที่เดินทาง: {ticket.date}</p>
            <p class="text-sm text-gray-500">💺 เลขที่นั่ง: {ticket.seat}</p>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-gray-900">{ticket.price} บาท</p>
            <p class="text-sm text-gray-500">ราคาสุทธิ</p>
          </div>
        </div>
      </div>
  
      <!-- Status Section -->
      <div class="bg-green-500 p-3 rounded-lg mb-4 text-center">
        <p class="text-lg font-semibold text-white">สถานะการจอง: {ticket.status}</p>
      </div>
  
      <!-- Footer Button (Optional) -->
      <div class="text-center">
        <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-200">
          ดาวน์โหลดตั๋ว
        </button>
      </div>
    </div>
  {:else}
    <div class="flex justify-center items-center h-full">
      <p class="text-gray-500">Loading ticket details...</p>
    </div>
  {/if}
  