import { useState } from "react";

interface AddTaskMenuProps {
  onBack: () => void;
}

type TaskType = "daily" | "weekly" | "custom";

type TaskDifficulty = "easy" | "medium" | "hard";

const CustomComponent = () => {
  const [difficulty, setDifficulty] = useState<TaskDifficulty>();
  return (
    <div className="flex flex-col">
      <label>difficulty</label>
      <div className="flex flex-row justify-between">
        <button
          onClick={() => setDifficulty("easy")}
          className="flex items-center rounded-xl bg-theme-brown-light text-black h-[5vh] p-3"
        >
          easy
        </button>
        <button
          onClick={() => setDifficulty("medium")}
          className="flex items-center rounded-xl bg-theme-brown-light text-black h-[5vh] p-3"
        >
          medium
        </button>
        <button
          onClick={() => setDifficulty("hard")}
          className="flex items-center rounded-xl bg-theme-brown-light text-black h-[5vh] p-3"
        >
          hard
        </button>
      </div>
      <label>deadline</label>
      <input
        type="text"
        className="bg-theme-brown-light rounded-xl
                                w-[20vw]
                                px-2
                                py-1"
      />
    </div>
  );
};

export const AddTaskMenu = ({ onBack }: AddTaskMenuProps) => {
  const [Task, setTask] = useState<TaskType>();

  return (
    <div>
      <form className="flex flex-col gap-2">
        <label className="text-xl">name</label>
        <input
          type="text"
          className="bg-theme-brown-light rounded-xl
                                w-[20vw]
                                px-2
                                py-1"
        />
        <label className="text-xl">type</label>
        <div className="flex flex-row justify-between">
          <button
            onClick={() => setTask("daily")}
            className="flex items-center rounded-xl bg-theme-brown-light text-black h-[5vh] p-3"
          >
            daily
          </button>
          <button
            onClick={() => setTask("weekly")}
            className="flex items-center rounded-xl bg-theme-brown-light text-black h-[5vh] p-3"
          >
            weekly
          </button>
          <button
            onClick={() => setTask("custom")}
            className="flex items-center rounded-xl bg-theme-brown-light text-black h-[5vh] p-3"
          >
            custom
          </button>
        </div>
        {Task == "custom" && <CustomComponent />}

        <div className="flex items-center gap-2 justify-center">
          <button
            onSubmit={() => setTask("custom")}
            className="flex justify-center items-center h-[5vh] w-[8vw] text-black rounded-xl bg-theme-yellow"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskMenu;
