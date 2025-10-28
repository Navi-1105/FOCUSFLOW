import React, { useState } from "react";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("dashboard");

  return (
    <nav aria-label="Sidebar" className="h-full p-6 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-50"></div>
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-8 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-32 right-6 w-1 h-1 bg-pink-400 rounded-full animate-pulse opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-12 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse opacity-50" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-48 right-10 w-1 h-1 bg-emerald-400 rounded-full animate-pulse opacity-30" style={{animationDelay: '0.5s'}}></div>
      </div>

      <div className="relative z-10">
        {/* User profile section */}
        <div className="mb-8 p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-200/30 dark:border-purple-700/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative">
              <img 
                src="https://api.dicebear.com/6.x/initials/svg?seed=Navneet&backgroundColor=8b5cf6,f3e8ff" 
                alt="avatar" 
                className="w-10 h-10 rounded-xl border-2 border-purple-300 dark:border-purple-600" 
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white dark:border-gray-900 animate-pulse"></div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-gray-100">Navneet</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Productivity Master</div>
            </div>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-gray-800/50 rounded-lg px-2 py-1">
            🎯 Focus streak: 5 days
          </div>
        </div>

        {/* Navigation sections */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
            <span>📋</span>
            <span>Overview</span>
          </div>
          <ul className="space-y-2">
            {[
              { id: "dashboard", icon: "🏠", label: "Dashboard", active: true },
              { id: "analytics", icon: "📊", label: "Analytics", active: false },
              { id: "projects", icon: "📁", label: "Projects", active: false },
              { id: "calendar", icon: "📅", label: "Calendar", active: false }
            ].map((item) => (
              <li key={item.id}>
                <a 
                  href="#" 
                  className={`group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                    item.active 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25' 
                      : 'hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 dark:hover:from-purple-900/30 dark:hover:to-pink-900/30 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400'
                  }`}
                  onClick={() => setActiveItem(item.id)}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.active && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick actions */}
        <div className="mb-8">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider flex items-center gap-2">
            <span>⚡</span>
            <span>Quick Actions</span>
          </div>
          <ul className="space-y-2">
            <li>
              <button className="w-full group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-emerald-100 hover:to-green-100 dark:hover:from-emerald-900/30 dark:hover:to-green-900/30 text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300">
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">✨</span>
                <span className="text-sm font-medium">New Task</span>
              </button>
            </li>
            <li>
              <button className="w-full group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-100 hover:to-cyan-100 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300">
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">📋</span>
                <span className="text-sm font-medium">Templates</span>
              </button>
            </li>
            <li>
              <button className="w-full group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gradient-to-r hover:from-orange-100 hover:to-red-100 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-300">
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">🎯</span>
                <span className="text-sm font-medium">Focus Mode</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Productivity stats */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-sm border border-emerald-200/30 dark:border-emerald-700/30">
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider flex items-center gap-2">
            <span>📈</span>
            <span>Today's Progress</span>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Tasks Done</span>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">8/12</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full transition-all duration-1000" style={{width: '67%'}}></div>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              🎉 Almost there! Keep going!
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
