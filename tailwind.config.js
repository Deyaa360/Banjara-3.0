/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
      },
    },
    extend: {
      borderColor: {
        DEFAULT: 'hsl(var(--border))',
      },
      fontFamily: {
        'serif': ['Cormorant Garamond', 'serif'],
        'display': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3.5rem, 10vw, 7rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['clamp(1.5rem, 3vw, 2rem)', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
      },
      colors: {
        primary: {
          DEFAULT: '#795939', // Walnut
          light: '#c5a77d', // Tan
          dark: '#4a4a4a', // Charcoal
          accent: '#e6c07a', // Muted Gold
          background: '#c4b597', // Beige
        },
        // Semantic color scales
        walnut: {
          50: '#faf8f6',
          100: '#f2ede7',
          200: '#e3d7cc',
          300: '#d1bca8',
          400: '#bc9d82',
          500: '#795939',
          600: '#6a4d32',
          700: '#5a412b',
          800: '#4a3524',
          900: '#3a2a1d',
        },
        tan: {
          50: '#fdfcfa',
          100: '#f9f6f1',
          200: '#f1ebe1',
          300: '#e7dccb',
          400: '#c5a77d',
          500: '#b99a6d',
          600: '#a88a5d',
          700: '#8e734d',
          800: '#745c3d',
          900: '#5c4a32',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#4a4a4a',
          600: '#3d3d3d',
          700: '#333333',
          800: '#2a2a2a',
          900: '#1a1a1a',
        },
        gold: {
          50: '#fefdf8',
          100: '#fdf9e8',
          200: '#faf0c2',
          300: '#f5e388',
          400: '#e6c07a',
          500: '#d4b06a',
          600: '#c4a05a',
          700: '#a88a4a',
          800: '#8e743a',
          900: '#745c2a',
        },
        beige: {
          50: '#fdfcf9',
          100: '#f9f7f2',
          200: '#f1ede4',
          300: '#e7e0d2',
          400: '#c4b597',
          500: '#b3a587',
          600: '#a29377',
          700: '#8a7c63',
          800: '#72654f',
          900: '#5c513f',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      boxShadow: {
        'elegant': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'elegant-lg': '0 0 0 1px rgba(0, 0, 0, 0.05), 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'heritage': '0 4px 6px -1px rgba(121, 89, 57, 0.1), 0 2px 4px -1px rgba(121, 89, 57, 0.06)',
        'heritage-lg': '0 20px 25px -5px rgba(121, 89, 57, 0.1), 0 10px 10px -5px rgba(121, 89, 57, 0.04)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-scale': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.98)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '-200% 0',
          },
          '100%': {
            backgroundPosition: '200% 0',
          },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'fade-in-scale': 'fade-in-scale 0.5s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}