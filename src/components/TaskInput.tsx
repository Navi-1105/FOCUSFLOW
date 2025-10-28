import React, { useRef, useState } from "react";
import { useTaskStore } from "../store/taskStore";

export default function TaskInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const addTask = useTaskStore((s) => s.addTask);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTask(trimmed, desc.trim() || undefined);
    setTitle("");
    setDesc("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      {/* Background glow effect */}
      <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
        isFocused 
          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl scale-105' 
          : 'bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-lg'
      }`}></div>
      
      <form onSubmit={submit} className="relative z-10 space-y-4">
        {/* Main input row */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-300 text-lg font-medium"
              placeholder="✨ What's your next big win?"
              aria-label="Task title"
            />
            {/* Input icon */}
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className="text-lg">📝</span>
            </div>
          </div>
          
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-sm hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-purple-500/25 flex items-center gap-2"
          >
            <span>🚀</span>
            <span>Add</span>
          </button>
        </div>

        {/* Description input */}
        <div className="relative">
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-700 dark:text-gray-300 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 focus:ring-4 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-300 text-sm"
            placeholder="💭 Add some details (optional)"
            aria-label="Task description"
          />
          {/* Description icon */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            <span className="text-sm">💭</span>
          </div>
        </div>
        
        {/* Quick tip */}
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          💡 Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">/</kbd> to focus or <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Enter</kbd> to save
        </div>
      </form>
    </div>
  );
}
