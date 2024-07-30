/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        "strong-cyan": "hsl(172 67% 45% / <alpha-value>)",
        "very-dark-cyan": "hsl(183 100% 15% / <alpha-value>)",
        "dark-cyan": "hsl(186 14% 43% / <alpha-value>)",
        "grayish-cyan": "hsl(184 14% 56% / <alpha-value>)",
        "light-cyan": "hsl(185 41% 84% / <alpha-value>)",
        "very-light-cyan": "hsl(189 41% 97% / <alpha-value>)",
      },
    },
  },
  plugins: [],
};
