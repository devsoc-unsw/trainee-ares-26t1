import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { DEFAULT_USER, type User } from "../types/UserTypes";
import { fetchUser } from "../api/api";

interface UserContextType {
  user: User;

  // UI should use this
  activeUser: User;

  setUser: React.Dispatch<React.SetStateAction<User>>;

  updateMoney: (amount: number) => void;

  updateLayers: (layers: User["layers"]) => Promise<void>;
  updateInventory: (inventory: User["inventory"]) => Promise<void>;

  simulateDays: (days: number) => void;
  clearSimulation: () => void;

  simulated: boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: ReactNode }) {
  // REAL backend user
  const [user, setUser] = useState<User>(DEFAULT_USER);

  // TEMP simulated state
  const [simulatedUser, setSimulatedUser] = useState<User | null>(null);

  // everything in UI should use this
  const activeUser = simulatedUser ?? user;

  // ─────────────────────────────────────────────
  // FETCH USER
  // ─────────────────────────────────────────────
  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = (await fetchUser()) as any;

        console.log("fetching user", data);

        setUser(data.user);
      } catch (err) {
        console.error("Failed to fetch user", err);
      }
    };

    loadUser();
  }, []);

  // ─────────────────────────────────────────────
  // MONEY
  // ─────────────────────────────────────────────
  const updateMoney = (amount: number) => {
    setUser((prev) => ({
      ...prev,
      money: prev.money + amount,
    }));
  };

  // ─────────────────────────────────────────────
  // LAYERS
  // ─────────────────────────────────────────────
  const updateLayers = async (layers: User["layers"]) => {
    setUser((prev) => ({
      ...prev,
      layers,
    }));

    try {
      console.log("saving layers", layers);

      // await apiSaveLayers(layers)
    } catch (err) {
      console.error("failed to save layers", err);
    }
  };

  // ─────────────────────────────────────────────
  // INVENTORY
  // ─────────────────────────────────────────────
  const updateInventory = async (inventory: User["inventory"]) => {
    setUser((prev) => ({
      ...prev,
      inventory,
    }));

    try {
      console.log("saving inventory", inventory);

      // await apiSaveInventory(inventory)
    } catch (err) {
      console.error("failed to save inventory", err);
    }
  };

  // ─────────────────────────────────────────────
  // SIMULATION
  // ─────────────────────────────────────────────
  const simulateDays = (days: number) => {
    // continue simulating from already simulated state
    const baseUser = simulatedUser ?? user;

    let updatedUser = structuredClone(baseUser);

    let current = new Date(updatedUser.currentDate);

    for (let i = 0; i < days; i++) {
      current.setDate(current.getDate() + 1);

      let dailyPenalty = 0;

      updatedUser.tasks = updatedUser.tasks.map((task) => {
        // ─── DAILY ─────────────────────
        if (task.type === "Daily") {
          if (!task.completedToday) {
            dailyPenalty += task.amount;
          }

          return {
            ...task,
            completedToday: false,
          };
        }

        // ─── WEEKLY ────────────────────
        if (task.type === "Weekly") {
          const dueToday = task.dayOfWk === current.getDay();

          if (dueToday && !task.completedToday) {
            dailyPenalty += task.amount;
          }

          return {
            ...task,
            completedToday: false,
          };
        }

        // ─── CUSTOM ────────────────────
        if (task.type === "Custom" && task.deadline) {
          const deadline = new Date(task.deadline);

          // every day overdue = penalty
          const overdue = current > deadline;

          if (overdue && !task.completedToday) {
            dailyPenalty += task.amount;
          }

          return task;
        }

        return task;
      });

      updatedUser.money -= dailyPenalty;
    }

    updatedUser.currentDate = current.toISOString();

    console.log("simulated user", updatedUser);

    // IMPORTANT:
    // only updates temporary simulation state
    setSimulatedUser(updatedUser);
  };

  // ─────────────────────────────────────────────
  // CLEAR SIMULATION
  // ─────────────────────────────────────────────

  const clearSimulation = () => {
    setSimulatedUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        activeUser,
        setUser,

        updateMoney,
        updateLayers,
        updateInventory,

        simulateDays,
        clearSimulation,

        simulated: simulatedUser != null,
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
