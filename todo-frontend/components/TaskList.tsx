"use client";

import { TaskItem } from "./TaskItem";

type Task = {
  id: number;
  title: string;
  done: boolean;
  priority: number;
  due_date: string;
};

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
};

export function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return <div className="text-center text-muted-foreground">No tasks</div>;
  }

  return (
    <div className="space-y-3">
      {tasks.map((t) => (
        <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} />
      ))}
    </div>
  );
}
