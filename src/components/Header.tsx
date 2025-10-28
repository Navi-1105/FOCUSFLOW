import React, { useState } from "react";

type Props = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: Props) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="relative bg-gradient-to-r from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="md:hidden p-2 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:scale-105"
              aria-label="Open menu"
            >
              <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Logo section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/25">
                  FF
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  FocusFlow
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 -mt-1">✨ Stay focused</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Enhanced search */}
            <div className="relative hidden md:block">
              <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                isSearchFocused 
                  ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-lg scale-105' 
                  : 'bg-gradient-to-r from-purple-500/5 to-pink-500/5 blur-sm'
              }`}></div>
              <input
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="relative z-10 w-64 px-4 py-2 rounded-xl border-2 border-gray-200/50 dark:border-gray-700/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-sm placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-purple-400 dark:focus:border-purple-500 focus:ring-2 focus:ring-purple-100 dark:focus:ring-purple-900/30 transition-all duration-300"
                placeholder="🔍 Search tasks..."
                aria-label="Search tasks"
              />
            </div>

            {/* Notification button */}
            <button
              className="relative p-2 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:scale-105 group"
              aria-label="Notifications"
              title="Notifications"
            >
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* Notification dot */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-red-400 to-pink-500 rounded-full animate-pulse"></div>
            </button>

            {/* Profile section */}
            <button
              className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 hover:scale-105 group"
              aria-label="Profile"
            >
              <div className="relative">
                <img 
                  src="https://api.dicebear.com/6.x/initials/svg?seed=Navneet&backgroundColor=8b5cf6,f3e8ff" 
                  alt="avatar" 
                  className="w-8 h-8 rounded-full border-2 border-purple-200 dark:border-purple-700 group-hover:border-purple-400 dark:group-hover:border-purple-500 transition-colors duration-300" 
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
              </div>
              <div className="hidden sm:flex flex-col items-start">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  Navneet
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Productivity Master</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
