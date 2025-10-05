import React, { useState, useEffect } from "react";

const noteColors = [
  "bg-pink-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-purple-100",
  "bg-orange-100",
];

export default function Todo() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("flower-tasks") || "[]");
    } catch {
      return [];
    }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("flower-tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask(e) {
    e.preventDefault();
    if (!text.trim()) return;

    const randomColor =
      noteColors[Math.floor(Math.random() * noteColors.length)];

    const newTask = {
      id: Date.now(),
      text: text.trim(),
      done: false,
      editing: false,
      draft: "",
      color: randomColor,
    };
    setTasks((prev) => [newTask, ...prev]);
    setText("");
  }

  function toggleDone(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  function startEdit(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, editing: true, draft: t.text }
          : { ...t, editing: false }
      )
    );
  }

  function cancelEdit(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, editing: false, draft: "" } : t))
    );
  }

  function saveEdit(id) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, editing: false, text: t.draft || t.text, draft: "" }
          : t
      )
    );
  }

  function updateDraft(id, value) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, draft: value } : t))
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto my-10 relative">
      {/* Paper-like container */}
      <div className="relative bg-white shadow-xl rounded-xl border border-gray-200 p-8 overflow-hidden">
        {/* Notebook lines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(to bottom,#e5e7eb_1px,transparent_29px)] pointer-events-none opacity-20"></div>
        {/* Left margin line */}
        <div className="absolute top-0 left-12 bottom-0 w-[2px] bg-pink-300 opacity-40 pointer-events-none"></div>

        {/* Header */}
        <h2 className="relative text-3xl font-bold mb-6 font-poppins text-gray-800 tracking-wide z-10">
          📄 My To-Do List
        </h2>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="flex gap-3 mb-6 relative z-10">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your task..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:outline-none font-poppins bg-white/90"
          />
          <button className="px-5 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
            Add
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-4 max-h-[60vh] overflow-auto relative z-10">
          {tasks.length === 0 && (
            <li className="text-gray-400 italic">
              No tasks yet, add something!
            </li>
          )}
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex items-center justify-between p-4 rounded shadow-sm hover:shadow-md transition ${task.color}`}
            >
              {task.editing ? (
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={task.draft || ""}
                    onChange={(e) => updateDraft(task.id, e.target.value)}
                    className="flex-1 p-2 border rounded focus:ring-1 focus:ring-blue-300"
                  />
                  <button
                    onClick={() => saveEdit(task.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => cancelEdit(task.id)}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 transition"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 flex-1">
                    <input
                      type="checkbox"
                      checked={task.done}
                      onChange={() => toggleDone(task.id)}
                      className="h-5 w-5"
                    />
                    <span
                      className={`font-poppins ${
                        task.done
                          ? "line-through text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {task.text}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(task.id)}
                      className="px-2 py-1 text-sm border rounded hover:bg-gray-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeTask(task.id)}
                      className="px-2 py-1 text-sm border rounded text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
