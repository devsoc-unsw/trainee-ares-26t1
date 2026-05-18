import WoodContainer from "../WoodContainer";
import { useState } from "react";

export const BaseMenu = () => {
    // might need to consider enum for the menu type tho
    const [nav, setNav] = useState(1);

    const handleNav = () => {
        setNav(arr[nav].back);
    }

    return (
        <div className="ml-15">
            <WoodContainer>
                <div className="flex flex-col w-[25vw] h-[50vh]">
                    <div className="flex flex-row w-[25vw] justify-between pt-5">
                        {/* universal back button */}
                        <button className="pl-2"><img src="./back-arrow.png" alt="back-arrow" className="w-6 h-6"/></button>
                        <p className="text-2xl pr-2">Menu</p>
                        <div/>
                    </div>

                    <div className="grid grid-cols-3 gap-4 pl-5 pt-5">
                        <div>
                            <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1">
                                <img  className="w-3 h-3" src="./setting.png" alt="setting"/>
                            </button>
                            <p className="ml-1 text-md">Setting</p>
                        </div>
                        <div>
                            <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1">
                                <img  className="w-3 h-3" src="./setting.png" alt="setting"/>
                            </button>
                            <p className="ml-3 tet-md">Shop</p>
                        </div>
                        <div>
                            <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1">
                                <img  className="w-3 h-3" src="./setting.png" alt="setting"/>
                            </button>
                            <p className="ml-4 text-md">Add</p>
                        </div>
                        <div>
                            <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1">
                                <img  className="w-3 h-3" src="./setting.png" alt="setting"/>
                            </button>
                            <p className="ml-3 text-md">View</p>
                        </div>
                        <div>
                            <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1">
                                <img  className="w-3 h-3" src="./setting.png" alt="setting"/>
                            </button>
                            <p className="ml-[-0.5vw] text-md">Inventory</p>
                        </div>
                        <div>
                            <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1">
                                <img  className="w-3 h-3" src="./setting.png" alt="setting"/>
                            </button>
                            <p className="ml-1 text-md">Log out</p>
                        </div>
                    </div>
                </div>
            </WoodContainer>
        </div>
    )
}