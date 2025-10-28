import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";

export default function App(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Demo tasks for now (replace with API/state later)
  const tasks = [
    { id: "t1", title: "Finish README & demo GIF", description: "Add screenshots and demo video." },
    { id: "t2", title: "Implement auth", description: "Wire Supabase auth (email + OAuth)." },
    { id: "t3", title: "Add analytics", description: "Daily completed tasks chart." },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header onMenuClick={() => setSidebarOpen((s) => !s)} />
      <div className="flex">
        {/* Sidebar (desktop) */}
        <aside
          className={`hidden md:block w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900`}
        >
          <Sidebar />
        </aside>

        {/* Mobile sidebar (overlay) */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-opacity ${sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={!sidebarOpen}
        >
          <div
            className={`absolute inset-0 bg-black/40`}
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
          <div className={`absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 p-4 shadow-lg`}>
            <Sidebar />
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6 max-w-7xl mx-auto">
          <section className="mb-6">
            <h2 className="text-2xl font-semibold">Today</h2>
            <p className="text-sm text-gray-500">Quick overview of your tasks and productivity.</p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Task List</h3>
                <button
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  aria-label="Add task"
                >
                  + New Task
                </button>
              </div>

              <div className="space-y-3">
                {tasks.map((t) => (
                  <TaskCard key={t.id} title={t.title} description={t.description} />
                ))}
              </div>
            </div>

            <aside className="space-y-4">
              <div className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
                <h4 className="font-semibold mb-2">Quick Stats</h4>
                <div className="text-sm text-gray-500">Completed Today: 3</div>
                <div className="text-sm text-gray-500">Focus Streak: 5 days</div>
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
