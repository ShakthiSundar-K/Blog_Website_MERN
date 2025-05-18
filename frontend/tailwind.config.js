/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        teal: {
          500: "#1A7B88",
          700: "#166877",
          800: "#125A67",
        },
        coral: {
          500: "#FF7F5C",
          600: "#FF6A42",
        },
        charcoal: {
          800: "#2D3748",
          900: "#1A202C",
        },
        offwhite: "#F8F9FA",
        gold: "#D4AF37",
        sage: "#C2D6C4",
      },
      fontFamily: {
        serif: ["Playfair Display", "serif"],
        sans: ["Inter", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        input: "0 2px 4px rgba(0, 0, 0, 0.05)",
        card: "0 10px 30px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
