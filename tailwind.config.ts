// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // App Router
    "./pages/**/*.{js, ,jsx,tsx}",      // (only if you still use pages/)
    "./components/**/*.{js,ts,jsx,tsx}", // shared components
  ],
  theme: { extend: {} },
  plugins: [],
};