import React, { useRef, useState } from "react";
import { useTaskStore } from "../store/taskStore";

export default function TaskInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const addTask = useTaskStore((s) => s.addTask);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

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
    <form onSubmit={submit} className="space-y-2">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Add a task title (press Enter to save)"
          aria-label="Task title"
        />
        <button
          type="submit"
          className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add
        </button>
      </div>

      <input
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        className="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Optional description"
        aria-label="Task description"
      />
    </form>
  );
}
