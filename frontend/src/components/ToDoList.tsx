import { differenceInCalendarDays } from "date-fns";
type ToDoProps = {
  name: string;
  price: number;
  expireDate: Date;
};

const ToDoList = ({ name, price, expireDate }: ToDoProps) => {
  const today = new Date();
  const daysLeft = differenceInCalendarDays(expireDate, today);

  const getDateLabel = () => {
    if (daysLeft === 0) return "Today!";
    if (daysLeft === 1) return "1 day";
    return `${daysLeft} days`;
  };

  return (
    <div className="flex items-center gap-4 w-full">
      <div className="relative bg-theme-brown-light p-4 overflow-visible rounded-2xl shadow-[3px_3px_0px_#3D2B1A] w-full flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <h2 className="text-theme-black break-words min-w-0 flex-1">{name}</h2>
          <h2 className="text-theme-black">&lt;${price}&gt;</h2>
        </div>
      </div>
      <input type="checkbox" className="w-5 h-5" />
      <h2 className={`text-2xl ${daysLeft <= 0 ? "text-red-500" : "text-theme-black"}`}>{getDateLabel()}</h2>
    </div>
  );
};

export default ToDoList;