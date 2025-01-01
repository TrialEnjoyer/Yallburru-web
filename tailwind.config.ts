import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import typography from '@tailwindcss/typography';
import { withUt } from "uploadthing/tw";

export default withUt({
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'snake': 'snake 20s linear infinite'
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
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          }
        },
        'snake': {
          '0%, 100%': {
            transform: 'translate(0%, 0%)'
          },
          '12.5%': {
            transform: 'translate(0%, 100%)'
          },
          '25%': {
            transform: 'translate(0%, 200%)'
          },
          '37.5%': {
            transform: 'translate(0%, 300%)'
          },
          '50%': {
            transform: 'translate(100%, 300%)'
          },
          '62.5%': {
            transform: 'translate(200%, 300%)'
          },
          '75%': {
            transform: 'translate(200%, 0%)'
          },
          '87.5%': {
            transform: 'translate(100%, 0%)'
          }
        }
      },
      typography: {
        DEFAULT: {
          css: {
            fontSize: '1rem',
            color: '#000000',
            p: {
              fontSize: '1rem',
              marginTop: '0.75em',
              marginBottom: '0.75em',
            },
            'ul > li': {
              fontSize: '1rem',
              marginTop: '0.25em',
              marginBottom: '0.25em',
              '&::marker': {
                color: '#000000',
              },
            },
            'ol > li': {
              fontSize: '1rem',
              marginTop: '0.25em',
              marginBottom: '0.25em',
              '&::marker': {
                color: '#000000',
              },
            },
          },
        },
      },
    },
  },
  plugins: [typography],
}) satisfies Config;
