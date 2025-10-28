import React, { useEffect, useRef, useState, useMemo } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import TaskCard from "./components/TaskCard";
import TaskInput from "./components/TaskInput";
import Analytics from "./components/Analytics";
import { useTaskStore } from "./store/taskStore";

type Filter = "all" | "active" | "completed";

const STORAGE_KEY = "focusflow-ui"; // stores { search, filter }

export default function App(): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentView, setCurrentView] = useState<"tasks" | "analytics">("tasks");
  const { tasks, clearAll } = useTaskStore();
  const mainRef = useRef<HTMLElement | null>(null);

  // Load UI state from localStorage (persisted)
  const loadUiState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { search: "", filter: "all" as Filter };
      const parsed = JSON.parse(raw) as { search?: string; filter?: Filter };
      return {
        search: parsed.search ?? "",
        filter: parsed.filter ?? ("all" as Filter),
      };
    } catch {
      return { search: "", filter: "all" as Filter };
    }
  };

  const initial = loadUiState();
  const [search, setSearch] = useState<string>(initial.search);
  const [filter, setFilter] = useState<Filter>(initial.filter);

  const searchRef = useRef<HTMLInputElement | null>(null);

  // Persist search/filter when they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ search, filter }));
    } catch {
      // ignore quota/cookie errors
    }
  }, [search, filter]);

  // Keyboard shortcut: "/" focuses the search input (or the task title input if fallback)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || (el as HTMLElement).isContentEditable)) return;
      if (e.key === "/") {
        e.preventDefault();
        const input =
          document.querySelector<HTMLInputElement>('input[aria-label="Search tasks"]') ||
          document.querySelector<HTMLInputElement>('input[aria-label="Task title"]');
        input?.focus();
      }
      if (e.key === "n") {
        const addBtn = document.querySelector<HTMLButtonElement>('button[aria-label="Add task"]');
        addBtn?.click();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Derived filtered tasks (memoized)
  const filteredTasks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tasks.filter((t) => {
      if (filter === "active" && t.completed) return false;
      if (filter === "completed" && !t.completed) return false;
      if (!q) return true;
      const inTitle = t.title.toLowerCase().includes(q);
      const inDesc = (t.description || "").toLowerCase().includes(q);
      return inTitle || inDesc;
    });
  }, [tasks, search, filter]);

  // Clear persisted UI state and all tasks (dev / user option)
  const clearUiState = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSearch("");
    setFilter("all");
    clearAll(); // Clear all tasks from the store
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-purple-900/20 dark:to-pink-900/20 text-gray-900 dark:text-gray-100">
      <Header onMenuClick={() => setSidebarOpen((s) => !s)} />

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className={`hidden md:block w-64 border-r border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm`}>
          <Sidebar />
        </aside>

        {/* Mobile overlay sidebar */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${sidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
          aria-hidden={!sidebarOpen}
        >
          <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm`} onClick={() => setSidebarOpen(false)} aria-hidden="true" />
          <div className={`absolute left-0 top-0 bottom-0 w-72 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md p-4 shadow-2xl border-r border-gray-200/50 dark:border-gray-700/50`}>
            <Sidebar />
          </div>
        </div>

        {/* Main content */}
        <main ref={mainRef} className="flex-1 p-6 max-w-7xl mx-auto">
          {/* Enhanced Tab Navigation */}
          <div className="mb-8">
            <div className="relative inline-flex space-x-1 bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm p-1 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
              {/* Animated background for active tab */}
              <div className={`absolute top-1 bottom-1 rounded-xl transition-all duration-300 ease-out ${
                currentView === "tasks" 
                  ? "left-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25" 
                  : "left-24 w-24 bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25"
              }`}></div>
              
              <button
                onClick={() => setCurrentView("tasks")}
                className={`relative z-10 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  currentView === "tasks"
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                <span className="text-lg">📝</span>
                <span>Tasks</span>
              </button>
              <button
                onClick={() => setCurrentView("analytics")}
                className={`relative z-10 px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  currentView === "analytics"
                    ? "text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                }`}
              >
                <span className="text-lg">📊</span>
                <span>Analytics</span>
              </button>
            </div>
          </div>

          {currentView === "tasks" ? (
            <>
              <section className="mb-8">
                {/* Enhanced header with gradient background */}
                <div className="relative p-6 rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg mb-6">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl opacity-50"></div>
                  
                  <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ✨ Today
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Quick overview of your tasks and productivity journey 🚀
                      </p>
                    </div>

                    {/* Enhanced Search + Filter controls */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-sm"></div>
                        <input
                          ref={searchRef}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="relative z-10 px-4 py-2 rounded-xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-300 w-64"
                          placeholder="🔍 Search tasks..."
                          aria-label="Search tasks"
                        />
                      </div>

                      {/* Enhanced filter buttons */}
                      <div className="inline-flex items-center rounded-xl bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-800/80 dark:to-gray-700/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 p-1 shadow-lg">
                        {[
                          { key: "all", label: "All", emoji: "📋" },
                          { key: "active", label: "Active", emoji: "🔥" },
                          { key: "completed", label: "Done", emoji: "✅" }
                        ].map((item) => (
                          <button
                            key={item.key}
                            onClick={() => setFilter(item.key as Filter)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2 ${
                              filter === item.key 
                                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25" 
                                : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-100/50 dark:hover:bg-purple-900/30"
                            }`}
                            aria-pressed={filter === item.key}
                          >
                            <span className="text-sm">{item.emoji}</span>
                            <span>{item.label}</span>
                          </button>
                        ))}
                      </div>

                      {/* Enhanced clear button */}
                      <button
                        onClick={clearUiState}
                        className="px-4 py-2 text-sm font-medium rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-red-200 dark:focus:ring-red-800 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-red-500/25 flex items-center gap-2"
                        title="Clear all tasks, search & filter"
                      >
                        <span>🗑️</span>
                        <span>Clear All</span>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

          <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              {/* Enhanced Task List Header */}
              <div className="relative p-4 rounded-2xl bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📝</span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Task List</h3>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30">
                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                      {filteredTasks.length} shown
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                      {tasks.length} total
                    </span>
                  </div>
                </div>
              </div>

              {/* Enhanced Task Input Container */}
              <div className="relative p-6 rounded-3xl bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl"></div>
                <div className="relative z-10">
                  <TaskInput />
                </div>
              </div>

              {/* Enhanced Task Cards Container */}
              <div className="space-y-4">
                {filteredTasks.length === 0 ? (
                  <div className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-50/80 to-gray-100/80 dark:from-gray-800/80 dark:to-gray-900/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-lg text-center">
                    <div className="text-6xl mb-4">🔍</div>
                    <h4 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">No tasks found</h4>
                    <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter to find what you're looking for!</p>
                  </div>
                ) : (
                  filteredTasks.map((t) => (
                    <TaskCard key={t.id} id={t.id} title={t.title} description={t.description} completed={t.completed} />
                  ))
                )}
              </div>
            </div>

            <aside className="space-y-6">
              {/* Enhanced Quick Stats */}
              <div className="relative p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-700/50 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">📊</span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">Quick Stats</h4>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">✅</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</span>
                      </div>
                      <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                        {tasks.filter((t) => t.completed).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">📋</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total</span>
                      </div>
                      <span className="text-lg font-bold text-purple-600 dark:text-purple-400">
                        {tasks.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-white/50 dark:bg-gray-800/50">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">🎯</span>
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rate</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {tasks.length > 0 ? Math.round((tasks.filter((t) => t.completed).length / tasks.length) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enhanced Projects */}
              <div className="relative p-6 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-200/50 dark:border-purple-700/50 shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">📁</span>
                    <h4 className="text-lg font-bold text-gray-900 dark:text-gray-100">Projects</h4>
                  </div>
                  <div className="space-y-3">
                    {[
                      { name: "Portfolio", emoji: "💼", color: "from-blue-500 to-cyan-500" },
                      { name: "Personal", emoji: "🏠", color: "from-purple-500 to-pink-500" },
                      { name: "Work", emoji: "💻", color: "from-emerald-500 to-teal-500" }
                    ].map((project, index) => (
                      <div key={index} className="group flex items-center gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 cursor-pointer">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${project.color} flex items-center justify-center text-white text-sm`}>
                          {project.emoji}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            {project.name}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {Math.floor(Math.random() * 8) + 2} tasks
                          </div>
                        </div>
                        <div className="text-xs text-gray-400 group-hover:text-purple-500 transition-colors duration-300">
                          →
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </section>
            </>
          ) : (
            <Analytics />
          )}
        </main>
      </div>
    </div>
  );
}
