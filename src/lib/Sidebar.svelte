<script>
  import { Steps } from "svelte-steps";
  import { onMount } from "svelte";
  let steps = [
    { text: "ค้นหาเที่ยวรถ" },
    { text: "เลือกเที่ยวรถ" },
    { text: "เลือกที่นั่ง" },
    { text: "ชำระเงิน" },
  ];

  let line = "0.35rem";
  let clickable = false;
  export let current = 0;
  let isMenuOpen = true;

  onMount(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        isMenuOpen = true;
      } else {
        isMenuOpen = false;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
</script>

{#if isMenuOpen}
  <div class="h-screen flex flex-shrink-0">
    <Steps primary="#30BD7A" vertical {steps} {line} {clickable} {current} />
  </div>
{/if}
