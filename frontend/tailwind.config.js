/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: "#FF5F04",
          "orange-light": "#FF8A00",
          blue: "#2E5BFF",
          "blue-light": "#4E7BFF",
          lime: "#D7FF00",
          navy: "#0A1128",
          "navy-light": "#0F172A",
          dark: "#0F172A",
          gray: "#F8F9FA",
        },
        surface: {
          white: "#FFFFFF",
          soft: "#F1F5F9",
        }
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #FF5F04 0%, #FF8A00 100%)',
        'gradient-blue': 'linear-gradient(135deg, #2E5BFF 0%, #4E7BFF 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0A1128 0%, #0F172A 100%)',
        'gradient-glass': 'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.3))',
      },
      boxShadow: {
        'premium': '0 20px 60px rgba(0, 0, 0, 0.03)',
        'orange-glow': '0 15px 40px rgba(255, 95, 4, 0.25)',
        'blue-glow': '0 15px 40px rgba(46, 91, 255, 0.25)',
        'lime-glow': '0 15px 40px rgba(215, 255, 0, 0.4)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.05)',
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'pulse-soft': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
