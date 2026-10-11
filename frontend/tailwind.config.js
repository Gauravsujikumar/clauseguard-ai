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
          navy: '#071B45',
          blue: '#155EEF',
          accent: '#168BFF',
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          textPrimary: '#101828',
          textSecondary: '#667085',
          border: '#E4E7EC',
          success: '#16A34A',
          warning: '#D97706',
          error: '#DC2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
