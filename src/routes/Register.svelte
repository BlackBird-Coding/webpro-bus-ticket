<script lang="ts">
  import Swal from "sweetalert2";
  import { navigate } from "svelte-routing";
  let show_password = false;
  let value = "";
  $: type = show_password ? "text" : "password";

  let fname = "";
  let lname = "";
  let email = "";
  let number = "";
  let password = "";
  let cpassword = "";
  let gender = "unspecified";
  let dob = "";

  const handelSubmit = (event: Event) => {
    event.preventDefault();
    console.log({
      fname,
      lname,
      email,
      number,
      password,
      cpassword,
      gender,
      dob,
    });

    if (password !== cpassword) {
      Swal.fire({
        icon: "error",
        title: "รหัสผ่านไม่ตรงกัน",
        text: "กรุณาตรวจสอบรหัสผ่านอีกครั้ง",
      });
      return;
    }

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fname,
        lname,
        email,
        gender,
        dob,
        number,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/login", { replace: true });
        Swal.fire({
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถสมัครสมาชิกได้",
        });
      });
  };
</script>

<div class="max-w-4xl mx-auto font-[sans-serif] p-6">
  <div class="text-center mb-12">
    <h4 class="text-gray-800 text-3xl font-semibold mt-6">สร้างบัญชีของคุณ</h4>
  </div>

  <form on:submit={handelSubmit}>
    <div class="grid sm:grid-cols-2 gap-7">
      <div>
        <label for="name" class="text-gray-800 text-base mb-2 block"
          >ชื่อจริง</label
        >
        <input
          name="fname"
          type="text"
          bind:value={fname}
          required
          class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          placeholder="ป้อนชื่อจริง"
        />
      </div>
      <div>
        <label for="lname" class="text-gray-800 text-base mb-2 block"
          >นามสกุล</label
        >
        <input
          name="lname"
          type="text"
          bind:value={lname}
          required
          class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          placeholder="ป้อนนามสกุล"
        />
      </div>
      <div>
        <label for="gender" class="text-gray-800 text-base mb-2 block"
          >เพศ</label
        >
        <div class="flex">
          <div class="flex items-center me-4">
            <input
              id="female-radio"
              type="radio"
              value="female"
              bind:group={gender}
              name="gender"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="female-radio"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              หญิง
            </label>
          </div>

          <div class="flex items-center me-4">
            <input
              id="male-radio"
              type="radio"
              value="male"
              bind:group={gender}
              name="gender"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="male-radio"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ชาย
            </label>
          </div>

          <div class="flex items-center me-4">
            <input
              id="unspecified-radio"
              type="radio"
              value="unspecified"
              bind:group={gender}
              name="gender"
              checked
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="unspecified-radio"
              class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              ไม่ระบุ
            </label>
          </div>
        </div>
      </div>
      <div>
        <label for="lname" class="text-gray-800 text-base mb-2 block"
          >วันเกิด</label
        >

        <div class="mb-3 flex">
          <input
            type="date"
            bind:value={dob}
            required
            class="border p-2 w-full"
          />
        </div>
      </div>
      <div>
        <label for="email" class="text-gray-800 text-base mb-2 block"
          >อีเมล</label
        >
        <input
          name="email"
          type="text"
          bind:value={email}
          required
          class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          placeholder="ป้อนอีเมล"
        />
      </div>
      <div>
        <label for="number" class="text-gray-800 text-base mb-2 block"
          >หมายเลขโทรศัทท์</label
        >
        <input
          name="number"
          type="tel"
          bind:value={number}
          required
          class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
          placeholder="ป้อนหมายเลขโทรศัทพ์"
        />
      </div>
      <div>
        <label for="password" class="text-gray-800 text-base mb-2 block">
          รหัสผ่าน
        </label>
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
            class="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              {#if show_password}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              {:else}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              {/if}
            </svg>
          </button>
        </div>
      </div>
      <div>
        <label for="cpassword" class="text-gray-800 text-base mb-2 block">
          ยืนยันรหัสผ่าน
        </label>
        <div class="relative flex items-center">
          {#if show_password}
            <input
              name="cpassword"
              type="text"
              bind:value={cpassword}
              required
              class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="ยืนยันรหัสผ่าน"
            />
          {:else}
            <input
              name="cpassword"
              type="password"
              bind:value={cpassword}
              required
              class="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="ยืนยันรหัสผ่าน"
            />
          {/if}
          <button
            type="button"
            on:click={() => (show_password = !show_password)}
            class="absolute right-4 top-1/2 transform -translate-y-1/2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              {#if show_password}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              {:else}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              {/if}
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="!mt-12">
      <button
        type="submit"
        class="py-2.5 px-5 text-base font-semibold tracking-wider rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none w-full"
      >
        สมัครสมาชิก
      </button>
    </div>
  </form>
</div>
