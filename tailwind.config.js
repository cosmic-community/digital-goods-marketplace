/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Orbitron', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'cyber-dark': '#0a0a0f',
        'cyber-darker': '#050508',
        'cyber-purple': '#1a0a2e',
        'cyber-blue': '#0f1a2e',
        'neon-cyan': '#00ffff',
        'neon-magenta': '#ff00ff',
        'neon-pink': '#ff0080',
        'neon-yellow': '#ffff00',
        'neon-green': '#00ff00',
        primary: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#00ffff',
          600: '#00cccc',
          700: '#0099a3',
          800: '#006b75',
          900: '#004d54',
          950: '#002b30',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#ff00ff',
          600: '#cc00cc',
          700: '#a300a3',
          800: '#7a007a',
          900: '#520052',
        },
      },
      animation: {
        'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
        'flicker': 'flicker 3s infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        pulseNeon: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '33%': { opacity: '0.9' },
          '66%': { opacity: '0.95' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff',
        'neon-magenta': '0 0 5px #ff00ff, 0 0 10px #ff00ff, 0 0 20px #ff00ff',
        'neon-pink': '0 0 5px #ff0080, 0 0 10px #ff0080, 0 0 20px #ff0080',
      },
      // Changed: Added typography customization for prose classes
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
        invert: {
          css: {
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-headings': '#ffffff',
            '--tw-prose-lead': '#9ca3af',
            '--tw-prose-links': '#00ffff',
            '--tw-prose-bold': '#ffffff',
            '--tw-prose-counters': '#9ca3af',
            '--tw-prose-bullets': '#00ffff',
            '--tw-prose-hr': 'rgba(0, 255, 255, 0.2)',
            '--tw-prose-quotes': '#d1d5db',
            '--tw-prose-quote-borders': '#ff00ff',
            '--tw-prose-captions': '#9ca3af',
            '--tw-prose-code': '#00ffff',
            '--tw-prose-pre-code': '#d1d5db',
            '--tw-prose-pre-bg': 'rgba(10, 10, 15, 0.8)',
            '--tw-prose-th-borders': 'rgba(0, 255, 255, 0.3)',
            '--tw-prose-td-borders': 'rgba(0, 255, 255, 0.1)',
          },
        },
      },
    },
  },
  // Changed: Added typography plugin
  plugins: [
    require('@tailwindcss/typography'),
  ],
}