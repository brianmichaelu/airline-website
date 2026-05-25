import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#071A33",
        ocean: "#0E63F4",
        skysoft: "#EAF4FF",
      },
      boxShadow: {
        soft: "0 18px 45px rgba(15, 23, 42, 0.12)",
      },
      backgroundImage: {
        "flight-gradient": "linear-gradient(135deg, #071A33 0%, #0E63F4 55%, #5ED0FF 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
