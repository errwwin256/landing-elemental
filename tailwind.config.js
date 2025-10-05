import React, { useEffect, useState, useRef } from "react";

/**
 * FloatingBackground.jsx
 * - Uses import.meta.env.BASE_URL so paths work both in dev and on GitHub Pages.
 * - Preloads images and only uses ones that succeeded.
 * - Provides an inline SVG data-URL fallback if images fail.
 * - Adds onError handler to each <img> so broken requests get replaced.
 */

// -- configure petal filenames (relative to `public/` or root of built site)
const PETALS = {
  sakura: ["petals/sakura1.svg", "petals/sakura2.svg"],
  lavender: ["petals/lavender1.svg", "petals/lavender2.svg"],
  dandelion: ["petals/dandelion1.svg", "petals/dandelion2.svg"],
};

// small inline SVG fallback (simple petal shape) - used if file can't load
function makeFallbackDataUrl(color = "#FCA5E8") {
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'>
    <g fill='${color}' fill-opacity='0.95'>
      <path d='M32 4c7 0 14 6 18 12 4 6 6 14 2 20-3 5-11 12-20 24-9-12-17-19-20-24-4-6-2-14 2-20C18 10 25 4 32 4z'/>
    </g>
  </svg>`;
  return "data:image/svg+xml;base64," + btoa(svg);
}

// preload images via Image() and return array of { url, ok }
function preloadImages(urls = []) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = () => resolve({ url, ok: true });
          img.onerror = () => resolve({ url, ok: false });
          img.src = url;
        })
    )
  );
}

export default function FloatingBackground({ theme = "sakura" }) {
  const [items, setItems] = useState([]);
  const availableRef = useRef([]); // URLs that successfully preloaded
  const fallback = useRef(makeFallbackDataUrl("#FDE8F5"));

  useEffect(() => {
    // Build full URLs using BASE_URL so paths are correct in prod (GH Pages) and dev
    const base = import.meta.env.BASE_URL || "/"; // e.g. '/landing-elemental/' or '/'
    const files = (PETALS[theme] || []).map((p) => base + p);

    // Reset available & in-memory items when theme changes
    availableRef.current = [];
    setItems([]);

    // preload
    let cancelled = false;
    preloadImages(files).then((results) => {
      if (cancelled) return;
      const okUrls = results.filter((r) => r.ok).map((r) => r.url);
      availableRef.current = okUrls;

      // If none loaded, fall back to a couple of inline-data SVGs (keeps UI alive)
      if (okUrls.length === 0) {
        // create a few fallback data URLs with slight color variations
        availableRef.current = [
          makeFallbackDataUrl("#FDE8F5"),
          makeFallbackDataUrl("#E8F5FD"),
          makeFallbackDataUrl("#FFF6E8"),
        ];
        console.warn(
          "[FloatingBackground] No petal images preloaded — using inline SVG fallback."
        );
      } else {
        console.log(
          "[FloatingBackground] preloaded petal URLs:",
          availableRef.current
        );
      }
    });

    return () => {
      cancelled = true;
    };
  }, [theme]);

  useEffect(
    () => {
      // once we have availableRef.current (it will remain empty at first), spawn items
      let interval;
      let stopped = false;

      function spawn() {
        // don't spawn until we have at least one asset
        if (!availableRef.current || availableRef.current.length === 0) return;

        const id = Date.now() + Math.random();
        const size = Math.random() * 26 + 10; // px
        const startX = Math.random() * window.innerWidth;
        const speedClass = [
          "animate-fall-slow",
          "animate-fall-medium",
          "animate-fall-fast",
        ][Math.floor(Math.random() * 3)];
        const rotateClass =
          Math.random() > 0.5 ? "animate-rotate-left" : "animate-rotate-right";
        // use a randomly picked available URL
        const imgSrc =
          availableRef.current[
            Math.floor(Math.random() * availableRef.current.length)
          ];
        const drift = (Math.random() - 0.5) * 120; // px

        setItems((prev) => [
          ...prev,
          { id, size, startX, speedClass, rotateClass, imgSrc, drift },
        ]);

        // remove after 25s (longer than slowest fall)
        setTimeout(
          () => setItems((prev) => prev.filter((p) => p.id !== id)),
          25000
        );
      }

      // try to spawn every 450ms
      interval = setInterval(() => {
        if (stopped) return;
        spawn();
      }, 450);

      return () => {
        stopped = true;
        clearInterval(interval);
      };
    },
    [
      /* no deps — uses availableRef */
    ]
  );

  // onError handler for images (replace with fallback data URL)
  function handleImgError(e) {
    const el = e.currentTarget;
    console.warn("[FloatingBackground] petal image failed:", el.src);
    el.onerror = null;
    el.src = fallback.current;
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((p) => (
        <img
          key={p.id}
          src={p.imgSrc}
          alt=""
          onError={handleImgError}
          className={`absolute opacity-0 ${p.speedClass} ${p.rotateClass}`}
          style={{
            left: `${p.startX}px`,
            width: `${p.size}px`,
            height: "auto",
            top: "-16vh",
            // horizontal drift using CSS variable --drift
            transform: `translateX(${p.drift}px)`,
            // keep drift anim via CSS if you prefer; here we set initial transform
          }}
        />
      ))}
    </div>
  );
}
