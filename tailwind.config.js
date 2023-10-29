/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  important: '#app',
  content: [
    './pages/**/*.{js,ts,tsx,jsx}',
    './layouts/**/*.{js,ts,tsx,jsx}',
    './src/**/*.{js,ts,tsx,jsx}',
  ],
  theme: {
    truncate: {
      lines: {
        2: '2',
        3: '3',
      },
    },
    extend: {
      colors: {
        'brand-1': '#FED600',
        'brand-black': '#1F2937',
        // error: defaultTheme.colors.red[400],
        littleblack: 'rgba(0, 0, 0, 0.5)',
        gray: {
          50: '#F9FAFB',
          100: '#F2F4F6',
          200: '#E5E8EB',
          300: '#D1D6DB',
          400: '#B0B8C1',
          500: '#8D95A1',
          600: '#6D7684',
          700: '#4E5968',
          800: '#333D4B',
          900: '#191F28',
        },
      },
      fontFamily: {
        sans: ['Pretendard', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        10: ['0.625rem', { lineHeight: '1rem' }],
        11: ['0.6875rem', { lineHeight: '1rem' }],
        12: defaultTheme.fontSize.xs,
        13: ['0.8125rem', { lineHeight: '1.125rem' }],
        14: defaultTheme.fontSize.sm,
        15: ['0.9375rem', { lineHeight: '1.375rem' }],
        16: defaultTheme.fontSize.base,
        17: ['1.0625rem', { lineHeight: '1.625rem' }],
        18: defaultTheme.fontSize.lg,
        19: ['1.1875rem', { lineHeight: '1.875rem' }],
        20: defaultTheme.fontSize.xl,
        24: defaultTheme.fontSize['2xl'],
        28: ['1.75rem', { lineHeight: '2rem' }],
        30: defaultTheme.fontSize['3xl'],
        32: ['2rem', { lineHeight: '2.75rem' }],
        36: defaultTheme.fontSize['4xl'],
        48: defaultTheme.fontSize['5xl'],
        56: ['3.5rem', { lineHeight: '4.5rem' }],
        60: defaultTheme.fontSize['6xl'],
        72: defaultTheme.fontSize['7xl'],
        96: defaultTheme.fontSize['8xl'],
        128: defaultTheme.fontSize['9xl'],
      },
      height: {
        screen: '100vh',
        'screen-5': 'calc( 100vh - 5rem )',
        'screen-10': 'calc( 100vh - 10rem )',
        'screen-15': 'calc( 100vh - 15rem )',
      },
      minWidth: {
        ...defaultTheme.spacing,
      },
      minHeight: {
        'screen-5': 'calc( 100vh - 5rem )',
        'screen-10': 'calc( 100vh - 10rem )',
        'screen-15': 'calc( 100vh - 15rem )',
      },
      maxHeight: {
        'screen-5': 'calc( 100vh - 5rem )',
        'screen-10': 'calc( 100vh - 10rem )',
        'screen-15': 'calc( 100vh - 15rem )',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['disabled'],
      borderColor: ['disabled'],
      textColor: ['disabled'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-truncate-multiline')(),
    require('./tailwind/filled'),
    require('./tailwind/outlined'),
    require('./tailwind/wh'),
    require('tailwind-scrollbar-hide'),
  ],
};
