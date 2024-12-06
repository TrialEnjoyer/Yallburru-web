import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'opacity': '0.3',
            'transform': 'translateX(0%)',
          },
          '50%': {
            'opacity': '0.1',
            'transform': 'translateX(100%)',
          },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
