<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";
  import jsQR from "jsqr"; // Make sure to install this package

  let ticketId = "";
  let videoElem;
  let canvasElem;

  onMount(() => {
    setupCamera();
  });

  async function setupCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoElem.srcObject = stream;
      videoElem.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      videoElem.play();
      requestAnimationFrame(tick);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("ไม่สามารถเข้าถึงกล้องได้ กรุณาตรวจสอบการอนุญาตการใช้งานกล้อง");
    }
  }

  function tick() {
    if (videoElem.readyState === videoElem.HAVE_ENOUGH_DATA) {
      canvasElem.height = videoElem.videoHeight;
      canvasElem.width = videoElem.videoWidth;
      const context = canvasElem.getContext("2d");
      context.drawImage(videoElem, 0, 0, canvasElem.width, canvasElem.height);
      const imageData = context.getImageData(
        0,
        0,
        canvasElem.width,
        canvasElem.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });

      if (code) {
        ticketId = code.data;
      }
    }
    requestAnimationFrame(tick);
  }

  function handleSubmit() {
    if (ticketId) {
      fetch("/api/scan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: ticketId }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            navigate(`/ticket/${ticketId}`);
          } else {
            alert("ไม่พบข้อมูลตั๋ว กรุณาลองอีกครั้ง");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("เกิดข้อผิดพลาดในการสแกนตั๋ว กรุณาลองอีกครั้ง");
        });
    } else {
      alert("กรุณาสแกน QR Code หรือป้อนรหัสตั๋ว");
    }
  }
</script>

<div
  class="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50"
>
  <div
    class="bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full border border-gray-200 lg:p-12"
  >
    <h1 class="text-4xl font-extrabold text-center text-gray-800 mb-8">
      สแกนตั๋วเดินทาง
    </h1>

    <p class="text-center text-gray-500 text-lg mb-8 leading-relaxed">
      กรุณาสแกน QR Code บนตั๋วของคุณ หรือป้อนรหัสตั๋วด้านล่าง
    </p>

    <div class="mb-8 relative">
      <video bind:this={videoElem} class="w-full h-64 bg-black rounded-lg">
        <track kind="captions" />
      </video>
      <canvas bind:this={canvasElem} class="absolute top-0 left-0 w-full h-full"
      ></canvas>
    </div>

    <div class="mb-8">
      <label for="ticketId" class="block text-lg font-medium text-gray-700 mb-2"
        >รหัสตั๋ว:</label
      >
      <input
        type="text"
        id="ticketId"
        bind:value={ticketId}
        placeholder="กรอกรหัสตั๋วของคุณ"
        class="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-700"
      />
    </div>

    <div class="text-center">
      <button
        type="button"
        on:click={handleSubmit}
        class="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-300"
      >
        ดำเนินการต่อ
      </button>
    </div>
  </div>
</div>
