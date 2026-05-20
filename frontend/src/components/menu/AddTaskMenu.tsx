import { useState } from "react";
import { useUser } from "../../context/UserContext";

interface AddTaskMenuProps {
  onBack: () => void;
}

type TaskType = "daily" | "weekly" | "custom";
type TaskDifficulty = "easy" | "medium" | "hard";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const inputClass = "bg-theme-brown-light rounded-xl w-full px-2 py-1";
const btnClass = "flex items-center rounded-xl bg-theme-brown-light text-black h-[5vh] p-3";
const activeBtnClass = "flex items-center rounded-xl bg-theme-yellow text-black h-[5vh] p-3";

export const AddTaskMenu = ({ onBack }: AddTaskMenuProps) => {
  const [name, setName] = useState("");
  const [taskType, setTaskType] = useState<TaskType | null>(null);
  const [difficulty, setDifficulty] = useState<TaskDifficulty>("easy");
  const [dayOfWeek, setDayOfWeek] = useState<number>(1);
  const [deadline, setDeadline] = useState("");
  const {addTask} = useUser();

  const handleTypeSelect = (type: TaskType) => {
    setTaskType(type);
    if (type === "daily") setDifficulty("easy");
    if (type === "weekly") setDifficulty("medium");
  };

  const handleSave = async () => {
  if (!taskType || !name.trim()) return;
  console.log("sending payload:", { name, type: taskType, difficulty, deadline, dayOfWeek });
  if (taskType === "daily") {
    await addTask({ name, type: "Daily" });
  } else if (taskType === "weekly") {
    await addTask({ name, type: "Weekly", dayOfWk: dayOfWeek });
  } else if (taskType === "custom") {
    await addTask({ name, type: "Custom", difficulty, deadline });
  }

  onBack();
};

  return (
    <div className="flex flex-col gap-3 w-[280px] min-h-[400px]">
    <div className="flex flex-col gap-3">
      {/* Name */}
      <label className="text-xl">name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={inputClass}
      />

      {/* Type */}
      <label className="text-xl">type</label>
      <div className="flex flex-row justify-between gap-2">
        {(["daily", "weekly", "custom"] as TaskType[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTypeSelect(t)}
            className={taskType === t ? activeBtnClass : btnClass}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Daily — no extra fields, just show a note */}
      {taskType === "daily" && (
        <p className="text-sm opacity-60">repeats every day · difficulty: easy</p>
      )}

      {/* Weekly */}
      {taskType === "weekly" && (
        <div className="flex flex-col gap-2">
          <label>day of week</label>
          <div className="flex flex-wrap gap-1">
            {DAYS.map((day, i) => (
              <button
                key={day}
                type="button"
                onClick={() => setDayOfWeek(i)}
                className={dayOfWeek === i ? activeBtnClass : btnClass}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
          <p className="text-sm opacity-60">difficulty: medium</p>
        </div>
      )}

      {/* Custom */}
      {taskType === "custom" && (
        <div className="flex flex-col gap-2">
          <label>difficulty</label>
          <div className="flex flex-row gap-2">
            {(["easy", "medium", "hard"] as TaskDifficulty[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDifficulty(d)}
                className={difficulty === d ? activeBtnClass : btnClass}
              >
                {d}
              </button>
            ))}
          </div>

          <label>deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className={inputClass}
          />
        </div>
      )}

      {/* Save */}
      {taskType && (
        <button
          type="button"
          onClick={handleSave}
          className="flex justify-center items-center h-[5vh] w-full text-black rounded-xl bg-theme-yellow mt-2"
        >
          Save
        </button>
      )}
    </div>
    </div>
  );
};

export default AddTaskMenu;