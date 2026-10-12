import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        volta: {
          dark: '#14212d',
          red: '#dc2626',
          green: '#10b981',
        },
      },
    },
  },
  plugins: [],
};
export default config;
