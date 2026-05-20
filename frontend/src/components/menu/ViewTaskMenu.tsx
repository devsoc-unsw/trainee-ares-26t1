import { useState } from "react";
import { useUser } from "../../context/UserContext";
import type { Task } from "../../api/api";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const isOverdue = (task: Task) =>
  task.deadline ? new Date(task.deadline) < new Date() : false;

const deadlineLabel = (task: Task): string | null => {
  if (task.type === "Weekly" && task.dayOfWk !== undefined)
    return `every ${DAYS[task.dayOfWk]}`;
  if (!task.deadline) return null;
  const diff = Math.round(
    (new Date(task.deadline).getTime() - Date.now()) / 86400000,
  );
  if (diff < 0) return `overdue by ${Math.abs(diff)}d`;
  if (diff === 0) return "due today";
  return `due in ${diff}d`;
};

const typeBadge: Record<string, string> = {
  Daily: "bg-blue-100 text-blue-800",
  Weekly: "bg-purple-100 text-purple-800",
  Custom: "bg-amber-100 text-amber-800",
};

const diffBadge: Record<string, string> = {
  easy: "bg-green-100 text-green-800",
  medium: "bg-amber-100 text-amber-800",
  hard: "bg-red-100 text-red-800",
};

export const ViewTasksMenu = () => {
  const { user, completeTask } = useUser();
  const tasks = (user!.tasks ?? []) as Task[];

  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [typeFilter, setTypeFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");
  const [sort, setSort] = useState("none");
  const [search, setSearch] = useState("");

  const toggle = async (id: number) => {
    await completeTask(id.toString());
  };

  const isCompletedToday = (task: Task) => {
    if (!task.lastCompleted) return false;
    const last = new Date(task.lastCompleted);
    const today = new Date();
    return last.toDateString() === today.toDateString();
  };

  const filtered = tasks
    .filter((t) => !isCompletedToday(t))
    .filter((t) => typeFilter === "all" || t.type === typeFilter)
    .filter((t) => diffFilter === "all" || t.difficulty === diffFilter)
    .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "deadline")
        return (
          new Date(a.deadline ?? 0).getTime() -
          new Date(b.deadline ?? 0).getTime()
        );
      if (sort === "amount") return b.amount - a.amount;
      if (sort === "name") return a.name.localeCompare(b.name);
      return 0;
    });

  const selectClass =
    "bg-theme-brown-light text-black text-sm rounded-xl px-3 py-1 h-8 outline-none";

  return (
    <div className="flex flex-col gap-3 w-[320px]">
      {/* search */}
      <input
        type="text"
        placeholder="search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-theme-brown-light rounded-xl px-3 py-1 text-sm text-black w-full outline-none"
      />

      {/* filters + sort */}
      <div className="flex gap-2 flex-wrap">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className={selectClass}
        >
          <option value="all">types</option>
          <option value="Daily">daily</option>
          <option value="Weekly">weekly</option>
          <option value="Custom">custom</option>
        </select>

        <select
          value={diffFilter}
          onChange={(e) => setDiffFilter(e.target.value)}
          className={selectClass}
        >
          <option value="all">difficulties</option>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className={selectClass}
        >
          <option value="none">sort by...</option>
          <option value="deadline">deadline</option>
          <option value="amount">reward ↓</option>
          <option value="name">name</option>
        </select>
      </div>

      {/* count */}
      <p className="text-xs opacity-60">
        {filtered.length} task{filtered.length !== 1 ? "s" : ""}
      </p>

      {/* list */}
      <div className="flex flex-col gap-2 max-h-1/2 overflow-y-auto pr-1">
        {filtered.length === 0 && (
          <p className="text-sm opacity-50 text-center py-4">no tasks found</p>
        )}

        {filtered.map((task) => {
          const done = checked.has(task.id);
          const overdue = isOverdue(task);
          const dlLabel = deadlineLabel(task);

          return (
            <div
              key={task.id}
              onClick={() => toggle(task.id)}
              className={`flex items-start gap-3 p-3 rounded-xl bg-theme-brown-light cursor-pointer transition-opacity ${done ? "opacity-40" : ""}`}
            >
              {/* checkbox */}
              <div
                className={`mt-0.5 w-4 h-4 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
                  done
                    ? "bg-green-500 border-green-500"
                    : "border-gray-400 bg-transparent"
                }`}
              >
                {done && (
                  <svg
                    viewBox="0 0 10 8"
                    className="w-2.5 h-2.5 stroke-white fill-none stroke-2"
                  >
                    <polyline points="1,4 4,7 9,1" />
                  </svg>
                )}
              </div>

              {/* content */}
              <div className="flex flex-col gap-1 min-w-0">
                <p
                  className={`text-sm font-medium text-black leading-tight ${done ? "line-through" : ""}`}
                >
                  {task.name}
                </p>

                <div className="flex flex-wrap gap-1 items-center">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeBadge[task.type]}`}
                  >
                    {task.type.toLowerCase()}
                  </span>

                  {task.difficulty && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${diffBadge[task.difficulty]}`}
                    >
                      {task.difficulty}
                    </span>
                  )}

                  {overdue && (
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-red-100 text-red-800">
                      overdue
                    </span>
                  )}

                  {dlLabel && (
                    <span
                      className={`text-xs ${overdue ? "text-red-600 font-medium" : "opacity-60 text-black"}`}
                    >
                      {dlLabel}
                    </span>
                  )}

                  <span className="text-xs opacity-50 text-black">
                    +${task.amount}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ViewTasksMenu;
