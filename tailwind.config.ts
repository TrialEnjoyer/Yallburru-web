import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import typography from '@tailwindcss/typography';
import { withUt } from "uploadthing/tw";

export default withUt({
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        // Default font for body text
        sans: [
          "Whitney",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ],
        // Font for main headings (h1, h2)
        display: [
          "Whitney",
          "SF Pro Display",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif"
        ],
        // Font for other headings (h3, h4, h5, h6)
        heading: [
          "Whitney",
          "SF Pro Text",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'snake': 'snake 20s linear infinite',
        'blob': "blob 7s infinite",

      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        
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
