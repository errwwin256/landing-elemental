import React, { useState } from "react";
import Todo from "./components/Todo.jsx";
import Weather from "./components/Weather.jsx";
import Calculator from "./components/Calculator.jsx";
import Clock from "./components/Clock.jsx"; // ✅ Digital Clock
import FloatingBackground from "./components/FloatingBackground.jsx";

export default function App() {
  const [theme, setTheme] = useState("sakura");

  const gradients = {
    sakura: "from-pink-100 via-pink-200 to-pink-300",
    lavender: "from-purple-100 via-purple-200 to-purple-300",
    dandelion: "from-yellow-100 via-yellow-200 to-yellow-300",
  };

  const headerColors = {
    sakura: "text-pink-600",
    lavender: "text-purple-600",
    dandelion: "text-yellow-600",
  };

  return (
    <div
      className={`relative min-h-screen bg-gradient-to-b ${gradients[theme]} transition-colors duration-700`}
    >
      {/* Floating flowers */}
      <FloatingBackground theme={theme} />

      <div className="max-w-4xl mx-auto py-10 px-4 space-y-10 relative z-10">
        <header className="text-center space-y-6">
          <h1 className={`text-4xl font-bold ${headerColors[theme]}`}>
            {theme === "sakura"
              ? "🌸 Sakura Land 🌸"
              : theme === "lavender"
              ? "💜 Lavender Land 💜"
              : "🌼 Dandelion Land 🌼"}
          </h1>
          <p className="text-gray-700">
            A cheerful landing page with useful apps
          </p>

          {/* ✅ Real-Time Digital Clock */}
          <Clock theme={theme} />
        </header>

        {/* Theme Switcher */}
        <div className="flex justify-center gap-4">
          {["sakura", "lavender", "dandelion"].map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`px-4 py-2 rounded-lg font-semibold ${
                theme === t
                  ? `bg-${
                      t === "sakura"
                        ? "pink"
                        : t === "lavender"
                        ? "purple"
                        : "yellow"
                    }-400 text-white`
                  : "bg-white/70"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        {/* Collage Paper Section - Full Width */}
        <section className="relative w-full my-8 p-6 overflow-hidden">
          {/* Layered paper background */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-yellow-50 rotate-[-1deg] rounded-lg shadow-md"></div>
            <div className="absolute top-2 left-2 w-full h-full bg-pink-50 rotate-[1deg] rounded-lg shadow-md"></div>
            <div className="absolute top-4 left-4 w-full h-full bg-blue-50 rotate-[-1deg] rounded-lg shadow-md"></div>
          </div>

          {/* Decorative tape strips */}
          <div className="absolute top-0 left-1/4 w-20 h-3 bg-yellow-200/80 rotate-[-5deg] shadow-sm rounded-sm"></div>
          <div className="absolute top-0 right-1/4 w-20 h-3 bg-pink-200/80 rotate-[5deg] shadow-sm rounded-sm"></div>

          {/* Header */}
          <h2 className="relative z-30 text-2xl font-bold mb-6 font-poppins text-gray-800 tracking-wide">
            📒 Book of Bandit
          </h2>

          {/* Todo component */}
          <div className="relative z-30">
            <Todo />
          </div>
        </section>

        <section className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">🌤 Weather</h2>
          <Weather />
        </section>

        <section className="bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">🧮 Calculator</h2>
          <Calculator />
        </section>
      </div>
    </div>
  );
}
