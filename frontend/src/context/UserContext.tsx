// UserContext.tsx

import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/UserTypes";
import { DUMMY_LAYERS } from "../types/MapTypes";

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  updateMoney: (amount: number) => void;
  updateLayers: (layers: User["layers"]) => void;
}

const defaultUser: User = {
  id: "u1",
  email: "alex@example.com",
  money: 500,
  sprite: "orange",

  layers: DUMMY_LAYERS,

  inventory: [
    { tileId: 1, count: 2 },
    { tileId: 100, count: 1 },
    { tileId: 102, count: 3 },
    { tileId: 104, count: 1 },
  ],

  tasks: [
    {
      id: "t1",
      type: "Daily",
      name: "Feed cat",
      amount: 5,
    },
    {
      id: "t2",
      type: "Weekly",
      name: "Clean room",
      amount: 25,
      dayOfWk: 1,
      deadline: "2026-05-24T13:29:43.871Z",
    },
    {
      id: "t3",
      type: "Custom",
      name: "Finish project",
      amount: 40,
      difficulty: "Hard",
      deadline: "2026-05-25T10:00:00.000Z",
    },
  ],

  debtStartDate: null,
};

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);

  const updateMoney = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      money: prev.money + amount,
    }));
  };

  const updateLayers = (layers: User["layers"]) => {
    setUser((prev) => ({
      ...prev,
      layers,
    }));
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateMoney, updateLayers }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used inside UserProvider");
  return ctx;
}
