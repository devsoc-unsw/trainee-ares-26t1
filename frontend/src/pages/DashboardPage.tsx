import { BaseMenu } from "../components/menu/BaseMenu";
import WoodContainer from "../components/WoodContainer";
import { useEffect } from "react";
import GameMap from "../components/map/GameMap";
import KeyHint from "../components/KeyHint";
import { useUser } from "../context/UserContext";
import { useGameState } from "../context/GameStateContext";
import { fetchUser } from "../api/api";

const DashboardPage = () => {
  const { menuOpen, setMenuOpen, toggleMenu, mode } = useGameState();
  const { user, setUser } = useUser();

  console.log("user:", user);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Tab") {
        event.preventDefault();
        toggleMenu();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleMenu]);

    // Fetches user from db
    useEffect(() => {
      const loadUser = async () => {
        try {
          const data = await fetchUser() as any;
          console.log("fetching user", data);
          setUser(data.user);
        } catch (err) {
          console.error("Failed to fetch user", err);
        }
      };
  
      loadUser();
    }, []);

  return (
    <div className="relative flex flex-col min-h-screen min-w-screen">
      {/*MAP (leave here to put it under all ui elements) */}
      <div className="w-full h-full absolute inset-0 overflow-hidden">
        <GameMap />
      </div>

      {/* TOP BAR */}
      <div className="sticky top-0 w-full md:px-20 px-10 py-5">
        <div className="flex flex-row justify-between items-center">
          {/* HELP TEXT */}
          <div className="flex flex-col gap-2">
            <KeyHint keyName="Tab" action="to toggle menu" />
            <KeyHint keyName="w, a, s, d" action="to move" />
          </div>

          {/* MONEY */}
          <WoodContainer>
            <div className="flex flex-row w-24 h-10 items-center justify-between px-3">
              <p className="text-xl">$</p>
              <p className="text-xl tabular-nums">{user.money}</p>
            </div>
          </WoodContainer>
        </div>
      </div>

      {/* BODY */}
      <div className="flex flex-row mt-5 w-screen pt-20">
        {/* MENU BUTTON */}
        {!menuOpen && (
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
        {menuOpen && <BaseMenu />}
      </div>
    </div>
  );
};

export default DashboardPage;
