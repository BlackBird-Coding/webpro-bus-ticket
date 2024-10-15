<script>
    import Swal from "sweetalert2";
    import { navigate } from "svelte-routing";

    let busstop = {
        Name: null,
        Address: null,
        Subprovince: null,
        Province: null,
    };

    async function saveChanges() {
        try {
            const res = await fetch(`/api/AddStation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(busstop),
            });

            console.log("Received response:", res);

            if (!res.ok) {
                const text = await res.text();
                console.error(
                    `HTTP error! status: ${res.status}, body: ${text}`,
                );
                throw new Error(
                    `HTTP error! status: ${res.status}, body: ${text}`,
                );
            }

            const data = await res.json();
            console.log("Response data:", data);
            console.log("Successfully saved Bus");
            return data; // Return the data in case it's needed later
        } catch (error) {
            console.error("SaveRoute error:", error);
            throw error; // Re-throw the error to be caught in saveEdit
        }
    }

    async function saveEdit() {
        const result = await Swal.fire({
            title: "คุณต้องการบันทึกจุดขึ้นรถ-ลงรถนี้หรือไม่?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "บันทึก",
            denyButtonText: `ไม่บันทึก`,
            cancelButtonText: "ยกเลิก",
        });
        if (result.isConfirmed) {
            try {
                await saveChanges();
                console.log("sussces");
                await Swal.fire("บันทึกจุดขึ้นรถ-ลงรถเรียบร้อย!", "", "success");
                navigate(`/ManageBus_Emp`, { replace: true });
            } catch (error) {
                console.error("SaveRoute error:", error);
                await Swal.fire(
                    "เกิดข้อผิดพลาด!",
                    "ไม่สามารถบันทึกข้อมูลได้",
                    "error",
                );
            }
        } else if (result.isDenied) {
            await Swal.fire("การบันทึกถูกยกเลิก", "", "info");
            navigate(`/ManageBus_Emp`, { replace: true });
        }
    }
    function cancel() {
        Swal.fire({
            title: "คุณต้องการละทิ้งการแก้ไขใช่หรือไม่?",
            showDenyButton: true,
            confirmButtonText: "ใช่",
            denyButtonText: `ไม่`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                navigate(`/ManageBus_Emp`, { replace: true });
            }
        });
    }
</script>

<div>
    <form style="margin: 4% 5%;">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-2xl font-semibold leading-7 text-gray-900">
                    <b>เพิ่มจุดขึ้นรถ-ลงรถ</b>
                </h2>
                <p class="mt-2 text-sm leading-6 text-gray-600">
                    กรุณากรอกรายละเอียดจุดขึ้นรถ-ลงรถที่ต้องการเพิ่ม
                </p>

                <div
                    class="mt-8 grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-6"
                >
                    <div class="sm:col-span-6">
                        <label
                            for="first-name"
                            class="block text-base font-medium leading-6 text-gray-900"
                            >ชื่อจุดขึ้นรถ-ลงรถ</label
                        >
                        <div class="mt-2">
                            <input
                                bind:value={busstop.Name}
                                required
                                type="text"
                                name="first-name"
                                id="first-name"
                                autocomplete="given-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-6">
                        <label
                            for="last-name"
                            class="block text-base font-medium leading-6 text-gray-900"
                            >ที่อยู่</label
                        >
                        <div class="mt-2">
                            <textarea
                                bind:value={busstop.Address}
                                required
                                type="text"
                                name="last-name"
                                id="last-name"
                                autocomplete="family-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label
                            for="last-name"
                            class="block text-base font-medium leading-6 text-gray-900"
                            >อำเภอ</label
                        >
                        <div class="mt-2">
                            <input
                                bind:value={busstop.Subprovince}
                                required
                                type="text"
                                name="last-name"
                                id="last-name"
                                autocomplete="family-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div class="sm:col-span-3">
                        <label
                            for="last-name"
                            class="block text-base font-medium leading-6 text-gray-900"
                            >จังหวัด</label
                        >
                        <div class="mt-2">
                            <input
                                bind:value={busstop.Province}
                                required
                                type="text"
                                name="last-name"
                                id="last-name"
                                autocomplete="family-name"
                                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
                <button
                on:click={cancel}
                    type="button"
                    class="text-sm font-semibold leading-6 text-gray-900"
                    >Cancel</button
                >
                <button
                    on:click={saveEdit}
                    type="button"
                    class="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >Save</button
                >
            </div>
        </div>
    </form>
</div>

<style>
</style>
