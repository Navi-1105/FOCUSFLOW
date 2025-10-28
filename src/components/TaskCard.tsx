import React, { useState } from "react";
import { useTaskStore } from "../store/taskStore";

type Props = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

export default function TaskCard({ id, title, description, completed }: Props) {
  const toggleTask = useTaskStore((s) => s.toggleTask);
  const deleteTask = useTaskStore((s) => s.deleteTask);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
      className={`group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
        completed 
          ? 'bg-gradient-to-br from-emerald-50/50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/20 border border-emerald-200/50 dark:border-emerald-700/50 opacity-75' 
          : 'bg-gradient-to-br from-white/80 to-gray-50/80 dark:from-gray-800/80 dark:to-gray-900/80 border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className={`absolute inset-0 transition-opacity duration-300 ${
        completed 
          ? 'bg-gradient-to-br from-emerald-500/10 to-green-500/10 opacity-0 group-hover:opacity-100'
          : 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100'
      }`}></div>
      
      <div className="relative z-10 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {/* Enhanced checkbox */}
            <button
              onClick={() => toggleTask(id)}
              className={`mt-1 w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                completed 
                  ? 'bg-gradient-to-br from-emerald-500 to-green-500 border-emerald-500 text-white shadow-lg shadow-emerald-500/25' 
                  : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20'
              }`}
              aria-label={completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {completed && (
                <span className="text-sm font-bold animate-pulse">✓</span>
              )}
            </button>
            
            <div className="flex-1 space-y-2">
              <h4 className={`font-semibold text-lg transition-all duration-300 ${
                completed 
                  ? 'line-through text-gray-500 dark:text-gray-400' 
                  : 'text-gray-900 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-purple-400'
              }`}>
                {title}
              </h4>
              {description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Time estimate with emoji */}
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-400">
              <span>⏱️</span>
              <span>2h</span>
            </div>
            
            {/* Enhanced delete button */}
            <button
              onClick={() => deleteTask(id)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                isHovered 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-500 hover:bg-red-200 dark:hover:bg-red-900/50' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
              aria-label="Delete task"
            >
              <span className="text-lg font-bold">×</span>
            </button>
          </div>
        </div>
        
        {/* Progress indicator for completed tasks */}
        {completed && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Completed! 🎉</span>
          </div>
        )}
      </div>
    </article>
  );
}
