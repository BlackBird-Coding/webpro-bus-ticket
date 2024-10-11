<script>
  import { Steps } from "svelte-steps";
  let steps = [
    { text: "ค้นหาเที่ยวรถ" },
    { text: "เลือกเที่ยวรถ" },
    { text: "เลือกที่นั่ง" },
    { text: "ชำระเงิน" },
  ];

  let line = "0.35rem";
  let clickable = false;
  export let current = 0;
</script>

<div class="h-screen flex flex-shrink-0">
  <Steps primary="#30BD7A" vertical {steps} {line} {clickable} {current} />
</div>
