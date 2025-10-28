import React from "react";

type Props = {
  title: string;
  description?: string;
};

export default function TaskCard({ title, description }: Props) {
  return (
    <article className="p-4 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h4 className="font-medium">{title}</h4>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>

        <div className="text-sm text-gray-400">2h</div>
      </div>
    </article>
  );
}
