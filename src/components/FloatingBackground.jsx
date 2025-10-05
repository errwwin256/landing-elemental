import React, { useEffect, useState } from "react";

const petalAssets = {
  sakura: ["/petals/sakura1.svg", "/petals/sakura2.svg"],
  lavender: ["/petals/lavender1.svg", "/petals/lavender2.svg"],
  dandelion: ["/petals/dandelion1.svg", "/petals/dandelion2.svg"],
};

export default function FloatingBackground({ theme }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // reset items whenever theme changes
    setItems([]);

    const active = petalAssets[theme];
    if (!active) return;

    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const size = Math.random() * 25 + 15;
      const startX = Math.random() * window.innerWidth;

      const speedClass = [
        "animate-fall-slow",
        "animate-fall-medium",
        "animate-fall-fast",
      ][Math.floor(Math.random() * 3)];

      const imgSrc = active[Math.floor(Math.random() * active.length)];

      setItems((prev) => [...prev, { id, size, startX, speedClass, imgSrc }]);

      // remove after max duration
      setTimeout(
        () => setItems((prev) => prev.filter((p) => p.id !== id)),
        22000
      );
    }, 500);

    return () => clearInterval(interval);
  }, [theme]); // 👈 important: reset on theme change

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map((p) => (
        <img
          key={p.id}
          src={p.imgSrc}
          alt="petal"
          className={`absolute ${p.speedClass}`}
          style={{
            left: `${p.startX}px`,
            width: `${p.size}px`,
            height: "auto",
            top: "-15vh",
          }}
        />
      ))}
    </div>
  );
}
