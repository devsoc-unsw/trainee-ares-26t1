import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { TILE_TYPES } from "../types/MapTypes";
import {
  buyItem as apiBuyItem,
  updateUser as apiUpdateUser,
  fetchUser,
  type User,
} from "../api/api";

import { useNavigate } from "react-router-dom";

interface UserContextType {
  loadUser: () => Promise<void>;
  user: User | null;
  activeUser: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  updateMoney: (amount: number) => void;
  saveMap: (
    layers: User["layers"],
    inventory: User["inventory"],
  ) => Promise<void>;

  buyItem: (id: number) => Promise<void>;

  simulateDays: (days: number) => void;
  clearSimulation: () => void;
  simulated: boolean;
  currentDate: string;
  activeDate: Date;

  isLoading: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [simulatedUser, setSimulatedUser] = useState<User | null>(null);
  const [simulatedCurrentDate, setSimulatedCurrentDate] = useState<Date | null>(
    null,
  );
  const [currentDate, setCurrentDate] = useState<string>(
    new Date().toISOString(),
  );

  const activeUser = simulatedUser ?? user;
  const activeDate = simulatedCurrentDate ?? new Date(currentDate);

  const navigate = useNavigate();

  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setUser(null);
      const data = await fetchUser();
      setUser(data);
    } catch (err) {
      console.error("Failed to load user", err);
      localStorage.removeItem("token");
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const updateMoney = async (amount: number) => {
    if (!user) return;
    const newMoney = user.money + amount;

    setUser((prev) => (prev ? { ...prev, money: newMoney } : null));

    try {
      await apiUpdateUser({ money: newMoney });
    } catch (err) {
      console.error("failed to save money", err);
    }
  };

  // ─────────────────────────────────────────────
  // SIMULATION
  // ─────────────────────────────────────────────
  const simulateDays = (days: number) => {
    const activeTarget = simulatedUser ?? user;
    if (!activeTarget) return;

    const baseUser = structuredClone(activeTarget);
    const baseDate = new Date(simulatedCurrentDate ?? currentDate);

    let updatedUser = structuredClone(baseUser);
    let current = new Date(baseDate);
    let money = updatedUser.money;

    for (let i = 0; i < days; i++) {
      current.setDate(current.getDate() + 1);
      let dailyPenalty = 0;

      updatedUser.tasks.forEach((task) => {
        switch (task.type) {
          case "Daily":
            dailyPenalty += task.amount;
            break;

          case "Weekly":
            if (task.dayOfWk === current.getDay()) dailyPenalty += task.amount;
            break;

          case "Custom":
            if (task.deadline && current > new Date(task.deadline)) {
              dailyPenalty += task.amount;
            }
            break;
        }
      });

      money -= dailyPenalty;
    }

    updatedUser.money = money;

    setSimulatedUser(updatedUser);
    setSimulatedCurrentDate(current);
  };

  const clearSimulation = () => {
    setSimulatedUser(null);
    setSimulatedCurrentDate(null);
  };

  const buyItem = async (id: number) => {
    const tile = TILE_TYPES[id];
    if (!tile) return;

    const baseUser = simulatedUser ?? user;
    if (!baseUser || baseUser.money < tile.price) {
      console.warn("Not enough money or user not loaded");
      return;
    }

    try {
      const updatedUser = await apiBuyItem(id);
      setUser(updatedUser);
    } catch (err) {
      console.error("buyItem failed", err);
    }
  };

  const saveMap = async (
    layers: User["layers"],
    inventory: User["inventory"],
  ) => {
    if (!user) return;
    setUser((prev) => (prev ? { ...prev, layers, inventory } : null));

    try {
      await apiUpdateUser({ layers, inventory });
    } catch (err) {
      console.error("failed to save map", err);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loadUser,
        user,
        activeUser,
        setUser,

        updateMoney,
        buyItem,

        simulateDays,
        clearSimulation,

        simulated: simulatedUser != null,

        currentDate,
        activeDate,
        isLoading,
        saveMap,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return ctx;
}
