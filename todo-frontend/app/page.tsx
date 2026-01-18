"use client";

import { useEffect, useMemo, useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";
import { Filters } from "@/components/Filters";

type Task = {
  id: number;
  title: string;
  done: boolean;
  priority: number;
  due_date: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | "done" | "undone">("all");
  const [sort, setSort] = useState<"asc" | "desc">("asc");

  // fetch tasks
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((r) => r.json())
      .then(setTasks);
  }, []);

  // create task
  const createTask = async (
    title: string,
    priority: number,
    due_date: string
  ) => {
    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority, due_date }),
    });
    const task = await res.json();
    setTasks((prev) => [task, ...prev]);
  };

  // toggle done
  const toggleTask = async (id: number, done: boolean) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done }),
    });
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done } : t)));
  };

  // delete task
  const deleteTask = async (id: number) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  // filter + sort
  const filtered = useMemo(() => {
    let arr = [...tasks];

    if (search) {
      arr = arr.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      arr = arr.filter((t) => (status === "done" ? t.done : !t.done));
    }

    arr.sort((a, b) =>
      sort === "asc" ? a.priority - b.priority : b.priority - a.priority
    );

    return arr;
  }, [tasks, search, status, sort]);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">TODO App</h1>

      <TaskForm onCreate={createTask} />

      <div className="my-6">
        <Filters
          search={search}
          status={status}
          sort={sort}
          onSearch={setSearch}
          onStatus={setStatus}
          onSort={setSort}
        />
      </div>

      <TaskList tasks={filtered} onToggle={toggleTask} onDelete={deleteTask} />
    </div>
  );
}
