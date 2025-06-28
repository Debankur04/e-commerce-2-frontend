/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'var(--cream)',
        warmWhite: 'var(--warm-white)',
        gold: 'var(--gold)',
        roseGold: 'var(--rose-gold)',
        deepBurgundy: 'var(--deep-burgundy)',
        charcoal: 'var(--charcoal)',
        softGray: 'var(--soft-gray)',
        accentPink: 'var(--accent-pink)',
        mint: 'var(--mint)',
        shadow: 'var(--shadow)',
        lightShadow: 'var(--light-shadow)',
      },
    },
  },
};