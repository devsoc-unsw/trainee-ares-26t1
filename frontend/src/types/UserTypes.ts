import type { InventoryItem, MapLayers } from "./MapTypes";

export interface Task {
  id: string;
  type: "Daily" | "Weekly" | "Custom";
  name: string;
  amount: number;

  dayOfWk?: number;
  difficulty?: "Easy" | "Medium" | "Hard";
  deadline?: string;
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
}
