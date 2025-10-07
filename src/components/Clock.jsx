import React, { useEffect, useState } from "react";

export default function Clock({ theme }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Format Date & Time
  const weekday = time.toLocaleDateString(undefined, { weekday: "long" });
  const fullDate = time.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = time.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  // Theme-based LED colors
  const colors = {
    sakura: {
      text: "text-pink-400",
      glow: "0 0 10px #f472b6, 0 0 20px #ec4899, 0 0 40px #db2777",
      ring: "border-pink-400",
      backdrop: "bg-pink-50/10",
    },
    lavender: {
      text: "text-purple-400",
      glow: "0 0 10px #a78bfa, 0 0 20px #8b5cf6, 0 0 40px #7c3aed",
      ring: "border-purple-400",
      backdrop: "bg-purple-50/10",
    },
    dandelion: {
      text: "text-yellow-400",
      glow: "0 0 10px #facc15, 0 0 20px #eab308, 0 0 40px #ca8a04",
      ring: "border-yellow-400",
      backdrop: "bg-yellow-50/10",
    },
  };

  const themeColor = colors[theme] || colors.sakura;

  return (
    <div className="flex flex-col items-center space-y-3 sm:space-y-4 relative">
      {/* Weekday */}
      <div
        className={`text-lg sm:text-2xl font-bold font-poppins ${themeColor.text}`}
        style={{ textShadow: themeColor.glow }}
      >
        {weekday.toUpperCase()}
      </div>

      {/* Full date */}
      <div
        className={`px-3 sm:px-4 py-1 rounded-lg backdrop-blur-md ${themeColor.backdrop} 
        border ${themeColor.ring} font-poppins font-medium ${themeColor.text} text-xs sm:text-sm`}
        style={{ textShadow: themeColor.glow }}
      >
        {fullDate}
      </div>

      {/* Clock container */}
      <div className="relative w-36 h-36 sm:w-52 sm:h-52 flex items-center justify-center">
        {/* Orbiting Arc 1 */}
        <div
          className={`absolute w-40 h-40 sm:w-60 sm:h-60 rounded-full border-t-4 ${themeColor.ring} 
          border-l-transparent border-r-transparent border-b-transparent animate-spin-slow`}
          style={{ filter: "drop-shadow(0 0 8px currentColor)" }}
        ></div>

        {/* Orbiting Arc 2 (reverse direction) */}
        <div
          className={`absolute w-28 h-28 sm:w-44 sm:h-44 rounded-full border-b-4 ${themeColor.ring} 
          border-l-transparent border-r-transparent border-t-transparent animate-spin-slower`}
          style={{ filter: "drop-shadow(0 0 8px currentColor)" }}
        ></div>

        {/* Digital LED Time */}
        <div
          className={`px-4 sm:px-6 py-4 sm:py-6 rounded-full backdrop-blur-md ${themeColor.backdrop} 
          border ${themeColor.ring} font-mono text-xl sm:text-3xl font-bold tracking-widest ${themeColor.text}`}
          style={{ textShadow: themeColor.glow }}
        >
          {formattedTime}
        </div>
      </div>
    </div>
  );
}
