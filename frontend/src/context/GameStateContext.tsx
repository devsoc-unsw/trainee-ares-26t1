import { createContext, useContext, useState } from "react";

type GameMode = "play" | "decorate";

export type MenuView =
  | "main"
  | "settings"
  | "shop"
  | "decorate"
  | "addTask"
  | "viewTask";

interface GameState {
  // ─── mode ─────────────────────────────
  mode: GameMode;
  setMode: (m: GameMode) => void;
  enterDecorateMode: () => void;
  exitDecorateMode: () => void;

  // ─── menu ─────────────────────────────
  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  toggleMenu: () => void;

  // ─── game clock ───────────────────────
  currentTime: Date;
  setCurrentTime: (d: Date) => void;
  advanceDays: (days: number) => void;
  getCurrentTime: () => Date;

  // warning popups
  showEviction: boolean;
  setShowEviction: (val: boolean) => void;
  showNuke: boolean;
  setShowNuke: (val: boolean) => void;
}

const GameStateContext = createContext<GameState | null>(null);

export const GameStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // ─── game mode ───────────────────────
  const [mode, setMode] = useState<GameMode>("play");

  // ─── menu ────────────────────────────
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((v) => !v);

  // ─── simulated game clock ────────────
  const [currentTime, setCurrentTime] = useState(
    new Date("2026-05-20T08:00:00"),
  );

  // popups
  const [showEviction, setShowEviction] = useState(false);
  const [showNuke, setShowNuke] = useState(false);

  const advanceDays = (days: number) => {
    setCurrentTime((prev) => {
      const next = new Date(prev);
      next.setDate(next.getDate() + days);
      return next;
    });
  };

  const getCurrentTime = () => currentTime;

  const enterDecorateMode = () => {
    setMode("decorate");
    setMenuOpen(false);
  };

  const exitDecorateMode = () => {
    setMode("play");
  };

  return (
    <GameStateContext.Provider
      value={{
        mode,
        setMode,
        enterDecorateMode,
        exitDecorateMode,

        menuOpen,
        setMenuOpen,
        toggleMenu,

        currentTime,
        setCurrentTime,

        advanceDays,

        getCurrentTime,
        showEviction,
        setShowEviction,
        showNuke,
        setShowNuke,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const ctx = useContext(GameStateContext);

  if (!ctx) {
    throw new Error("useGameState must be used inside provider");
  }

  return ctx;
};
