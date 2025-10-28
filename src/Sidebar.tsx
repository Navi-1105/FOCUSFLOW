import React from "react";

export default function Sidebar() {
  return (
    <nav aria-label="Sidebar" className="h-full p-4">
      <div className="mb-6">
        <div className="text-sm text-gray-500 mb-2">Overview</div>
        <ul className="space-y-1">
          <li>
            <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="w-6 text-center">🏠</span>
              <span className="text-sm">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="w-6 text-center">📊</span>
              <span className="text-sm">Analytics</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="w-6 text-center">📁</span>
              <span className="text-sm">Projects</span>
            </a>
          </li>
        </ul>
      </div>

      <div>
        <div className="text-sm text-gray-500 mb-2">Quick actions</div>
        <ul className="space-y-1">
          <li>
            <button className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">+ New Task</button>
          </li>
          <li>
            <button className="w-full text-left px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">Templates</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
