<script>
  import { onMount } from "svelte";
  import QRCode from "qrcode";

  let ticketId;
  let ticket;
  let qrCodeDataUrl = "";
  let ticketContent;
  let loading = true;
  let error = null;

  let html2pdf;
  let statusToText = {
    0: "ยังไม่ใช้งาน",
    1: "ใช้งานแล้ว",
  };

  onMount(async () => {
    const searchParams = new URLSearchParams(window.location.search);
    ticketId = searchParams.get("id");

    if (typeof window !== "undefined") {
      html2pdf = await import("html2pdf.js");
    }

    if (ticketId) {
      try {
        const response = await fetch(`/api/booking/${ticketId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch ticket data");
        }
        ticket = (await response.json()).bookings;
        console.log("Ticket data:", ticket);
        generateQRCode(ticket.BookingCode);
      } catch (err) {
        error = err.message;
      } finally {
        loading = false;
      }
    } else {
      error = "No ticket ID provided";
      loading = false;
    }
  });

  function generateQRCode(data) {
    QRCode.toDataURL(data, { width: 200, margin: 1 }, (err, url) => {
      if (!err) {
        qrCodeDataUrl = url;
      }
    });
  }

  async function downloadTicket() {
    const opt = {
      margin: 0.5,
      filename: `${ticket.id}-ticket.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    if (html2pdf) {
      html2pdf.default().from(ticketContent).set(opt).save();
    }
  }

  function printTicket() {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Ticket</title>
        <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .ticket { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; }
        .ticket h1 { font-size: 24px; }
        .ticket p { font-size: 18px; }
        .ticket img { display: block; margin: 20px auto; }
        button { display: none; }
        </style>
      </head>
      <body>
        <div class="ticket">
        ${ticketContent.innerHTML}
        </div>
      </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
</script>

{#if loading}
  <div class="flex justify-center items-center h-full">
    <p class="text-gray-500">Loading ticket details...</p>
  </div>
{:else if error}
  <div class="flex justify-center items-center h-full">
    <p class="text-red-500">{error}</p>
  </div>
{:else if ticket}
  <div
    bind:this={ticketContent}
    class="p-6 bg-white text-gray-900 rounded-lg w-full max-w-lg mx-auto shadow-md mt-10 border border-gray-300 lg:my-10 lg:px-20"
  >
    <!-- Header -->
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold text-gray-900">Bus Ticket</h1>
      <div class="text-gray-500 flex items-center gap-2">
        <span class="text-sm font-semibold">Ticket No.</span>
        <span class="bg-gray-200 text-gray-800 px-3 py-1 rounded-md"
          >{ticket.BookingCode}</span
        >
      </div>
    </div>

    <!-- Route Info -->
    <div class="bg-gray-50 p-4 rounded-lg mb-4 shadow-inner">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-lg font-semibold text-gray-900">
            🚌 {ticket.RouteName}
          </p>
        </div>
        <div class="text-right">
          <p class="text-2xl font-bold text-gray-900">
            {ticket.Price}
          </p>
          <p class="text-sm text-gray-500">Total Price</p>
        </div>
      </div>
    </div>

    <!-- Trip Details -->
    <div class="bg-gray-50 p-4 rounded-lg mb-4 shadow-inner">
      <div class="flex justify-between items-center">
        <div>
          <p class="text-sm text-gray-500">Date of Travel</p>
          <p class="text-lg font-semibold text-gray-900">
            📅 {ticket.DepartureTime}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-500">Seat No.</p>
          <p class="text-lg font-semibold text-gray-900">
            💺 {ticket.SeatCode}
          </p>
        </div>
      </div>
    </div>

    <!-- Status Section -->
    <div class="bg-green-500 p-3 rounded-lg mb-4 text-center shadow-sm">
      <p class="text-lg font-semibold text-white">
        Status: {statusToText[ticket.Status]}
      </p>
    </div>

    <!-- QR Code Section -->
    <div class="text-center mb-6">
      <p class="text-sm text-gray-500 mb-2">Scan QR code at boarding</p>
      <img src={qrCodeDataUrl} alt="QR Code" class="w-32 h-32 mx-auto" />
    </div>

    <!-- Footer Buttons -->
    <div class="text-center space-y-3">
      <button
        on:click={downloadTicket}
        class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full transition duration-200"
      >
        Download Ticket
      </button>
      <button
        on:click={printTicket}
        class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition duration-200"
      >
        Print Ticket
      </button>
    </div>
  </div>
{/if}
