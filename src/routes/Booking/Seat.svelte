<script>
    import Sidebar from "@/lib/Sidebar.svelte";
</script>
<div class="flex ml-16">
    <Sidebar class="w-1/4" current={2}></Sidebar>
    <div class="m-10 mx-20 w-4/5">
        <div class="text-3xl">เลือกที่นั่ง</div>
        <div class="mt-5">
            <div class="text-2xl ml-10 mb-5">เที่ยวไป</div>
            <div class="flex justify-center">
                <div class="bg-slate-100 w-5/12 px-5 py-10 rounded-md grid grid-cols-2 gap-8">
                    <div class="grid grid-cols-2 gap-2">
                        <button class="col-span-2 border border-orange-600 rounded-md h-20 cursor-default">ประตู</button>
                        <button class="border border-orange-600 rounded-md h-20">A1</button>
                        <button class="border border-orange-600 rounded-md h-20">B1</button>
                        <button class="border border-orange-600 rounded-md h-20">A2</button>
                        <button class="border border-orange-600 rounded-md h-20">B2</button>
                        <button class="border border-orange-600 rounded-md h-20">A3</button>
                        <button class="border border-orange-600 rounded-md h-20">B3</button>
                        <button class="border border-orange-600 rounded-md h-20">A4</button>
                        <button class="border border-orange-600 rounded-md h-20">B4</button>
                        <button class="border border-orange-600 rounded-md h-20">A5</button>
                        <button class="border border-orange-600 rounded-md h-20">B5</button>
                        <button class="border border-orange-600 rounded-md h-20">A6</button>
                        <button class="border border-orange-600 rounded-md h-20">B6</button>
                        <button class="border border-orange-600 rounded-md h-20">A7</button>
                        <button class="border border-orange-600 rounded-md h-20">B7</button>
                        <button class="border border-orange-600 rounded-md h-20">A8</button>
                        <button class="border border-orange-600 rounded-md h-20">B8</button>
                        <button class="border border-orange-600 rounded-md h-20">A9</button>
                        <button class="border border-orange-600 rounded-md h-20">B9</button>
                        <button class="col-span-2 h-20 cursor-default"></button>
                        <button class="col-span-2 h-20 cursor-default"></button>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="col-span-2 border border-orange-600 rounded-md h-20 cursor-default">พขร.</button>
                        <button class="border border-orange-600 rounded-md h-20">C1</button>
                        <button class="border border-orange-600 rounded-md h-20">D1</button>
                        <button class="border border-orange-600 rounded-md h-20">C2</button>
                        <button class="border border-orange-600 rounded-md h-20">D2</button>
                        <button class="border border-orange-600 rounded-md h-20">C3</button>
                        <button class="border border-orange-600 rounded-md h-20">D3</button>
                        <button class="border border-orange-600 rounded-md h-20">C4</button>
                        <button class="border border-orange-600 rounded-md h-20">D4</button>
                        <button class="border border-orange-600 rounded-md h-20">C5</button>
                        <button class="border border-orange-600 rounded-md h-20">D5</button>
                        <button class="border border-orange-600 rounded-md h-20">C6</button>
                        <button class="border border-orange-600 rounded-md h-20">C6</button>
                        <button class="border border-orange-600 rounded-md h-20">D7</button>
                        <button class="border border-orange-600 rounded-md h-20">D7</button>
                        <button class="border border-orange-600 rounded-md h-20">D8</button>
                        <button class="border border-orange-600 rounded-md h-20">D8</button>
                        <button class="border border-orange-600 rounded-md h-20">C9</button>
                        <button class="border border-orange-600 rounded-md h-20">D9</button>
                        <button class="col-span-2 border border-orange-600 rounded-md h-20 cursor-default">ประตุฉุกเฉิน</button>
                        <button class="col-span-2 border border-orange-600 rounded-md h-20 cursor-default">ห้องน้ำ</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="mt-5">
            <div class="text-2xl ml-10 mb-5">เที่ยวกลับ</div>
            <div class="flex justify-center">
                <div class="bg-slate-100 px-5 py-10 rounded-md w-5/12 grid grid-cols-2 gap-8">
                    <div class="grid grid-cols-2 gap-2">
                        <button class="col-span-2 border border-orange-600 rounded-md h-20 cursor-default">ประตู</button>
                        <button class="border border-orange-600 rounded-md h-20">A1</button>
                        <button class="border border-orange-600 rounded-md h-20">B1</button>
                        <button class="border border-orange-600 rounded-md h-20">A2</button>
                        <button class="border border-orange-600 rounded-md h-20">B2</button>
                        <button class="border border-orange-600 rounded-md h-20">A3</button>
                        <button class="border border-orange-600 rounded-md h-20">B3</button>
                        <button class="border border-orange-600 rounded-md h-20">A4</button>
                        <button class="border border-orange-600 rounded-md h-20">B4</button>
                        <button class="border border-orange-600 rounded-md h-20">A5</button>
                        <button class="border border-orange-600 rounded-md h-20">B5</button>
                        <button class="border border-orange-600 rounded-md h-20">A6</button>
                        <button class="border border-orange-600 rounded-md h-20">B6</button>
                        <button class="border border-orange-600 rounded-md h-20">A7</button>
                        <button class="border border-orange-600 rounded-md h-20">B7</button>
                        <button class="border border-orange-600 rounded-md h-20">A8</button>
                        <button class="border border-orange-600 rounded-md h-20">B8</button>
                        <button class="border border-orange-600 rounded-md h-20">A9</button>
                        <button class="border border-orange-600 rounded-md h-20">B9</button>
                        <button class="col-span-2 h-20 cursor-default"></button>
                        <button class="col-span-2 h-20 cursor-default"></button>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <button class="col-span-2 border border-orange-600 rounded-md h-20 cursor-default">พขร.</button>
                        <button class="border border-orange-600 rounded-md h-20">C1</button>
                        <button class="border border-orange-600 rounded-md h-20">D1</button>
                        <button class="border border-orange-600 rounded-md h-20">C2</button>
                        <button class="border border-orange-600 rounded-md h-20">D2</button>
                        <button class="border border-orange-600 rounded-md h-20">C3</button>
                        <button class="border border-orange-600 rounded-md h-20">D3</button>
                        <button class="border border-orange-600 rounded-md h-20">C4</button>
                        <button class="border border-orange-600 rounded-md h-20">D4</button>
                        <button class="border border-orange-600 rounded-md h-20">C5</button>
                        <button class="border border-orange-600 rounded-md h-20">D5</button>
                        <button class="border border-orange-600 rounded-md h-20">C6</button>
                        <button class="border border-orange-600 rounded-md h-20">C6</button>
                        <button class="border border-orange-600 rounded-md h-20">D7</button>
                        <button class="border border-orange-600 rounded-md h-20">D7</button>
                        <button class="border border-orange-600 rounded-md h-20">D8</button>
                        <button class="border border-orange-600 rounded-md h-20">D8</button>
                        <button class="border border-orange-600 rounded-md h-20">C9</button>
                        <button class="border border-orange-600 rounded-md h-20">D9</button>
                        <button class="col-span-2 border border-orange-600 rounded-md h-20 cursor-default">ประตุฉุกเฉิน</button>
                        <button class="col-span-2 border border-orange-600 rounded-md h-20 cursor-default">ห้องน้ำ</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex justify-center my-5 gap-10">
            <a class="bg-gray-500 text-2xl text-white px-3 py-1 rounded-md hover:bg-orange-600" href="/trip">ย้อนกลับ</a>
            <a class="bg-orange-500 text-2xl text-white px-3 py-1 rounded-md hover:bg-orange-600" href="/payment">ชำระเงิน</a>
        </div>
    </div>
</div>