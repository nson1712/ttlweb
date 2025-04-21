// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router
    "./pages/**/*.{js, ,jsx,tsx}", // (only if you still use pages/)
    "./components/**/*.{js,ts,jsx,tsx}", // shared components
  ],
  theme: {
    theme: {
      extend: {
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))",
            foreground: "hsl(var(--primary-foreground))",
          },
          // Thêm màu tùy chỉnh
          gray: {
            900: "#0f172a",
            800: "#1e293b",
            700: "#334155",
          },
        },
      },
    },
  },
  plugins: [],
};
