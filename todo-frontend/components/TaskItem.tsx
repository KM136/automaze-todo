"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

type Task = {
  id: number;
  title: string;
  done: boolean;
  priority: number;
  due_date: string;
};

type TaskItemProps = {
  task: Task;
  onToggle: (id: number, done: boolean) => void;
  onDelete: (id: number) => void;
};

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center justify-between gap-4 p-4 rounded-lg border">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.done}
          onCheckedChange={(val) => onToggle(task.id, !!val)}
        />
        <div>
          <div className="text-lg font-medium">{task.title}</div>
          <div className="text-sm text-muted-foreground">
            Priority: {task.priority}
          </div>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Due: {new Date(task.due_date).toLocaleDateString()}
      </p>
      <Button variant="destructive" onClick={() => onDelete(task.id)}>
        Delete
      </Button>
    </div>
  );
}
