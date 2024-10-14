<script lang="ts">
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

<header class="flex justify-between items-center bg-[#6439FF] p-4 shadow-md z-50">
  <div class="flex items-center gap-4">
    <img src="{logo}" class="h-12 w-12" alt="Boss Logo" />
    <span class="text-white text-xl font-semibold">BusBuss</span>
  </div>

  <!-- Hamburger button for mobile -->
  <button class="lg:hidden focus:outline-none" on:click={toggleMenu}>
    <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
    </svg>
  </button>

  <!-- Mobile menu -->
  <nav class={`lg:hidden absolute top-16 left-0 w-full bg-[#6439FF] p-6 shadow-md ${isMenuOpen ? 'block' : 'hidden'}`}>
    <ul class="space-y-4">
      <li>
        <a href="/" class="text-white text-lg font-semibold">หน้าแรก</a>
      </li>
      <li>
        <a href="/contact" class="text-white text-lg font-semibold">ติดต่อเรา</a>
      </li>
      <li>
        <a href="/register" class="text-white text-lg font-semibold">ลงทะเบียน</a>
      </li>
      <li>
        <a href="/login" class="text-white text-lg font-semibold">เข้าสู่ระบบ</a>
      </li>
    </ul>
  </nav>

  <!-- Desktop menu -->
  <nav class="hidden lg:flex space-x-6">
    <ul class="flex items-center space-x-4">
      <li>
        <a href="/" class="text-white font-semibold hover:underline">หน้าแรก</a>
      </li>
      <li>
        <a href="/contact" class="text-white font-semibold hover:underline">ติดต่อเรา</a>
      </li>
      <UserAuthCheck showWhenLoggedIn={false}>
        <li>
          <a href="/register" class="px-4 py-2 text-[15px] rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF]">ลงทะเบียน</a>
        </li>
        <li>
          <a href="/login" class="px-4 py-2 text-[15px] rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF]">เข้าสู่ระบบ</a>
        </li>
      </UserAuthCheck>
      <UserAuthCheck showWhenLoggedIn={true}>
        <li>
          <button class="px-4 py-2 text-[15px] rounded font-semibold text-[#6439FF] border-2 border-[#6439FF] hover:bg-slate-200 transition-all ease-in-out duration-300 bg-[#FFFFFF]" on:click={handleLogout}>ออกจากระบบ</button>
        </li>
      </UserAuthCheck>
    </ul>
  </nav>
</header>

