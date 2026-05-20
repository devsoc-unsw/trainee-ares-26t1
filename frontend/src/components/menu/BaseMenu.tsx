import WoodContainer from "../WoodContainer";
import { useState } from "react";
import {
  Settings,
  ShoppingBasket,
  Paintbrush,
  CalendarPlus,
  Calendar,
  LogOut,
  ArrowLeft,
  SunMoon,
  Coins,
} from "lucide-react";

import MenuButton from "./MenuButton";
import SettingsMenu from "./SettingsMenu";
import MenuHeader from "./MenuHeader";

// menus
import ShopMenu from "./ShopMenu";
import AddTaskMenu from "./AddTaskMenu";
import ViewTaskMenu from "./ViewTaskMenu";
import { useNavigate } from "react-router-dom";
import { useGameState } from "../../context/GameStateContext";
import { useUser } from "../../context/UserContext";
import GamblingMenu from "./GamblingMenu";

type MenuView =
  | "main"
  | "settings"
  | "shop"
  | "addTask"
  | "viewTask"
  | "gambling";

export function BaseMenu() {
  const [menuContent, setMenuContent] = useState<MenuView>("main");
  const { enterDecorateMode } = useGameState();
  const { simulateDays } = useUser();

  const menuTitles: Record<MenuView, string> = {
    main: "Menu",
    settings: "Settings",
    shop: "Shop",
    addTask: "Add Task",
    viewTask: "View Tasks",
    gambling: '"Investing"',
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menus: Record<MenuView, React.ReactNode> = {
    main: (
      <div className="grid grid-cols-3 gap-5 place-items-center">
        <MenuButton
          text="Settings"
          Icon={Settings}
          onClick={() => setMenuContent("settings")}
        />
        <MenuButton
          text="Shop"
          Icon={ShoppingBasket}
          onClick={() => setMenuContent("shop")}
        />
        <MenuButton
          text="Decorate"
          Icon={Paintbrush}
          onClick={enterDecorateMode}
        />
        <MenuButton
          text="Add Task"
          Icon={CalendarPlus}
          onClick={() => setMenuContent("addTask")}
        />
        <MenuButton
          text="View Tasks"
          Icon={Calendar}
          onClick={() => setMenuContent("viewTask")}
        />
        <MenuButton
          text="Next day"
          Icon={SunMoon}
          onClick={() => simulateDays(1)}
        />
        <MenuButton
          text="Gamble"
          Icon={Coins}
          onClick={() => setMenuContent("gambling")}
        />
        <MenuButton text="Log out" Icon={LogOut} onClick={handleLogout} />
      </div>
    ),

    settings: <SettingsMenu onBack={() => setMenuContent("main")} />,
    shop: <ShopMenu onBack={() => setMenuContent("main")} />,
    addTask: <AddTaskMenu onBack={() => setMenuContent("main")} />,
    viewTask: <ViewTaskMenu onBack={() => setMenuContent("main")} />,
    gambling: <GamblingMenu />,
  };

  return (
    <div className="ml-15">
      <WoodContainer>
        <div className="flex flex-col w-[25vw] h-[50vh] items-center p-2 gap-3">
          <MenuHeader
            title={menuTitles[menuContent]}
            Icon={ArrowLeft}
            onBack={() => setMenuContent("main")}
          />
          {menus[menuContent]}
        </div>
      </WoodContainer>
    </div>
  );
}
