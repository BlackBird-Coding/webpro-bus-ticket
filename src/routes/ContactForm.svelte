<script>
  let name = "";
  let email = "";
  let phone = "";
  let message = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to a server)
    console.log({ name, email, phone, message });
    // You could also implement further logic here, like sending data to an API
  };
</script>

<div class="container mx-auto p-6">
  <h1 class="text-4xl font-bold mb-6 text-center text-indigo-700">ติดต่อเรา</h1>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <!-- Left Section -->
    <div
      class="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
    >
      <p class="mb-4 text-gray-600">
        ท่านสามารถส่งข้อความถึงเราโดยใช้แบบฟอร์มส่งข้อความถึงเราหรือติดต่อช่องทางอื่นๆ
        ได้ดังนี้
      </p>
      <h2 class="text-xl font-semibold mb-2 text-indigo-600">บริการออนไลน์</h2>
      <p class="text-gray-700">
        จองตั๋วโดยสาร ลงทะเบียนสมาชิก ปัญหาในการใช้งานเว็บไซต์
      </p>
      <p class="mt-4 text-gray-700">
        ติดต่ออีเมล: <a
          href="mailto:info@busticket.in.th"
          class="text-indigo-600 hover:underline">info@busticket.in.th</a
        >
      </p>
      <h2 class="text-xl font-semibold mt-4 text-indigo-600">
        ศูนย์บริการลูกค้า
      </h2>
      <p class="text-gray-700">
        ศูนย์บริการทางโทรศัพท์สำหรับปัญหาในการใช้บริการ
      </p>
      <p class="text-gray-700">
        โทรศัพท์: <span class="font-bold">0-2269-6999</span>
      </p>
      <div class="flex space-x-2 mt-4">
        <a
          href="https://www.facebook.com/borkorsor"
          target="_blank"
          class="text-indigo-600 hover:underline">Facebook</a
        >
        <span>|</span>
        <span>Line ID: <span class="font-bold">@busxthailand</span></span>
      </div>
    </div>

    <!-- Right Section (Form) -->
    <form on:submit={handleSubmit} class="bg-white p-6 rounded-lg shadow-lg">
      <h2 class="text-xl font-semibold mb-4 text-indigo-600">
        ส่งข้อความถึงเรา
      </h2>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-1" for="name"
          >ชื่อ-นามสกุล*</label
        >
        <input
          type="text"
          id="name"
          bind:value={name}
          required
          class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          placeholder="ชื่อ-นามสกุล"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-1" for="email"
          >อีเมล*</label
        >
        <input
          type="email"
          id="email"
          bind:value={email}
          required
          class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          placeholder="อีเมล"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-1" for="phone"
          >โทรศัพท์*</label
        >
        <input
          type="tel"
          id="phone"
          bind:value={phone}
          required
          class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          placeholder="โทรศัพท์"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-1" for="message"
          >รายละเอียด*</label
        >
        <textarea
          id="message"
          bind:value={message}
          required
          class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          placeholder="รายละเอียด"
        ></textarea>
      </div>
      <button
        type="submit"
        class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300 ease-in-out"
      >
        ส่งข้อความ
      </button>
    </form>
  </div>
</div>

<style>
  /* Custom styles for better responsiveness */
  @media (max-width: 640px) {
    .container {
      padding: 1rem;
    }
    h1 {
      font-size: 2rem; /* Smaller title for mobile */
    }
  }
</style>