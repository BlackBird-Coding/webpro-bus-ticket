/** @type {import('tailwindcss').Config} */
import flowbitePlugin from 'flowbite/plugin'

export default {
  content: ["./src/**/*.{html,js,svelte,ts}", './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}', "./node_modules/flowbite/**/*.js"],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'electric-violet': {
        '50': '#f2f2ff',
        '100': '#e8e7ff',
        '200': '#d3d2ff',
        '300': '#b4aeff',
        '400': '#8e80ff',
        '500': '#6a4dff',
        '600': '#6439ff',
        '700': '#4916eb',
        '800': '#3d12c5',
        '900': '#3311a1',
        '950': '#1b076e',
      },

      },
    },
  },
  plugins: [flowbitePlugin, 'flowbite/plugin'],
};

