<script lang="ts">
  import UserAuthCheck from "@/lib/components/UserAuthCheck.svelte";
  import { userStore } from "@/lib/stores/userStore.svelte";
  import { navigate } from "svelte-routing";
  import Swal from "sweetalert2";
  import logo from "@/assets/logo_pim2.png";
  import { onMount } from "svelte";

  let isMenuOpen = false;

  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }

  onMount(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        isMenuOpen = true;
      } else {
        isMenuOpen = false;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

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
  class="flex shadow-md py-4 px-4 sm:px-10 font-[sans-serif] min-h-[80px] tracking-wide z-50 bg-[#6439FF]"
>
  <div class="flex flex-wrap items-center justify-between w-full">
    <div class="flex items-center space-x-4 rtl:space-x-reverse">
      <img src={logo} class="h-12" alt="Pim Logo" />
      <span
        class="text-white self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
        >BusXThailand</span
      >
    </div>

    <button
      on:click={toggleMenu}
      class="lg:hidden text-white focus:outline-none"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      </svg>
    </button>

    <div
      class="{isMenuOpen
        ? 'block'
        : 'hidden'} lg:flex lg:items-center lg:w-auto w-full"
      id="menu"
    >
      <ul
        class="lg:flex lg:justify-between items-center lg:space-x-8 space-y-2 lg:space-y-0 mt-4 lg:mt-0"
      >
        <li>
          <a
            href="/"
            class="text-white hover:text-[#F5F5F5] font-semibold block text-[15px] py-2 lg:py-0"
            >หน้าแรก</a
          >
        </li>
        <UserAuthCheck requiredUserType="customer">
          <li>
            <a
              href="/booking/find"
              class="text-white hover:text-[#F5F5F5] font-semibold block text-[15px] py-2 lg:py-0"
              >จองตั๋ว</a
            >
          </li>
          <li>
            <a
              href="/history"
              class="text-white hover:text-[#F5F5F5] font-semibold block text-[15px] py-2 lg:py-0"
              >ตรวจสอบประวัติการจอง</a
            >
          </li>
        </UserAuthCheck>
        <UserAuthCheck requiredUserType="employee">
          <li>
            <a
              href="/ManageBus_Emp"
              class="text-white hover:text-[#F5F5F5] font-semibold block text-[15px] py-2 lg:py-0"
              >จัดการเที่ยวรถ</a
            >
          </li>
          <li>
            <a
              href="/History_Emp"
              class="text-white hover:text-[#F5F5F5] font-semibold block text-[15px] py-2 lg:py-0"
              >ตรวจสอบประวัติการจอง</a
            >
          </li>
          <li>
            <a
              href="/Scan"
              class="text-white hover:text-[#F5F5F5] font-semibold block text-[15px] py-2 lg:py-0"
              >สแกนตั๋วเดินทาง</a
            >
          </li>
        </UserAuthCheck>
        <li>
          <a
            href="/contact"
            class="text-white hover:text-[#F5F5F5] font-semibold block text-[15px] py-2 lg:py-0"
          >
            ติดต่อเรา
          </a>
        </li>
        <UserAuthCheck showWhenLoggedIn={false}>
          <li>
            <a href="/register"
              ><button
                class="w-full px-4 py-2 text-[15px] rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF] my-2"
                >ลงทะเบียน</button
              ></a
            >
          </li>
          <li>
            <a href="/login"
              ><button
                class="w-full px-4 py-2 text-[15px] rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF] my-2"
                >เข้าสู่ระบบ</button
              ></a
            >
          </li>
        </UserAuthCheck>
        <UserAuthCheck showWhenLoggedIn={true}>
          <li>
            <button
              class="w-full px-4 py-2 text-[15px] rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF] my-2"
              on:click={() => handleLogout()}>ออกจากระบบ</button
            >
          </li>
        </UserAuthCheck>
      </ul>
    </div>
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
