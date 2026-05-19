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
  mode: GameMode;
  setMode: (m: GameMode) => void;

  menuOpen: boolean;
  setMenuOpen: (v: boolean) => void;
  toggleMenu: () => void;
}

const GameStateContext = createContext<GameState | null>(null);

// NOT for user data!!!!! this is for game things like what 'mode we r in etc.'
// if you want user data, that is UserContext !!!!
export const GameStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState<GameMode>("play");
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((v) => !v);

  return (
    <GameStateContext.Provider
      value={{
        mode,
        setMode,
        menuOpen,
        setMenuOpen,
        toggleMenu,
      }}
    >
      {children}
    </GameStateContext.Provider>
  );
};

export const useGameState = () => {
  const ctx = useContext(GameStateContext);
  if (!ctx) throw new Error("useGameState must be used inside provider");
  return ctx;
};
