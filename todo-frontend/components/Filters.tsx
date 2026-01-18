"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FiltersProps = {
  search: string;
  status: "all" | "done" | "undone";
  sort: "asc" | "desc";
  onSearch: (v: string) => void;
  onStatus: (v: "all" | "done" | "undone") => void;
  onSort: (v: "asc" | "desc") => void;
};

export function Filters({
  search,
  status,
  sort,
  onSearch,
  onStatus,
  onSort,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      <Input
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search tasks..."
      />

      <div className="flex gap-2">
        <Select value={status} onValueChange={(v) => onStatus(v as any)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-background opacity-100">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="done">Done</SelectItem>
            <SelectItem value="undone">Undone</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={(v) => onSort(v as any)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent className="bg-background opacity-100">
            <SelectItem value="asc">Priority ↑</SelectItem>
            <SelectItem value="desc">Priority ↓</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
