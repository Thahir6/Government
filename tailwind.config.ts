import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gov: {
          navy: "#0A192F",
          dark: "#060F1E",
          card: "#0F2444",
          surface: "#122B55",
          border: "rgba(255, 255, 255, 0.1)",
          blue: "#2563EB",
          indigo: "#4F46E5",
          cyan: "#06B6D4",
          saffron: "#F59E0B",
          orange: "#EA580C",
          green: "#10B981",
          emerald: "#059669",
          red: "#EF4444",
          muted: "#94A3B8"
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "mesh-dark": "radial-gradient(at 10% 20%, rgba(37, 99, 235, 0.15) 0px, transparent 50%), radial-gradient(at 90% 80%, rgba(245, 158, 11, 0.08) 0px, transparent 50%), radial-gradient(at 50% 50%, rgba(16, 185, 129, 0.08) 0px, transparent 50%)",
        "glass-gradient": "linear-gradient(135deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 100%)",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        "glow-blue": "0 0 25px -5px rgba(37, 99, 235, 0.4)",
        "glow-saffron": "0 0 25px -5px rgba(245, 158, 11, 0.3)",
        "glow-green": "0 0 25px -5px rgba(16, 185, 129, 0.3)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
