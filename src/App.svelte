<script>
  import { Router, Route, links } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  import Test from './routes/Test.svelte';
  import Register from './routes/Register.svelte';
  import History from './routes/History.svelte';
  import Login from './routes/Login.svelte';
  import Trip from './routes/Booking/Trip.svelte';
  import Seat from './routes/Booking/Seat.svelte'
  import Payment from './routes/Payment.svelte'
  import Find from "./routes/Booking/Find.svelte";
  import Howto from "./routes/Howto.svelte"
  import ManageBus_Emp from "./routes/ManageBus_Emp.svelte";
  import History_Emp from "./routes/History_Emp.svelte";
</script>

<body class="flex min-h-screen flex-col" use:links>
  <header
    class="flex shadow-md py-4 px-4 sm:px-10font-[sans-serif] min-h-[80px] tracking-wide relative z-50 bg-[#6439FF]"
  >
    <div class="flex flex-wrap items-center gap-5 w-full">
      <a href="/"
        ><img
          src="https://readymadeui.com/readymadeui.svg"
          alt="logo"
          class="w-40 max-lg:mr-5"
        />
      </a>

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
              href="/"
              class="hover:text-[#F5F5F5] text-[#333] font-semibold block text-[15px]"
              >ติดต่อเรา</a
            >
          </li>
        </ul>
      </div>

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

        <button id="toggleOpen" class="lg:hidden">
          <svg
            class="w-7 h-7"
            fill="#333"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </header>
  <main class="flex-1">
    <Router>
      <Route path="/howto" component={Howto} />
      <Route path="/register" component={Register} />
      <Route path="/history" component={History} />
      <Route path="/login" component={Login} />
      <Route path="/booking/trip" component={Trip} />
      <Route path="/seat" component={Seat} />
      <Route path="/payment" component={Payment} />
      <Route path="/booking/find" component={Find} />
      <Route path="/"><Home /></Route>
      <Route path="/ManageBus_Emp" component={ManageBus_Emp} />
    <Route path="/History_Emp" component={History_Emp} />
    </Router>
  </main>
  
  <footer class="bg-gray-800 py-7 px-8 font-sans bottom-0 w-full">
    <div class="flex max-lg:flex-col items-center justify-between gap-6">

      <ul class="flex flex-wrap justify-center gap-x-6 gap-4">
        <li><a href="/" class="text-xl hover:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline w-7 h-7" viewBox="0 0 512 512">
            <path fill="#1877f2" d="M512 256c0 127.78-93.62 233.69-216 252.89V330h59.65L367 256h-71v-48.02c0-20.25 9.92-39.98 41.72-39.98H370v-63s-29.3-5-57.31-5c-58.47 0-96.69 35.44-96.69 99.6V256h-65v74h65v178.89C93.62 489.69 0 383.78 0 256 0 114.62 114.62 0 256 0s256 114.62 256 256z" data-original="#1877f2" />
            <path fill="#fff" d="M355.65 330 367 256h-71v-48.021c0-20.245 9.918-39.979 41.719-39.979H370v-63s-29.296-5-57.305-5C254.219 100 216 135.44 216 199.6V256h-65v74h65v178.889c13.034 2.045 26.392 3.111 40 3.111s26.966-1.066 40-3.111V330z" data-original="#ffffff" />
          </svg>
        </a></li>

        <li><a href="/" class="text-xl hover:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline aspect-square w-9" viewBox="0 0 48 48">
            <path fill="#00c300" d="M12.5,42h23c3.59,0,6.5-2.91,6.5-6.5v-23C42,8.91,39.09,6,35.5,6h-23C8.91,6,6,8.91,6,12.5v23C6,39.09,8.91,42,12.5,42z"></path><path fill="#fff" d="M37.113,22.417c0-5.865-5.88-10.637-13.107-10.637s-13.108,4.772-13.108,10.637c0,5.258,4.663,9.662,10.962,10.495c0.427,0.092,1.008,0.282,1.155,0.646c0.132,0.331,0.086,0.85,0.042,1.185c0,0-0.153,0.925-0.187,1.122c-0.057,0.331-0.263,1.296,1.135,0.707c1.399-0.589,7.548-4.445,10.298-7.611h-0.001C36.203,26.879,37.113,24.764,37.113,22.417z M18.875,25.907h-2.604c-0.379,0-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687c0.379,0,0.687,0.308,0.687,0.687v4.521h1.917c0.379,0,0.687,0.308,0.687,0.687C19.562,25.598,19.254,25.907,18.875,25.907z M21.568,25.219c0,0.379-0.308,0.688-0.687,0.688s-0.687-0.308-0.687-0.688V20.01c0-0.379,0.308-0.687,0.687-0.687s0.687,0.308,0.687,0.687V25.219z M27.838,25.219c0,0.297-0.188,0.559-0.47,0.652c-0.071,0.024-0.145,0.036-0.218,0.036c-0.215,0-0.42-0.103-0.549-0.275l-2.669-3.635v3.222c0,0.379-0.308,0.688-0.688,0.688c-0.379,0-0.688-0.308-0.688-0.688V20.01c0-0.296,0.189-0.558,0.47-0.652c0.071-0.024,0.144-0.035,0.218-0.035c0.214,0,0.42,0.103,0.549,0.275l2.67,3.635V20.01c0-0.379,0.309-0.687,0.688-0.687c0.379,0,0.687,0.308,0.687,0.687V25.219z M32.052,21.927c0.379,0,0.688,0.308,0.688,0.688c0,0.379-0.308,0.687-0.688,0.687h-1.917v1.23h1.917c0.379,0,0.688,0.308,0.688,0.687c0,0.379-0.309,0.688-0.688,0.688h-2.604c-0.378,0-0.687-0.308-0.687-0.688v-2.603c0-0.001,0-0.001,0-0.001c0,0,0-0.001,0-0.001v-2.601c0-0.001,0-0.001,0-0.002c0-0.379,0.308-0.687,0.687-0.687h2.604c0.379,0,0.688,0.308,0.688,0.687s-0.308,0.687-0.688,0.687h-1.917v1.23H32.052z"></path>
          </svg>
        </a></li>

        <li><a href="/" class="text-xl hover:text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="inline w-7 h-7" viewBox="0 0 24 24">
            <linearGradient id="a" x1="-37.106" x2="-26.555" y1="-72.705" y2="-84.047" gradientTransform="matrix(0 -1.982 -1.844 0 -132.522 -51.077)" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#fd5" />
              <stop offset=".5" stop-color="#ff543e" />
              <stop offset="1" stop-color="#c837ab" />
            </linearGradient>
            <path fill="url(#a)" d="M1.5 1.633C-.386 3.592 0 5.673 0 11.995c0 5.25-.916 10.513 3.878 11.752 1.497.385 14.761.385 16.256-.002 1.996-.515 3.62-2.134 3.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091C18.89.029 18.778.005 15.91 0 5.737.005 3.507-.448 1.5 1.633z" data-original="url(#a)" />
            <path fill="#fff" d="M11.998 3.139c-3.631 0-7.079-.323-8.396 3.057-.544 1.396-.465 3.209-.465 5.805 0 2.278-.073 4.419.465 5.804 1.314 3.382 4.79 3.058 8.394 3.058 3.477 0 7.062.362 8.395-3.058.545-1.41.465-3.196.465-5.804 0-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794 1.597c7.574-.012 8.538-.854 8.006 10.843-.189 4.137-3.339 3.683-7.211 3.683-7.06 0-7.263-.202-7.263-7.265 0-7.145.56-7.257 6.468-7.263zm5.524 1.471a1.063 1.063 0 1 0 0 2.126 1.063 1.063 0 0 0 0-2.126zm-4.73 1.243a4.55 4.55 0 1 0 .001 9.101 4.55 4.55 0 0 0-.001-9.101zm0 1.597c3.905 0 3.91 5.908 0 5.908-3.904 0-3.91-5.908 0-5.908z" data-original="#ffffff" />
          </svg></a></li>
      </ul>

      <p class='text-base text-gray-300  max-lg:order-1'>© ReadymadeUI. All rights reserved.</p>
      <ul class="flex gap-x-6 gap-y-2 flex-wrap">
        <li><a href="/" class="text-gray-300 hover:text-white text-base">Terms of Service</a></li>
        <li><a href="/" class="text-gray-300 hover:text-white text-base">Privacy Policy</a></li>
        <li><a href="/" class="text-gray-300 hover:text-white text-base">Contact</a></li>
      </ul>
    </div>
  </footer>
</body>

<style>
  a {
    color: white;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
