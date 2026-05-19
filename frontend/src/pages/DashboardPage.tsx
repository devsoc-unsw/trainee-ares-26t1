import { BaseMenu } from "../components/menu/BaseMenu";
import WoodContainer from "../components/WoodContainer";
import { useEffect, useState } from "react";
import { fetchUser } from "../api/api";

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
        <div className="flex flex-col min-h-screen">

            {/* TOP BAR */}
            <div className="sticky top-0 flex flex-col w-[85vw] md:w-[95vw]">
                <div className="flex flex-row justify-between">

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
                        className="flex h-[50vh] items-center ml-[-20vw] md:ml-[-9vw]"
                        onClick={() => setMenu(true)}
                    >
                        <WoodContainer>
                            <div className="flex items-center p-10 md:p-15 h-[40vh] w-[2vw] md:h-[50vh]">
                                <p className="rotate-90 text-2xl md:pl-10 pt-5 md:pt-0">
                                    MENU
                                </p>
                            </div>
                            <div className="h-[5vh] w-[10vw]" />
                        </WoodContainer>
                    </button>
                )}

                {/* BASE MENU */}
                {menu && <BaseMenu/>}

                {/*MAP */}
                <div></div>

            </div>
        </div>
    );
};

export default DashboardPage;