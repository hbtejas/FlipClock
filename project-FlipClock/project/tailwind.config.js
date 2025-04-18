/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
          950: '#172554',
        },
        accent: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
          950: '#042F2E',
        },
        clock: {
          card: '#F1F5F9',
          shadow: '#CBD5E1',
          back: '#E2E8F0',
          text: '#0F172A'
        }
      },
      animation: {
        'flip-down': 'flipDown 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) both',
        'flip-up': 'flipUp 0.6s cubic-bezier(0.455, 0.03, 0.515, 0.955) both',
      },
      keyframes: {
        flipDown: {
          '0%': { transform: 'rotateX(0)', transformOrigin: 'center top' },
          '100%': { transform: 'rotateX(-180deg)', transformOrigin: 'center top' }
        },
        flipUp: {
          '0%': { transform: 'rotateX(180deg)', transformOrigin: 'center bottom' },
          '100%': { transform: 'rotateX(0)', transformOrigin: 'center bottom' }
        }
      }
    },
  },
  plugins: [],
};