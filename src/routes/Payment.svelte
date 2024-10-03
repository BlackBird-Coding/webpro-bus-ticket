<script>
// @ts-nocheck
import qrcode from "@/assets/QRCode.png";

let display = "card";

function onChange(event) {
    display = event.currentTarget.value;
}
</script>
<div class="flex">
    <div class="bg-orange-300 p-5 w-1/4">
        <div class="flex flex-col justify-between">
            <div>
                <div class="text-3xl font-semibold">summary</div>
                <div class="ml-2 mt-2">
                    <div class="flex justify-between">
                        <div>ราคาตั๋วเที่ยวไป</div>
                        <div>300.00 บาท</div>
                    </div>
                    <div class="flex justify-between">
                        <div>ราคาตั๋วเที่ยวกลับ</div>
                        <div>307.00 บาท</div>
                    </div>          
                    <div class="flex justify-between">
                        <div>ค่าดำเนินการจัดการ</div>
                        <div>40.00 บาท</div>
                    </div>
                    <hr class="my-4">
                    <div class="flex justify-between">
                        <div>ราคารวม</div>
                        <div>600.00 บาท</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-3/5 p-5 ml-10 flex flex-col gap-5">
        <div class="text-3xl font-semibold">Complete your order</div>
        <div class="flex flex-col text-xl mt-5 gap-5">
            <div>Personal Details</div>
            <div class="flex gap-5 text-lg">
                <select class="border border-gray-400 w-1/5 rounded-md pl-2" name="" id="">
                    <option value="">ระบุเพศ</option>
                    <option value="">ชาย</option>
                    <option value="">หญิง</option>
                    <option value="">ไม่ระบุ</option>
                </select>
                <input class="border border-gray-400 pl-2 rounded-md w-2/5" type="text" placeholder="ชื่อ">
                <input class="border border-gray-400 pl-2 rounded-md w-2/5" type="text" placeholder="นามสกุล">
            </div>
            <div class="flex gap-5 text-lg">
                <select class="border border-gray-400 w-1/5 rounded-md pl-2" name="" id="">
                    <option value="">บัตรประชาชน</option>
                    <option value="">หนังสือเดินทาง</option>
                </select>
                <input class="border border-gray-400 pl-2 rounded-md w-4/5" type="number" placeholder="หมายเลขบัตร" onfocus="(this.type='number')" onblur="(this.type='text')">
            </div>
        </div>
        <div class="flex flex-col text-xl mt-5 gap-5">
            <div>ข้อมูลผู้ติดต่อ</div>
            <div class="flex gap-4 text-lg">
                <div class="ml-2 w-1/5">ชื่อผู้ติดต่อ</div>
                <input class="border border-gray-400 pl-2 rounded-md w-2/5" type="text" placeholder="ชื่อ">
                <input class="border border-gray-400 pl-2 rounded-md w-2/5" type="text" placeholder="นามสกุล">   
            </div>
            <div class="flex gap-4 text-lg">
                <div class="ml-2 w-1/5">โทรศัพท์มือถือ</div>
                <input class="border border-gray-400 pl-2 rounded-md w-4/5" type="text" placeholder="หมายโทรศัพท์มือถือ">  
            </div>
            <div class="flex gap-4 text-lg">
                <div class="ml-2 w-1/5">อีเมล</div>
                <input class="border border-gray-400 pl-2 rounded-md w-4/5" type="text" placeholder="กรอกอีเมล (ถ้ามี) เพื่อรับข้อมูลการจอง">  
            </div>
        </div>
        <div class="flex flex-col text-xl mt-5 gap-5">
            <div>วิธีการชำระเงิน</div>
            <div class="flex gap-20 text-lg">
                <div class="flex items-center">
                    <input checked={true} on:change={onChange} value="card" class="aspect-square w-4 mr-2" type="radio" name="pay" id="">
                    <svg class="aspect-square w-5 mr-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 14 14"><g fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"><rect width="13" height="9.5" x=".5" y="2.25" rx="1"/><path d="M.5 5.75h13m-4 3.5H11"/></g></svg>
                    บัตรเครดิต/บัตรเดบิต
                </div>
                <div class="flex items-center">
                    <input on:change={onChange} value="qr" class="aspect-square w-4 mr-2" type="radio" name="pay" id="">
                    <svg class="aspect-square w-5 mr-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 16 16"><g fill="#000000"><path d="M2 2h2v2H2z"/><path d="M6 0v6H0V0zM5 1H1v4h4zM4 12H2v2h2z"/><path d="M6 10v6H0v-6zm-5 1v4h4v-4zm11-9h2v2h-2z"/><path d="M10 0v6h6V0zm5 1v4h-4V1zM8 1V0h1v2H8v2H7V1zm0 5V4h1v2zM6 8V7h1V6h1v2h1V7h5v1h-4v1H7V8zm0 0v1H2V8H1v1H0V7h3v1zm10 1h-1V7h1zm-1 0h-1v2h2v-1h-1zm-4 0h2v1h-1v1h-1zm2 3v-1h-1v1h-1v1H9v1h3v-2zm0 0h3v1h-2v1h-1zm-4-1v1h1v-2H7v1z"/><path d="M7 12h1v3h4v1H7zm9 2v2h-3v-1h2v-1z"/></g></svg>
                    แสกน QR Code
                </div>
                <!-- <div class="flex items-center">
                    <input class="aspect-square w-4 mr-2" type="radio" name="pay" id="">
                    <svg class="aspect-square w-7 mr-1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 50 50"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke="#344054" d="M39.583 22.917h-5.208a3.125 3.125 0 0 0-3.125 3.125v0a3.125 3.125 0 0 0 3.125 3.125h2.083a3.125 3.125 0 0 1 3.125 3.125v0a3.125 3.125 0 0 1-3.125 3.125H31.25m4.167 2.083v-2.083m0-12.5v-2.084z"/><path stroke="#306CFE" d="M29.167 43.75H12.5a2.083 2.083 0 0 1-2.083-2.083V8.333A2.083 2.083 0 0 1 12.5 6.25h20.833a2.083 2.083 0 0 1 2.084 2.083V12.5"/><path stroke="#306CFE" d="M27.083 6.25H18.75l1.042 4.167h6.25z"/></g></svg>
                    โมบายแบงก์กิ้ง
                </div> -->
            </div>
            {#if display === "card"}
            <div class="flex flex-col text-xl gap-5">
                <div class="flex gap-4 text-lg">
                    <input class="border border-gray-400 pl-2 rounded-md w-[45%]" type="text" placeholder="Name of card holder">
                    <input class="border border-gray-400 pl-2 rounded-md w-[45%]" type="text" placeholder="Card number" onfocus="(this.type='number')" onblur="(this.type='text')">
                </div>
                <div class="flex gap-4 text-lg">
                    <input class="border border-gray-400 pl-2 rounded-md w-[45%]" type="text" name="" id="" placeholder="CVV">
                    <input class="border border-gray-400 pl-2 rounded-md w-[45%]" type="text" placeholder="EXP." onfocus="(this.type='date')" onblur="(this.type='text')" name="" id="">
                </div>
            </div>
            {:else if display === "qr"}
            <div class="flex flex-col justify-center items-center gap-4">
                <div class="text-5xl">Scan me</div>
                <img class="aspect-square w-64" src="{qrcode}" alt="">
            </div>
            {/if}
            <div>
                <button class="bg-blue-500 py-1 px-5 text-lg rounded-md text-white hover:bg-blue-600" type="submit">ชำระเงิน</button>
            </div>
        </div>
    </div>
</div>