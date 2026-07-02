/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        bone: {
          50: '#FDFCFA',
          100: '#FAF7F2',
          200: '#F4EFE7',
          300: '#E7E0D5',
        },
        ink: {
          DEFAULT: '#1C1917',
          light: '#57534E',
        },
        clay: {
          DEFAULT: '#B45309',
          light: '#D97706',
          dark: '#92400E',
        },
        moss: {
          DEFAULT: '#1E4D45',
          light: '#2F6E63',
          dark: '#153833',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}
