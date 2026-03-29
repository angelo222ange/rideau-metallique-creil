/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#1B7A4E',
          700: '#155E3B',
          800: '#10452B',
          900: '#0B2E1D',
        },
        secondary: {
          terracotta: '#B45309',
          ocre: '#D97706',
          sable: '#FAFAF5',
        },
        anthracite: '#1F2937',
        dark: '#0C1B2A',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'DM Sans', 'system-ui', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'DM Sans', 'sans-serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['DM Serif Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        'button': '12px',
        'card': '16px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08), 0 8px 32px rgba(0,0,0,0.1)',
        'button-hover': '0 4px 16px rgba(27,122,78,0.25)',
        'soft': '0 2px 8px rgba(0,0,0,0.06)',
        'soft-lg': '0 4px 24px rgba(0,0,0,0.08)',
      },
      transitionDuration: {
        '250': '250ms',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(27, 122, 78, 0.3)' },
          '50%': { boxShadow: '0 0 0 10px rgba(27, 122, 78, 0)' },
        },
      },
    },
  },
  plugins: [],
}
