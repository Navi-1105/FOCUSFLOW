import React, { useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";
import TaskInput from "./components/TaskInput";
import { useTaskStore } from "./store/taskStore";

export default function App(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { tasks } = useTaskStore();
  const mainRef = useRef<HTMLElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);

  // Keyboard shortcut: press "/" to focus the task title input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // don't trigger if focus is already on an input/textarea
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || (el as HTMLElement).isContentEditable)) return;
      if (e.key === "/") {
        e.preventDefault();
        // focus first input inside the TaskInput (title)
        const input = document.querySelector<HTMLInputElement>('input[aria-label="Task title"]');
        input?.focus();
      }
      // press "n" to toggle new task (optional)
      if (e.key === "n") {
        const addBtn = document.querySelector<HTMLButtonElement>('button[aria-label="Add task"]');
        addBtn?.click();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header onMenuClick={() => setSidebarOpen((s) => !s)} />
      <div className="flex">
        <aside className={`hidden md:block w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900`}>
          <Sidebar />
        </aside>

        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity ${sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={!sidebarOpen}
        >
          <div className={`absolute inset-0 bg-black/40`} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
          <div className={`absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 p-4 shadow-lg`}>
            <Sidebar />
          </div>
        </div>

        <main ref={mainRef} className="flex-1 p-6 max-w-7xl mx-auto">
          <section className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Today</h2>
                <p className="text-sm text-gray-500">Quick overview of your tasks and productivity.</p>
              </div>
              <div className="hidden sm:flex items-center gap-3">
                <input
                  ref={searchRef}
                  className="px-3 py-1.5 rounded-md border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Search tasks (press /)"
                  aria-label="Search tasks"
                />
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Task List</h3>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <TaskInput />
              </div>

              <div className="space-y-3">
                {tasks.length === 0 ? (
                  <div className="text-sm text-gray-500">No tasks yet — add one!</div>
                ) : (
                  tasks.map((t) => (
                    <TaskCard key={t.id} id={t.id} title={t.title} description={t.description} completed={t.completed} />
                  ))
                )}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <h4 className="font-semibold mb-2">Quick Stats</h4>
                <div className="text-sm text-gray-500">Completed Today: {tasks.filter(t => t.completed).length}</div>
                <div className="text-sm text-gray-500">Total Tasks: {tasks.length}</div>
              </div>

              <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <h4 className="font-semibold mb-2">Projects</h4>
                <ul className="text-sm text-gray-500 space-y-1">
                  <li># Portfolio</li>
                  <li># Personal</li>
                </ul>
              </div>
            </aside>
          </section>
        </main>
      </div>
    </div>
  );
}
