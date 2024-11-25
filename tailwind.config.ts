import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './.svelte-kit/**/*.{html,js,svelte,ts}',
  ],
  theme: {
    extend: {
      animation: {
        'fade-in-down': 'fade-in-down 0.3s ease-out',
      },keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
      colors: {
        primary: {
          50: '#E3EDF3',  // Lightest shade
          100: '#C7DBE6',
          200: '#8FB6CD',
          300: '#5790B3',
          400: '#306E96',
          500: '#26547C',  // Base shade
          600: '#1E4262',
          700: '#163048',
          800: '#0E1E2E',
          900: '#070C15',  // Darkest shade
        },
        secondary: {
          50: '#FFFDEA',  
          100: '#FEFBD5',
          200: '#FEF6AC',
          300: '#FEF184',
          400: '#FDF05D',
          500: '#FAF2A1',  // Base shade
          600: '#C9C17D',
          700: '#979159',
          800: '#656035',
          900: '#333011',  
        },
        brand_grey: {
          50: '#EDF1F2',
          100: '#DBE2E3',
          200: '#B8C5C7',
          300: '#95A8AB',
          400: '#7EA2AA',  // Base shade
          500: '#698C94',
          600: '#536F75',
          700: '#3D5256',
          800: '#282636',
          900: '#13141A',
        },
        brand_orange: {
          50: '#FFE8DB',
          100: '#FFD1B7',
          200: '#FFA274',
          300: '#FF7543',
          400: '#FF5714',  // Base shade
          500: '#CC440F',
          600: '#99330B',
          700: '#662208',
          800: '#331105',
          900: '#1A0902',
        },
        brand_pink: {
          50: '#FDE8EA',
          100: '#FAC2C7',
          200: '#F58A93',
          300: '#F26D79',
          400: '#EF959C',  // Base shade
          500: '#BD7377',
          600: '#8A5558',
          700: '#58363A',
          800: '#26171C',
          900: '#130B0E',
        },
      },
    },
  },

  plugins: [typography, forms, containerQueries, aspectRatio]
} satisfies Config;
