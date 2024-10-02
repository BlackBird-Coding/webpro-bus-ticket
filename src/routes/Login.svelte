<script>
    let show_password = false
    let value = "";
    $: type = show_password ? 'text' : 'password'
</script>
<div class="m-10 text-2xl">
    <div class="flex justify-center">
        <div class="mb-5">ลงชื่อเข้าใช้</div>
    </div>
    <div class="flex gap-5 justify-center">
        <div class="flex flex-col gap-5">
            <input class="border pl-2 py-1 rounded-sm border-gray-400" type="text" placeholder="ป้อนที่อยู่อีเมล">
            <input class="border pl-2 py-1 rounded-sm border-gray-400" {type} {value} placeholder="รหัสผ่าน">
            <div>
                <div class="flex mr-56">
                    <input class="aspect-square w-4 mr-2" type="checkbox" on:click={() => show_password = !show_password }>
                    <label for="">แสดงรหัสผ่าน</label>
                </div>
            </div>
            <button class="bg-orange-400 py-2 rounded-md text-white hover:bg-orange-600 transition-colors" type="submit">สมัครสมาชิก</button>
        </div>
    </div>
    <div class="flex justify-center mt-5 text-xl">
        <a href="/register" class="hover:underline">สร้างบัญชี</a>
    </div>
</div>