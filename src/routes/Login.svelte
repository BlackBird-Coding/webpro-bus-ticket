<script lang="ts">
  import Swal from "sweetalert2";
  import { navigate } from "svelte-routing";
  import { userStore } from "@/lib/stores/userStore.svelte";
  let show_password = false;
  let value = "";
  $: type = show_password ? "text" : "password";

  let email = "";
  let password = "";

  function handelSubmit(event: Event) {
    event.preventDefault();
    console.log({ email, password });

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        return res.json().then((data) => ({ status: res.status, data }));
      })
      .then(({ status, data }) => {
        console.log({ status, data });
        if (status === 200) {
          // Update the userStore with the new login state
          userStore.setUser({
            userType: data.user.userType,
            role: data.user.details.role, // Make sure your API returns the role
            // Add any other user data you want to store
          });

          navigate("/", { replace: true });
          Swal.fire({
            icon: "success",
            title: "เข้าสู่ระบบสำเร็จ",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เข้าสู่ระบบไม่สำเร็จ",
            text: data.message,
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        });
      });
  }
</script>

<div class="bg-gray-50 font-[sans-serif]">
  <div class="min-h-screen flex mx-auto items-center justify-center py-6 px-4">
    <div class="max-w-md w-full">
      <div class="p-8 rounded-2xl bg-white shadow">
        <h2 class="text-gray-800 text-center text-2xl font-bold">
          เข้าสู่ระบบ
        </h2>
        <form class="mt-8 space-y-4" on:submit={handelSubmit}>
          <div>
            <label for="username" class="text-gray-800 text-sm mb-2 block"
              >อีเมล</label
            >
            <div class="relative flex items-center">
              <input
                name="username"
                type="text"
                required
                bind:value={email}
                class="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                placeholder="ป้อนที่อยู่อีเมล"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#bbb"
                stroke="#bbb"
                class="w-4 h-4 absolute right-4"
                viewBox="0 0 24 24"
              >
                <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                <path
                  d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                  data-original="#000000"
                ></path>
              </svg>
            </div>
          </div>

          <div>
            <label for="password" class="text-gray-800 text-sm mb-2 block"
              >รหัสผ่าน</label
            >
            <div class="relative flex items-center">
              {#if show_password}
                <input
                  name="password"
                  type="text"
                  bind:value={password}
                  required
                  class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="รหัสผ่าน"
                />
              {:else}
                <input
                  name="password"
                  type="password"
                  bind:value={password}
                  required
                  class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
                  placeholder="รหัสผ่าน"
                />
              {/if}
              <button
                type="button"
                on:click={() => (show_password = !show_password)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  class="flex items-center justify-center w-5 h-5 absolute right-4 top-1/2 transform -translate-y-1/2"
                  viewBox="0 0 128 128"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>
          </div>

          <div class="!mt-8">
            <button
              type="submit"
              class="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-orange-500 hover:bg-orange-600 focus:outline-none"
            >
              เข้าสู่ระบบ
            </button>
          </div>
          <p class="text-gray-800 text-sm !mt-8 text-center">
            ยังไม่มีบัญชี? <a
              href="/register"
              class=" text-orange-500 hover:underline ml-1 whitespace-nowrap font-semibold"
              >สร้างบัญชี</a
            >
          </p>
        </form>
      </div>
    </div>
  </div>
</div>
