/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F4C5C",   
        secondary: "#1B6B7A", 
        accent: "#F08A24",    
        background: "#fae5cf",
        surface: "#FFFFFF",
        textMain: "#1E293B",
        textMuted: "#64748B",
      },
    },
  },
  plugins: [],
};