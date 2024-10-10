<script>
  import { onMount } from 'svelte';
  import QRCode from 'qrcode';

  let ticketId;
  let ticket;
  let qrCodeDataUrl = ''; // This will store the generated QR code
  let ticketContent; // Reference to the ticket section for PDF generation

  let html2pdf; // We will load this dynamically

  // Example tickets array
  const tickets = [
    { 
      id: "000001", 
      name: "ชวัล แซ่ย่าง", 
      date: "20/10/2024", 
      route: "กรุงเทพ-หัวหิน", 
      seat: "A1", 
      price: "600.00 บาท", 
      status: "จองเสร็จสิ้น"
    },
    { 
      id: "000002", 
      name: "ชวัล แซ่ย่าง", 
      date: "20/10/2024", 
      route: "กรุงเทพ-หัวหิน", 
      seat: "A2", 
      price: "600.00 บาท", 
      status: "จองเสร็จสิ้น"
    }
  ];

  onMount(async () => {
    const searchParams = new URLSearchParams(window.location.search);
    ticketId = searchParams.get('id');
    ticket = tickets.find(t => t.id === ticketId);

    // Dynamically import html2pdf when in browser context
    if (typeof window !== 'undefined') {
      html2pdf = await import('html2pdf.js');
    }

    // Generate QR code for the specific ticket
    if (ticket) {
      generateQRCode(`Ticket ID: ${ticket.id}, Name: ${ticket.name}`);
    }
  });

  // Function to generate the QR code
  function generateQRCode(data) {
    QRCode.toDataURL(data, { width: 200, margin: 1 }, (err, url) => {
      if (!err) {
        qrCodeDataUrl = url; // Set the QR code data URL to display
      }
    });
  }

  // Function to generate the PDF and trigger download
  async function downloadTicket() {
    const opt = {
      margin:       0.5,
      filename:     `${ticket.id}-ticket.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    if (html2pdf) {
      html2pdf.default().from(ticketContent).set(opt).save(); // Generate and download the PDF
    }
  }

  // Function to trigger the print dialog
  function printTicket() {
    window.print(); // This will open the print dialog
  }
</script>

{#if ticket}
  <div bind:this={ticketContent} class="p-6 bg-white text-gray-900 rounded-lg w-full max-w-lg mx-auto shadow-md mt-10 border border-gray-300 lg:my-10 lg:px-20">
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-gray-900">Bus Ticket</h1>
      <div class="text-gray-500 flex items-center gap-2">
        <span class="text-sm font-semibold">Ticket No.</span>
        <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-md">{ticket.id}</span>
      </div>
    </div>

    <!-- Route Info -->
    <div class="bg-gray-50 p-4 rounded-lg mb-4 shadow-inner">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-lg font-semibold text-gray-900">From: กรุงเทพ</p>
          <p class="text-lg font-semibold text-gray-900">To: หัวหิน</p>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-gray-900">{ticket.price} บาท</p>
          <p class="text-sm text-gray-500">Total Price</p>
        </div>
      </div>
    </div>

    <!-- Trip Details -->
    <div class="bg-gray-50 p-4 rounded-lg mb-4 shadow-inner">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-sm text-gray-500">Date of Travel</p>
          <p class="text-lg font-semibold text-gray-900">📅 {ticket.date}</p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Seat No.</p>
          <p class="text-lg font-semibold text-gray-900">💺 {ticket.seat}</p>
        </div>
      </div>
    </div>

    <!-- Status Section -->
    <div class="bg-green-500 p-3 rounded-lg mb-4 text-center shadow-sm">
      <p class="text-lg font-semibold text-white">Status: {ticket.status}</p>
    </div>

    <!-- QR Code Section -->
    <div class="text-center mb-6">
      <p class="text-sm text-gray-500 mb-2">Scan QR code at boarding</p>
      <img src={qrCodeDataUrl} alt="QR Code" class="w-32 h-32 mx-auto"/>
    </div>

    <!-- Footer Buttons -->
    <div class="text-center space-y-3">
      <!-- Download Button -->
      <button on:click={downloadTicket} class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-200">
        Download Ticket
      </button>
      <!-- Print Ticket Button -->
      <button on:click={printTicket} class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition duration-200">
        Print Ticket
      </button>
    </div>
  </div>
{:else}
  <div class="flex justify-center items-center h-full">
    <p class="text-gray-500">Loading ticket details...</p>
  </div>
{/if}
