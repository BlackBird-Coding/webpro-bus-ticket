<script>
  import banner from "@/assets/banner.jpg"
  import bangkok from "@/assets/bangkok.jpg"
  import chiangmai from "@/assets/chiangmai.jpg"
  import loei from "@/assets/loei.jpg"
  import nakhonphanom from "@/assets/nakhonphanom.jpg"
  import surin from "@/assets/surin.jpg"
  import tak from "@/assets/tak.jpg"
  import Search from "@/lib/Search.svelte";
</script>
<div>
  <img class="w-full" src="{banner}" alt="">
  <div class="flex flex-col items-center mt-12">
    <div class="font-sans py-4 mx-auto lg:max-w-6xl md:max-w-4xl max-sm:max-w-md">
      <h2 class="text-4xl font-extrabold text-gray-800 text-center mb-12">เส้นทางยอดนิยม</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 sm:gap-6 gap-12">

        <div class="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
          <div class="w-full h-[300px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
            <img src="{bangkok}" alt="product1"
              class="h-full w-full object-contain" />
          </div>

          <div class="absolute mx-auto left-0 right-0 -bottom-80 group-hover:bottom-2 bg-white/50 w-11/12 p-3 rounded-lg transition-all duration-300">
            <div class="text-center">
              <h3 class="text-base font-bold text-gray-800">Bangkok</h3>
              <h4 class="text-lg text-blue-600 font-bold mt-2">$35.00</h4>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
          <div class="w-full h-[300px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
            <img src="{loei}" alt="product2"
              class="h-full w-full object-contain" />
          </div>

          <div class="absolute mx-auto left-0 right-0 -bottom-80 group-hover:bottom-2 bg-white/50 w-11/12 p-3 rounded-lg transition-all duration-300">
            <div class="text-center">
              <h3 class="text-base font-bold text-gray-800">Loei</h3>
              <h4 class="text-lg text-blue-600 font-bold mt-2">$20.00</h4>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
          <div class="w-full h-[300px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
            <img src="{nakhonphanom}" alt="product3"
              class="h-full w-full object-contain" />
          </div>

          <div class="absolute mx-auto left-0 right-0 -bottom-80 group-hover:bottom-2 bg-white/50 w-11/12 p-3 rounded-lg transition-all duration-300">
            <div class="text-center">
              <h3 class="text-base font-bold text-gray-800">Nakhonphanom</h3>
              <h4 class="text-lg text-blue-600 font-bold mt-2">$400.00</h4>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
          <div class="w-full h-[300px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
            <img src="{tak}" alt="product4"
              class="h-full w-full object-contain" />
          </div>

          <div class="absolute mx-auto left-0 right-0 -bottom-80 group-hover:bottom-2 bg-white/50 w-11/12 p-3 rounded-lg transition-all duration-300">
            <div class="text-center">
              <h3 class="text-base font-bold text-gray-800">Tak</h3>
              <h4 class="text-lg text-blue-600 font-bold mt-2">$11.00</h4>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
          <div class="w-full h-[300px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
            <img src="{surin}" alt="product5"
              class="h-full w-full object-contain" />
          </div>

          <div class="absolute mx-auto left-0 right-0 -bottom-80 group-hover:bottom-2 bg-white/50 w-11/12 p-3 rounded-lg transition-all duration-300">
            <div class="text-center">
              <h3 class="text-base font-bold text-gray-800">Surin</h3>
              <h4 class="text-lg text-blue-600 font-bold mt-2">$10.00</h4>
            </div>
          </div>
        </div>

        <div class="bg-gray-100 p-3 rounded-lg group overflow-hidden cursor-pointer relative z-50 hover:before:bg-black before:absolute before:inset-0 before:opacity-20 before:transition-all">
          <div class="w-full h-[300px] overflow-hidden mx-auto aspect-w-16 aspect-h-8">
            <img src="{chiangmai}" alt="product6"
              class="h-full w-full object-contain" />
          </div>

          <div class="absolute mx-auto left-0 right-0 -bottom-80 group-hover:bottom-2 bg-white/50 w-11/12 p-3 rounded-lg transition-all duration-300">
            <div class="text-center">
              <h3 class="text-base font-bold text-gray-800">Chiangmai</h3>
              <h4 class="text-lg text-blue-600 font-bold mt-2">$70.00</h4>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="flex flex-col items-center mt-12">
    <h2 class="text-4xl font-extrabold text-gray-800 text-center mb-12">วิธีการจองและชำระเงิน</h2>
    <div class="grid grid-cols-3 text-md gap-12">
      <div class="flex flex-col justify-center items-center font-medium gap-5">
        <div class="border-[3px] border-[#6439FF] rounded-md w-[350px] h-[190px] flex justify-center items-center">
          <div class="text-lg border-[3px] border-black rounded-md flex items-center justify-center pl-3">
            www.testtest.com<svg class="w-7 ml-2 aspect-square" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg>
          </div>
        </div>
        <div>1. เข้าเว็บไซต์ www.busticket.in.th</div>
      </div>
      <div class="flex flex-col justify-center items-center font-medium gap-5">
        <div class="border-[3px] border-[#6439FF] rounded-md w-[350px] h-[190px] flex justify-center items-center">
          <svg class="aspect-square h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M4 16c0 .88.39 1.67 1 2.22V21h3v-2h8v2h3v-2.78c.61-.55 1-1.34 1-2.22V6c0-3.5-3.58-4-8-4s-8 .5-8 4zm3.5 1c-.83 0-1.5-.67-1.5-1.5S6.67 14 7.5 14s1.5.67 1.5 1.5S8.33 17 7.5 17m9 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5s1.5.67 1.5 1.5s-.67 1.5-1.5 1.5m1.5-6H6V6h12z"/></svg>
        </div>
        <div>2. ทำรายการ <a class="text-[#6439FF] underline italic" href="/booking/find">จองตั๋ว</a> และรับรหัสการจอง</div>
      </div>
      <div class="flex flex-col justify-center items-center font-medium gap-5">
        <div class="border-[3px] border-[#6439FF] rounded-md w-[350px] h-[190px] flex justify-center items-center">
          <svg class="aspect-square h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17 3.34A10 10 0 1 1 2 12l.005-.324A10 10 0 0 1 17 3.34M12 6a1 1 0 0 0-1 1a3 3 0 1 0 0 6v2a1.02 1.02 0 0 1-.866-.398l-.068-.101a1 1 0 0 0-1.732.998a3 3 0 0 0 2.505 1.5H11a1 1 0 0 0 .883.994L12 18a1 1 0 0 0 1-1l.176-.005A3 3 0 0 0 13 11V9c.358-.012.671.14.866.398l.068.101a1 1 0 0 0 1.732-.998A3 3 0 0 0 13.161 7H13a1 1 0 0 0-1-1m1 7a1 1 0 0 1 0 2zm-2-4v2a1 1 0 0 1 0-2"/></svg>
        </div>
        <div>3. ชำระเงินผ่าน <a class="text-[#6439FF] underline italic" href="/booking/find">ช่องทางต่างๆ</a></div>
      </div>
      <div class="flex flex-col justify-center items-center font-medium gap-5">
        <div class="border-[3px] border-[#6439FF] rounded-md w-[350px] h-[190px] flex justify-center items-center">
          <svg class="aspect-square h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M18 7H6V3h12zm0 5.5q.425 0 .713-.288T19 11.5t-.288-.712T18 10.5t-.712.288T17 11.5t.288.713t.712.287M16 19v-4H8v4zm2 2H6v-4H2v-6q0-1.275.875-2.137T5 8h14q1.275 0 2.138.863T22 11v6h-4z"/></svg>
        </div>
        <div>4. <a class="text-[#6439FF] underline italic" href="/booking/find">พิมพ์ตั๋ว</a> ผ่านเว็บไซต์ด้วยตนเอง</div>
      </div>
      <div class="flex flex-col justify-center items-center font-medium gap-5">
        <div class="border-[3px] border-[#6439FF] rounded-md w-[350px] h-[190px] flex justify-center items-center">
          <svg class="aspect-square h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M432 96a48 48 0 1 0 0-96a48 48 0 1 0 0 96m-84.3 104.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1l22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54l19.3-65.5l9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L505 232.7l-15.3-36.8c-17.2-41.1-57.4-67.9-102-67.9c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1l-25 62.4l-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l61.7-61.7c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2l-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM256 274.1c-7.7-4.4-17.4-1.8-21.9 5.9l-32 55.4l-54.4-31.4c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8l43.8-75.7c4.4-7.7 1.8-17.4-5.9-21.9"/></svg>
        </div>
        <div>5. เดินทางตามกำหนดการ</div>
      </div>
    </div>
    <div class="flex justify-center items-center py-10">
      <a href="/booking/find" class="bg-[#6439FF] text-white px-5 py-2 rounded-lg text-xl hover:bg-[#2c1b6a]">เริ่มต้นจองตั๋ว</a>
    </div>
  </div>
</div>
