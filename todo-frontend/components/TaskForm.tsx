"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TaskFormProps = {
  onCreate: (title: string, priority: number, dueDate: string) => void;
};

export function TaskForm({ onCreate }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(5);
  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState<string | null>(null);

  const submit = () => {
    if (!title.trim()) {
      setError("Task name is required");
      return;
    }

    if (priority < 1 || priority > 10) {
      setError("Priority must be between 1 and 10");
      return;
    }

    if (!dueDate) {
      setError("Due date is required");
      return;
    }

    setError(null);
    onCreate(title, priority, dueDate);

    setTitle("");
    setDueDate("");
    setPriority(5);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-3 items-end">
        <div className="flex flex-col">
          <label className="text-xs text-muted-foreground">Task</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task..."
            className="w-[320px]"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-muted-foreground">Priority</label>
          <Input
            type="number"
            value={priority}
            min={1}
            max={10}
            onChange={(e) => setPriority(Number(e.target.value))}
            className="w-24"
            placeholder="1–10"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-xs text-muted-foreground">Due</label>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-40"
          />
        </div>

        <Button onClick={submit} className="h-[40px]">
          Add
        </Button>
      </div>

      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  );
}
