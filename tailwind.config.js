/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './wp-content/themes/lavaur/**/*.php',
  ],
  theme: {
    extend: {
      colors: {
        // Bleu institutionnel
        institution: {
          50: '#eef4fb',
          100: '#d9e6f5',
          200: '#b3cdeb',
          300: '#82abdc',
          400: '#5285c8',
          500: '#3566ad',
          600: '#264d8a',
          700: '#1f3f70',
          800: '#1a3459',
          900: '#152a47',
        },
        // Couleurs secondaires - patrimoine occitan (terracotta / ocre / croix occitane or)
        occitan: {
          gold: '#c9971f',
          terracotta: '#b5502f',
          ocre: '#d98a3d',
        },
        surface: {
          light: '#f5f7fa',
          DEFAULT: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.75rem',
      },
    },
  },
  plugins: [],
}
