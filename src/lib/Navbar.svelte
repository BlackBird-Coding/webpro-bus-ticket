<script lang="ts">
  import UserAuthCheck from "@/lib/components/UserAuthCheck.svelte";
  import { userStore } from "@/lib/stores/userStore.svelte";
  import logo from "@/assets/logo.webp";
</script>

<header
  class="flex shadow-md py-4 px-4 sm:px-10font-[sans-serif] min-h-[80px] tracking-wide z-50 bg-[#6439FF]"
>
  <div class="flex flex-wrap items-center gap-5 w-full">
    <div>
      <p class="text-xl text-white">พิมพ์มาดาทัวร์</p>
    </div>

    <div
      id="collapseMenu"
      class="max-lg:hidden lg:!flex lg:ml-auto max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
    >
      <button
        id="toggleClose"
        class="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 fill-black"
          viewBox="0 0 320.591 320.591"
        >
          <path
            d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
            data-original="#000000"
          ></path>
          <path
            d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
            data-original="#000000"
          ></path>
        </svg>
      </button>

      <ul
        class="lg:flex gap-4 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50"
      >
        <li class="mb-6 hidden max-lg:block">
          <a href="/"
            ><img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              class="w-40"
            />
          </a>
        </li>
        <li class="max-lg:border-b max-lg:py-3 px-3">
          <a
            href="/"
            class="hover:text-[#F5F5F5] text-[#007bff] font-semibold block text-[15px]"
            >หน้าแรก</a
          >
        </li>
        <UserAuthCheck role="customer">
          <li class="max-lg:border-b max-lg:py-3 px-3">
            <a
              href="/booking/find"
              class="hover:text-[#F5F5F5] text-[#333] font-semibold block text-[15px]"
              >จองตั๋ว</a
            >
          </li>
          <li class="max-lg:border-b max-lg:py-3 px-3">
            <a
              href="/history"
              class="hover:text-[#F5F5F5] text-[#333] font-semibold block text-[15px]"
              >ตรวจสอบประวัติการจอง</a
            >
          </li>
        </UserAuthCheck>
        <UserAuthCheck role="employee">
          <li class="max-lg:border-b max-lg:py-3 px-3">
            <a
              href="/ManageBus_Emp"
              class="hover:text-[#F5F5F5] text-[#333] font-semibold block text-[15px]"
              >จัดการเที่ยวรถ (พนักงาน)</a
            >
          </li>
          <li class="max-lg:border-b max-lg:py-3 px-3">
            <a
              href="/History_Emp"
              class="hover:text-[#F5F5F5] text-[#333] font-semibold block text-[15px]"
              >ตรวจสอบประวัติการจอง (พนักงาน)</a
            >
          </li>
        </UserAuthCheck>
        <li class="max-lg:border-b max-lg:py-3 px-3">
          <a
            href="/contact"
            class="hover:text-[#F5F5F5] text-[#333] font-semibold block text-[15px]"
          >
            ติดต่อเรา
          </a>
        </li>
      </ul>
    </div>
    <UserAuthCheck isShow={false}>
      <div class="flex items-center max-lg:ml-auto space-x-6">
        <a href="/register"
          ><button
            class="px-4 py-2 text-[15px] rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF]"
            >ลงทะเบียน</button
          ></a
        >
        <a href="/login"
          ><button
            class="px-4 py-2 text-[15px] rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF]"
            >เข้าสู่ระบบ</button
          ></a
        >
      </div>
    </UserAuthCheck>
    <UserAuthCheck isShow={true}>
      <button
        class="px-4 py-2 text-[15px] rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF]"
        on:click={() => userStore.logout()}>ออกจากระบบ</button
      >
    </UserAuthCheck>
  </div>
</header>

<style>
  a {
    color: white;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
