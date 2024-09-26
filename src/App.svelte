<script lang="ts">
  import svelteLogo from './assets/svelte.svg'
  import Counter from './lib/Counter.svelte'
</script>

<main class="flex flex-col items-center text-center space-y-6">
  <div class="flex space-x-6">
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer"> 
      <img src="/vite.svg" class="w-24 h-24" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer"> 
      <img src={svelteLogo} class="w-24 h-24" alt="Svelte Logo" />
    </a>
  </div>
  <h1 class="text-4xl font-bold">Vite + Svelte</h1>

  <div class="card p-6 bg-gray-100 rounded-lg shadow-lg">
    <Counter />
  </div>

  <p class="text-lg">
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer" class="text-blue-500 underline">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs text-gray-600 italic">
    Click on the Vite and Svelte logos to learn more
  </p>
</main>