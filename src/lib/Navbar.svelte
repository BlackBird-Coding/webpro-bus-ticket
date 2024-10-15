<script>
  import UserAuthCheck from "@/lib/components/UserAuthCheck.svelte";
  import { userStore } from "@/lib/stores/userStore.svelte";
  import { navigate } from "svelte-routing";
  import Swal from "sweetalert2";
  import logo from "@/assets/logo_boss.png";
  let isMenuOpen = false;

  // Toggle the menu visibility
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  async function handleLogout() {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        userStore.clearUser();
        navigate("/", { replace: true });
        Swal.fire({
          icon: "success",
          title: "ออกจากระบบสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      Swal.fire({
        icon: "error",
        title: "ออกจากระบบไม่สำเร็จ",
        text: "กรุณาลองใหม่อีกครั้ง",
      });
    }
  }
</script>

<header
  class="flex shadow-md py-4 px-4 sm:px-10font-[sans-serif] min-h-[80px] tracking-wide z-50 bg-[#6439FF]"
>
  <div class="flex flex-wrap items-center gap-5 w-full">
    <div class="ml-3 flex items-center space-x-4 rtl:space-x-reverse">
      <img src={logo} class="h-12 w-12" alt="Boss Logo" />
      <span
        class="text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >BusBuss</span
      >
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
        <UserAuthCheck requiredUserType="customer">
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
        <UserAuthCheck requiredUserType="employee">
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
          <li class="max-lg:border-b max-lg:py-3 px-3">
            <a
              href="/scan"
              class="hover:text-[#F5F5F5] text-[#333] font-semibold block text-[15px]"
              >สแกนตั๋ว</a
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
    <UserAuthCheck showWhenLoggedIn={false}>
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
    <UserAuthCheck showWhenLoggedIn={true}>
      <button
        class="px-4 py-2 text-[15px] rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF]"
        on:click={() => handleLogout()}>ออกจากระบบ</button
      >
    </UserAuthCheck>
  </div>

  <!-- Hamburger button for mobile -->
  <button class="lg:hidden focus:outline-none" on:click={toggleMenu}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-6 h-6 text-white"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16m-7 6h7"
      />
    </svg>
  </button>

  <!-- Mobile menu -->
  <nav
    class={`lg:hidden absolute top-16 left-0 w-full bg-[#6439FF] p-6 shadow-md ${isMenuOpen ? "block" : "hidden"}`}
  >
    <ul class="space-y-4">
      <li>
        <a href="/" class="text-white text-lg font-semibold">หน้าแรก</a>
      </li>
      <li>
        <a href="/contact" class="text-white text-base">ติดต่อเรา</a>
      </li>
      <li>
        <a href="/register" class="text-white text-base">ลงทะเบียน</a>
      </li>
      <li>
        <a href="/login" class="text-white text-base">เข้าสู่ระบบ</a>
      </li>
    </ul>
  </nav>

  <!-- Desktop menu -->
  <nav class="hidden lg:flex space-x-6">
    <ul class="flex items-center space-x-8">
      <li>
        <a href="/" class="text-white text-base font-semibold hover:underline"
          >หน้าแรก</a
        >
      </li>
      <li>
        <a
          href="/contact"
          class="text-white text-base font-semibold hover:underline"
          >ติดต่อเรา</a
        >
      </li>
      <UserAuthCheck showWhenLoggedIn={false}>
        <li>
          <a
            href="/register"
            class="px-4 py-2 text-base rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF]"
            >ลงทะเบียน</a
          >
        </li>
        <li>
          <a
            href="/login"
            class="px-4 py-2 text-base rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF]"
            >เข้าสู่ระบบ</a
          >
        </li>
      </UserAuthCheck>
      <UserAuthCheck showWhenLoggedIn={true}>
        <li>
          <button
            class="px-4 py-2 text-lg rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF]"
            on:click={handleLogout}>ออกจากระบบ</button
          >
        </li>
      </UserAuthCheck>
    </ul>
  </nav>
</header>
