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
  createTask as apiCreateTask,
  completeTask as apiCompleteTask,
  fetchUser,
  type User,
  type CreateTaskPayload,
} from "../api/api";

import { useNavigate } from "react-router-dom";
import { getDebtDays } from "../utils/player";

interface UserContextType {
  loadUser: () => Promise<void>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

  updateMoney: (amount: number) => Promise<void>;
  saveMap: (
    layers: User["layers"],
    inventory: User["inventory"],
  ) => Promise<void>;
  buyItem: (id: number) => Promise<void>;
  addTask: (payload: CreateTaskPayload) => Promise<void>;
  completeTask: (id: string) => Promise<void>;

  simulateDays: (
    days: number,
    onEviction?: () => void,
    onNuke?: () => void
  )  => void;
  
  clearSimulation: () => void;
  simulated: boolean;
  currentDate: string;
  activeDate: Date;
  isLoading: boolean;
  debtStartDate: string | null;
  debtDays: number;
}

const UserContext = createContext<UserContextType | null>(null);
export function UserProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [realUser, setRealUser] = useState<User | null>(null);
  const [simulatedUser, setSimulatedUser] = useState<User | null>(null);
  const [simulatedCurrentDate, setSimulatedCurrentDate] = useState<Date | null>(
    null,
  );
  const [currentDate] = useState<string>(new Date().toISOString());
  const [simulatedDays, setSimulatedDays] = useState(0);
  const [debtStartDate, setDebtStartDate] = useState<string | null>(null);
  const [simDebtDays, setSimDebtDays] = useState(0);


  const user = simulatedUser ?? realUser;
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
      setRealUser(null);
      setDebtStartDate(null);
      const data = await fetchUser();
      setRealUser(data);
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

const syncDebt = (money: number) => {
  if (money < 0 && !debtStartDate) {
    setDebtStartDate(new Date().toISOString());
  } else if (money >= 0 && debtStartDate) {
    setDebtStartDate(null);
  }
};


const updateMoney = async (amount: number) => {
  if (!realUser) return;
  const newMoney = realUser.money + amount;
  syncDebt(newMoney);
  setRealUser(prev => prev ? { ...prev, money: newMoney } : null);
  try {
    await apiUpdateUser({ money: newMoney });
  } catch (err) {
    console.error("failed to save money", err);
  }
};


  const saveMap = async (
    layers: User["layers"],
    inventory: User["inventory"],
  ) => {
    if (!realUser) return;
    setRealUser((prev) => (prev ? { ...prev, layers, inventory } : null));
    try {
      await apiUpdateUser({ layers, inventory });
    } catch (err) {
      console.error("failed to save map", err);
    }
  };

  const buyItem = async (id: number) => {
    const tile = TILE_TYPES[id];
    if (!tile) return;
    if (!realUser || realUser.money < tile.price) {
      console.warn("Not enough money or user not loaded");
      return;
    }
    try {
      const updatedUser = await apiBuyItem(id);
      setRealUser(updatedUser);
    } catch (err) {
      console.error("buyItem failed", err);
    }
  };

  const addTask = async (payload: CreateTaskPayload) => {
    if (!realUser) return;
    try {
      const newTask = await apiCreateTask(payload);
      setRealUser((prev) =>
        prev ? { ...prev, tasks: [...prev.tasks, newTask] } : null,
      );
    } catch (err) {
      console.error("failed to create task", err);
    }
  };

const completeTask = async (id: string) => {
  if (!realUser) return;
  try {
    const updatedUser = await apiCompleteTask(id);
    syncDebt(updatedUser.money);  // just sync debt from returned money
    setRealUser(updatedUser);
  } catch (err) {
    console.error("failed to complete task", err);
  }
};

const simulateDays = (
  days: number,
  onEviction?: () => void,
  onNuke?: () => void
) => {
  if (!realUser) return;
  if (days === 0) {
    clearSimulation();
    return;
  }

  const totalDays = simulatedDays + days;
  const baseDate = new Date(currentDate);
  let money = realUser.money;
  let current = new Date(baseDate);
  let simDebtStart = debtStartDate ? new Date(debtStartDate) : null;

  for (let i = 0; i < totalDays; i++) {
    current.setDate(current.getDate() + 1);
    let dailyPenalty = 0;

    realUser.tasks.forEach((task) => {
      switch (task.type) {
        case "Daily":
          dailyPenalty += task.amount;
          break;
        case "Weekly":
          if (task.dayOfWk === current.getDay()) dailyPenalty += task.amount;
          break;
        case "Custom":
          if (task.deadline && current > new Date(task.deadline))
            dailyPenalty += task.amount;
          break;
      }
    });

    money -= dailyPenalty;

    // track when debt starts during simulation
    if (money < 0 && !simDebtStart) {
      simDebtStart = new Date(current);
    } else if (money >= 0) {
      simDebtStart = null;
    }
  }

  const simDebtDaysupdated = simDebtStart
    ? Math.floor((current.getTime() - simDebtStart.getTime()) / 86400000)
    : 0;

  if (money < 0 && simDebtDaysupdated >= 7) onNuke?.();
  else if (money < 0) onEviction?.();

  setSimDebtDays(simDebtDaysupdated);
  setSimulatedDays(totalDays);
  setSimulatedUser({ ...structuredClone(realUser), money });
  setSimulatedCurrentDate(current);
};

  const clearSimulation = () => {
    setSimulatedUser(null);
    setSimulatedCurrentDate(null);
    setSimulatedDays(0);
    setSimDebtDays(0);
  };

  return (
    <UserContext.Provider
      value={{
        loadUser,
        user, // exposes activeUser as user
        setUser: setRealUser, // writes always go to real user
        updateMoney,
        saveMap,
        buyItem,
        addTask,
        completeTask,
        simulateDays,
        clearSimulation,
        simulated: simulatedUser != null,
        currentDate,
        activeDate,
        isLoading,
        debtStartDate,
        debtDays: simulatedUser != null ? simDebtDays : getDebtDays(debtStartDate),
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
