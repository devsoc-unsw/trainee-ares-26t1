import { BaseMenu } from "../components/menu/BaseMenu";
import WoodContainer from "../components/WoodContainer";
import { useEffect, useState } from "react";
import { fetchUser } from "../api/api";
import { GameMap } from "../components/map/GameMap";
import { DUMMY_LAYERS, TILE_TYPES } from "../components/map/MapTypes";
import ZoomableContainer from "../components/map/ZoomableContainer";

const DashboardPage = () => {
    const [menu, setMenu] = useState(false);
    const [meowBucks, setMeowBucks] = useState(0);

    const bucks = async () => {
        try {
            const data = await fetchUser();
            setMeowBucks(data.money);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        bucks();
    }, []);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setMenu(false);
            }
        };

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div className="relative flex flex-col min-h-screen min-w-screen">
            {/*MAP */}
            <div className="w-full h-full absolute inset-0 overflow-hidden">
                <ZoomableContainer>
                    <WoodContainer>
                    <div className="p-3">
                        <GameMap
                            layers={DUMMY_LAYERS}
                            tiles={TILE_TYPES}
                            tileSize={50}
                            showGrid
                            highlightCollision
                        />
                    </div>
                    </WoodContainer>
                </ZoomableContainer>
            </div>
            {/* TOP BAR */}
            <div className="sticky top-0 flex flex-col w-[85vw] md:w-[95vw]">
                <div className="flex flex-row justify-between px-10 py-5">

                    {/* HELP TEXT */}
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <p className="pl-1 pr-1 bg-theme-brown/60 rounded-md">
                                Enter
                            </p>
                            <p>to save</p>
                        </div>

                        <div className="flex flex-row mt-2">
                            <p className="pl-1 pr-1 bg-theme-brown/60 rounded-md">
                                Esc
                            </p>
                            <p>to cancel</p>
                        </div>
                    </div>

                    {/* MONEY */}
                    <WoodContainer>
                        <div className="flex flex-row w-[20vw] md:w-[6vw] h-[5vh] justify-between items-center">
                            <p className="text-xl pr-2 md:pt-5 pt-3 pl-2">$</p>
                            <p className="pr-2 md:pt-5 pt-3 text-xl">
                                {meowBucks}
                            </p>
                        </div>
                    </WoodContainer>

                </div>
            </div>

            {/* BODY */}
            <div className="flex flex-row mt-5 w-screen pt-20">
                {/* MENU BUTTON */}
                {!menu && (
                    <button
                        className="absolute -left-3 top-1/2 -translate-y-1/2 z-20"
                        onClick={() => setMenu(true)}
                    >
                        <WoodContainer>
                            <div className="flex items-center justify-center h-[50vh] w-[4vw] min-w-[50px]">
                                <p className="rotate-90 text-2xl whitespace-nowrap">
                                    MENU
                                </p>
                            </div>
                        </WoodContainer>
                    </button>
                )}

                {/* BASE MENU */}
                {menu && <BaseMenu/>}

            </div>
        </div>
    );
};

export default DashboardPage;