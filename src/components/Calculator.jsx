import React, { useState } from "react";

export default function Calculator() {
  const [expr, setExpr] = useState("");
  const [result, setResult] = useState("");

  const buttons = [
    { val: "7", label: "7🍉" },
    { val: "8", label: "8🍊" },
    { val: "9", label: "9🍍" },
    { val: "/", label: "÷" },
    { val: "4", label: "4🍇" },
    { val: "5", label: "5🍌" },
    { val: "6", label: "6🍓" },
    { val: "*", label: "×" },
    { val: "1", label: "1🍎" },
    { val: "2", label: "2🍒" },
    { val: "3", label: "3🥝" },
    { val: "-", label: "-" },
    { val: "0", label: "0🥥" },
    { val: ".", label: "." },
    { val: "=", label: "=" },
    { val: "+", label: "+" },
  ];

  function press(v) {
    if (v === "=") return compute();
    setExpr((prev) => prev + v);
  }

  function clearAll() {
    setExpr("");
    setResult("");
  }

  function compute() {
    const safe = /^[0-9+\-*/().\s]+$/.test(expr);
    if (!safe) {
      setResult("🍋 error");
      return;
    }
    try {
      const val = Function(`'use strict'; return (${expr})`)();
      setResult(String(val));
    } catch (e) {
      setResult("🍋 error");
    }
  }

  // Fruit-themed button colors
  const fruitColors = {
    "+": "bg-orange-400 text-white",
    "-": "bg-yellow-400 text-white",
    "*": "bg-green-400 text-white",
    "/": "bg-purple-400 text-white",
    "=": "bg-pink-500 text-white col-span-2",
  };

  return (
    <div className="w-full max-w-md mx-auto my-6 p-4 sm:p-6 rounded-3xl shadow-xl bg-gradient-to-br from-yellow-50 via-pink-50 to-green-50 border">
      {/* Display */}
      <div className="mb-5">
        <input
          value={expr}
          onChange={(e) => setExpr(e.target.value)}
          className="w-full p-3 sm:p-4 rounded-xl border-2 border-green-300 text-lg sm:text-xl font-semibold text-gray-800 shadow-inner bg-white"
          placeholder="🍊 Enter expression"
        />
        <div className="mt-3 text-2xl sm:text-3xl font-bold text-pink-600 break-all">
          {result}
        </div>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {/* Clear Button */}
        <button
          onClick={clearAll}
          className="py-2 sm:py-3 rounded-xl bg-red-400 text-white font-bold shadow hover:opacity-90 transition col-span-2 text-sm sm:text-base"
        >
          🍓 C
        </button>
        <button
          onClick={() => press("(")}
          className="py-2 sm:py-3 rounded-xl bg-blue-300 text-white font-bold shadow hover:opacity-90 transition text-sm sm:text-base"
        >
          (
        </button>
        <button
          onClick={() => press(")")}
          className="py-2 sm:py-3 rounded-xl bg-blue-300 text-white font-bold shadow hover:opacity-90 transition text-sm sm:text-base"
        >
          )
        </button>

        {/* Number & Operator Buttons */}
        {buttons.map((b) => (
          <button
            key={b.val}
            onClick={() => press(b.val)}
            className={`py-2 sm:py-3 rounded-xl font-bold shadow hover:opacity-90 transition text-sm sm:text-lg ${
              fruitColors[b.val] || "bg-white border-2 border-yellow-200"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}
