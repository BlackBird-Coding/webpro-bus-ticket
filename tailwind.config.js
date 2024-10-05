/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'

export default {
  content: ["./src/**/*.{html,js,svelte,ts}", './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'],
  darkMode: 'selector',
  theme: {
    extend: {
      fontFamily: {
        K2D: ["K2D", "sans-serif"],
        Itim: ["Itim", "cursive"],
      },
    },
  },
  plugins: [flowbitePlugin],
};

