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
        generateQRCode(
          `Ticket ID: ${ticket.BookingCode}, Name: ${ticket.Fname} ${ticket.Lname}`
        );
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
    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
      <html>
      <head>
        <title>Print Ticket</title>
        <style>
          @media print {
            body, html {
              margin: 0;
              padding: 0;
              width: 100%;
              height: 100%;
              overflow: hidden;
            }
            .ticket-container {
              page-break-inside: avoid;
              page-break-after: avoid;
              break-inside: avoid;
            }
          }
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f3f4f6;
          }
          .ticket-container {
            background-color: #fff;
            border: 2px solid #ddd;
            padding: 20px;
            border-radius: 15px;
            max-width: 700px;
            margin: 50px auto;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
          }
          .ticket-header {
            background-color: #0069d9;
            color: white;
            padding: 15px;
            text-align: center;
            font-size: 28px;
            font-weight: bold;
            border-radius: 12px 12px 0 0;
            letter-spacing: 1.5px;
          }
          .ticket-details {
            margin-top: 20px;
            padding: 20px;
            font-size: 16px;
            line-height: 1.8;
            background-color: #f9fafb;
            border-radius: 10px;
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.03);
          }
          .ticket-details p {
            margin: 5px 0;
            font-size: 16px;
            color: #333;
          }
          .ticket-details .section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
            border-bottom: 1px solid #ececec;
            padding-bottom: 15px;
          }
          .ticket-details strong {
            display: inline-block;
            width: 120px;
            color: #0069d9;
          }
          .ticket-info {
            padding: 20px;
            border-radius: 10px;
            background-color: #f1f6fb;
            margin-bottom: 20px;
            border-left: 5px solid #0069d9;
          }
          .qr-code {
            text-align: center;
            margin: 30px 0;
          }
          .qr-code img {
            border: 3px solid #0069d9;
            border-radius: 12px;
            width: 150px;
            height: 150px;
          }
          .ticket-footer {
            text-align: center;
            font-size: 12px;
            color: #888;
            margin-top: 15px;
          }
          .barcode {
            width: 100%;
            height: 50px;
            background: repeating-linear-gradient(90deg, #000 0, #000 20%, transparent 20%, transparent 40%);
            background-size: 4px 100%;
            border-radius: 10px;
            margin-top: 30px;
          }
          .ticket-logo {
            width: 80px;
            margin: 0 auto;
            display: block;
            margin-bottom: 20px;
          }
        </style>
      </head>
      <body>
        <div class="ticket-container">
          <!-- Logo Section (Optional) -->
          <img src="https://via.placeholder.com/80x80?text=Logo" alt="Company Logo" class="ticket-logo">
          <div class="ticket-header">
            Bus Ticket
          </div>
          <div class="ticket-details">
            <div class="section">
              <p><strong>Ticket No.:</strong> ${ticket.BookingCode}</p>
              <p><strong>Status:</strong> ${ticket.Status}</p>
            </div>
            <div class="ticket-info">
              <div class="section">
                <p><strong>From:</strong> กรุงเทพ</p>
                <p><strong>To:</strong> หัวหิน</p>
              </div>
              <div class="section">
                <p><strong>Date of Travel:</strong> ${ticket.DepartureTime}</p>
                <p><strong>Seat No.:</strong> ${ticket.SeatCode}</p>
              </div>
              <div class="section">
                <p><strong>Price:</strong> ${ticket.Price} บาท</p>
              </div>
            </div>
            <div class="qr-code">
              <p><strong>Scan QR Code for boarding:</strong></p>
              <img src="${qrCodeDataUrl}" alt="QR Code">
            </div>
            <div class="barcode"></div>
          </div>
          <div class="ticket-footer">
            <p>Thank you for choosing our service. Have a safe journey!</p>
          </div>
        </div>
      </body>
    </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
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
        Status: {ticket.Status}
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
