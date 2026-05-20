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
} from "lucide-react";

import MenuButton from "./MenuButton";
import SettingsMenu from "./SettingsMenu";
import MenuHeader from "./MenuHeader";

// menus
import ShopMenu from "./ShopMenu";
import DecorateMenu from "./DecorateMenu";
import AddTaskMenu from "./AddTaskMenu";
import ViewTaskMenu from "./ViewTaskMenu";
import { useNavigate } from "react-router-dom";

type MenuView =
  | "main"
  | "settings"
  | "shop"
  | "decorate"
  | "addTask"
  | "viewTask";

export function BaseMenu() {
  const [menuContent, setMenuContent] = useState<MenuView>("main");

  const menuTitles: Record<MenuView, string> = {
    main: "Menu",
    settings: "Settings",
    shop: "Shop",
    decorate: "Decorate",
    addTask: "Add Task",
    viewTask: "View Tasks",
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
          onClick={() => setMenuContent("decorate")}
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
          text="Log out"
          Icon={LogOut}
          onClick={handleLogout}
        />
      </div>
    ),

    settings: <SettingsMenu onBack={() => setMenuContent("main")} />,
    shop: <ShopMenu onBack={() => setMenuContent("main")} />,
    decorate: <DecorateMenu onBack={() => setMenuContent("main")} />,
    addTask: <AddTaskMenu onBack={() => setMenuContent("main")} />,
    viewTask: <ViewTaskMenu onBack={() => setMenuContent("main")} />,
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
