import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'mollie': ['Mollie Glaston', 'serif'],
        'sans': ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'solace-green': {
          100: '#AFC8BF',
          500: '#3f937c',
          800: '#265b4e',
          900: '#285E50',
        },
      },
    },
  },
  plugins: [],
};
export default config;
