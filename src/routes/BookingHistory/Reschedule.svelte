<script>
  let ticketId = "000001"; // Assuming you get the ticket ID dynamically
</script>

<div class="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-100">
  <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full border border-gray-200 lg:p-10">
    <!-- Title -->
    <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">เลื่อนตั๋ว</h1>

    <!-- Additional Info or Instructions -->
    <p class="text-center text-gray-600 mb-6">
      หากคุณต้องการเลื่อนวันเดินทาง โปรดเลือกวันที่ใหม่ด้านล่างและกด "ยืนยันการเลื่อนตั๋ว"
    </p>

    <!-- Ticket Info -->
    <div class="text-center mb-6">
      <p class="text-lg text-gray-600">หมายเลขตั๋วที่ต้องการเลื่อน:</p>
      <p class="text-xl font-semibold text-gray-800 mt-1">{ticketId}</p>
    </div>

    <!-- Date Picker -->
    <div class="mb-6">
      <label for="newDate" class="block text-lg font-medium text-gray-700 mb-2">เลือกวันที่เดินทางใหม่:</label>
      <div class="relative">
        <input 
          type="date" 
          id="newDate" 
          class="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700" 
        />
        <span class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m0 0a5 5 0 00-5 5v13a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5h-4M8 7h8" />
          </svg>
        </span>
      </div>
    </div>

    <!-- Confirmation Button -->
    <div class="text-center">
      <button 
        type="button" 
        class="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300"
      >
        ยืนยันการเลื่อนตั๋ว
      </button>
    </div>
  </div>
</div>
