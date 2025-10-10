/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",   // safe to include even if you don’t use /app
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        tommy: {
          beige: "#EADFBF",
          cream: "#F3EBD8",
          tan: "#D3B88B",
          brown: "#5A3E2B",
          ink: "#0B1B3A",
          indigo: "#11243A",
          olive: "#4B5B3A",
          golden: "#FFD24A",
          softBlue: "#9cd4f0",
        },
      },
      fontFamily: {
        heading: ["Georgia", "Merriweather", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "soft-card": "0 8px 30px rgba(6,10,20,0.45)",
        "glow-cta": "0 10px 30px rgba(255,210,74,0.18)",
      },
    },
  },
  plugins: [],
};
