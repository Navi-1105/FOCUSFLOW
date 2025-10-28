// src/store/taskStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

type TaskStore = {
  tasks: Task[];
  addTask: (title: string, description?: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearAll: () => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [
        {
          id: "t1",
          title: "Finish README & demo GIF",
          description: "Add screenshots and demo video.",
          completed: false,
        },
        {
          id: "t2",
          title: "Implement auth",
          description: "Wire Supabase auth (email + OAuth).",
          completed: false,
        },
        {
          id: "t3",
          title: "Add analytics",
          description: "Daily completed tasks chart.",
          completed: true,
        },
      ],

      addTask: (title, description) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            { id: Date.now().toString(), title, description, completed: false },
          ],
        })),

      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      clearAll: () =>
        set(() => ({
          tasks: [],
        })),
    }),
    {
      name: "focusflow-tasks", // localStorage key
      version: 1,
      // optional: you can serialize/deserialize for custom behavior
      // serialize: (state) => JSON.stringify(state),
      // deserialize: (str) => JSON.parse(str),
    }
  )
);
