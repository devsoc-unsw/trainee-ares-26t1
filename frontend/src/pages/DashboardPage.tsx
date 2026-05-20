import { BaseMenu } from "../components/menu/BaseMenu";
import WoodContainer from "../components/WoodContainer";
import { useEffect } from "react";
import GameMap from "../components/map/GameMap";
import KeyHint from "../components/KeyHint";
import { useUser } from "../context/UserContext";
import { useGameState } from "../context/GameStateContext";
import { getDayDiff } from "../utils/player";

const DashboardPage = () => {
  const { menuOpen, setMenuOpen, toggleMenu, mode } = useGameState();

  const { activeUser, user } = useUser();

  const daysSimulated = getDayDiff(user.currentDate, activeUser.currentDate);

  console.log("user:", activeUser);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // tab only works in play mode
      if (event.code === "Tab" && mode === "play") {
        event.preventDefault();
        toggleMenu();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleMenu, mode]);

  return (
    <div className="relative flex flex-col min-h-screen min-w-screen">
      {/*MAP (leave here to put it under all ui elements) */}
      <div className="w-full h-full absolute inset-0 overflow-hidden">
        <GameMap />
      </div>

      {/* TOP BAR */}
      <div className="sticky top-0 w-full md:px-20 px-10 py-5 relative">
        {/* HELP TEXT */}
        <div className="flex flex-col gap-2">
          {mode === "play" && (
            <>
              <KeyHint keyName="Tab" action="to toggle menu" />
              <KeyHint keyName="w, a, s, d" action="to move" />
            </>
          )}

          {mode === "decorate" && (
            <>
              <KeyHint keyName="Q" action="to put away item" />
              <KeyHint keyName="Enter" action="to save" />
              <KeyHint keyName="Esc" action="to cancel" />
            </>
          )}
        </div>

        {/* SIMULATED DAYS */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-50">
          <div
            className="flex flex-col items-center text-sm text-amber-200"
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            <span className="opacity-70">time</span>

            <span className="font-mono">
              {new Date(user.currentDate).toDateString()} →{" "}
              {new Date(activeUser.currentDate).toDateString()}
            </span>

            <span className="text-amber-400">
              ({daysSimulated} day{daysSimulated === 1 ? "" : "s"})
            </span>
          </div>
        </div>

        {/* MONEY */}
        <div className="absolute top-5 right-10 md:right-20">
          <WoodContainer>
            <div className="flex flex-row w-24 h-10 items-center justify-between px-3">
              <p className="text-xl">$</p>
              <p className="text-xl tabular-nums font-mono">
                {activeUser.money}
              </p>
            </div>
          </WoodContainer>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-row mt-5 w-screen pt-20">
        {/* MENU BUTTON */}
        {mode === "play" && !menuOpen && (
          <button
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20"
            onClick={() => setMenuOpen(true)}
          >
            <WoodContainer>
              <div className="flex items-center justify-center h-[50vh] w-[4vw] min-w-[50px]">
                <p className="rotate-90 text-2xl whitespace-nowrap">MENU</p>
              </div>
            </WoodContainer>
          </button>
        )}

        {/* BASE MENU */}
        {mode === "play" && menuOpen && <BaseMenu />}
      </div>
    </div>
  );
};

export default DashboardPage;
