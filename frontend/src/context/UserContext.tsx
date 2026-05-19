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
  sprite: "Black",

  layers: DUMMY_LAYERS,

  inventory: {
    1: 2,
    100: 1,
    102: 3,
    104: 1,
  },

  tasks: [],
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