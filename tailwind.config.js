/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/**/*.html"],
  theme: {
    extend: {
      colors: {
        "whatsapp-box-color": "#242626",
        "whatsapp-bg-color": "#161717",
        "whatsapp-box-hover": "#3a3c3c",
      },
    },
  },
  plugins: [],
};
