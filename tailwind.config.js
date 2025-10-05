/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // Fall
    "animate-fall",
    "animate-fall-slow",
    "animate-fall-medium",
    "animate-fall-fast",

    // Spin
    "animate-spin-slow",
    "animate-spin-medium",
    "animate-spin-fast",
    "animate-spin-slower",

    // Drift
    "animate-drift",
  ],
  theme: {
    extend: {
      // ✅ Add Poppins font
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },

      // ✅ Keyframes
      keyframes: {
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        fall: {
          "0%": { transform: "translateY(-10vh)", opacity: "1" },
          "100%": { transform: "translateY(110vh)", opacity: "0.7" },
        },
        drift: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(var(--drift))" },
          "100%": { transform: "translateX(0)" },
        },
      },

      // ✅ Animations
      animation: {
        "fall-slow": "fall 20s linear infinite",
        "fall-medium": "fall 15s linear infinite",
        "fall-fast": "fall 10s linear infinite",

        "spin-slow": "spin 20s linear infinite",
        "spin-medium": "spin 15s linear infinite",
        "spin-fast": "spin 10s linear infinite",
        "spin-slower": "spin-reverse 18s linear infinite",

        drift: "drift 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
