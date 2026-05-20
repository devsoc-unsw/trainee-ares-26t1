import { DUMMY_LAYERS, type InventoryItem, type MapLayers } from "./MapTypes";

export interface Task {
  id: string;

  type: "Daily" | "Weekly" | "Custom";

  name: string;
  amount: number;

  dayOfWk?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  deadline?: string;

  completedToday: boolean;

  lastCompletedDate: string | null;
}

export interface User {
  id: string;
  email: string;
  money: number;
  sprite: "black" | "orange" | "waiter";

  layers: MapLayers;

  inventory: InventoryItem[];

  tasks: Task[];

  debtStartDate: string | null;
  currentDate: string;
}

export const DEFAULT_USER: User = {
  id: "u1",
  email: "alex@example.com",
  money: 500,
  sprite: "orange",

  layers: DUMMY_LAYERS,

  inventory: [
    { tileId: 1, count: 2 },
    { tileId: 10, count: 1 },
    { tileId: 12, count: 3 },
    { tileId: 14, count: 1 },
  ],

  tasks: [
    {
      id: "t1",
      type: "Daily",
      name: "Feed cat",
      amount: 5,
      completedToday: false,
      lastCompletedDate: null,
    },
    {
      id: "t2",
      type: "Weekly",
      name: "Clean room",
      amount: 25,
      dayOfWk: 1,
      deadline: "2026-05-24T13:29:43.871Z",
      completedToday: false,
      lastCompletedDate: null,
    },
    {
      id: "t3",
      type: "Custom",
      name: "Finish project",
      amount: 40,
      difficulty: "Hard",
      deadline: "2026-05-25T10:00:00.000Z",
      completedToday: false,
      lastCompletedDate: null,
    },
  ],

  debtStartDate: null,
  currentDate: new Date().toISOString(),
};
