<script>
  let ticketId = "000001"; // Assuming you get the ticket ID dynamically
</script>

<div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50">
  <div class="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full border border-gray-200 lg:p-12">
    <!-- Title -->
    <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-8">เลื่อนตั๋วเดินทาง</h1>

    <!-- Additional Info or Instructions -->
    <p class="text-center text-gray-500 text-lg mb-8 leading-relaxed">
      หากคุณต้องการเลื่อนวันเดินทาง โปรดเลือกวันที่ใหม่ด้านล่างและกดปุ่ม 
      <span class="font-semibold text-blue-600">"ยืนยันการเลื่อนตั๋ว"</span>.
    </p>

    <!-- Ticket Info -->
    <div class="bg-gray-100 p-4 rounded-md mb-8">
      <p class="text-center text-lg text-gray-700 mb-1">หมายเลขตั๋วที่ต้องการเลื่อน</p>
      <p class="text-center text-2xl font-semibold text-gray-800">{ticketId}</p>
    </div>

    <!-- Date Picker -->
    <div class="mb-10">
      <label for="newDate" class="block text-lg font-medium text-gray-700 mb-2">เลือกวันที่เดินทางใหม่:</label>
      <div class="relative">
        <input 
          type="date" 
          id="newDate" 
          class="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700" 
        />
      </div>
    </div>

    <!-- Divider -->
    <hr class="my-6 border-gray-300"/>

    <!-- Confirmation Button -->
    <div class="text-center">
      <button 
        type="button" 
        class="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300"
      >
        ยืนยันการเลื่อนตั๋ว
      </button>
    </div>
  </div>
</div>
