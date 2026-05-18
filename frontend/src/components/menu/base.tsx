import WoodContainer from "../WoodContainer";
import { useState, type Dispatch, type SetStateAction} from "react";

interface updateProps {
    updateParent: Dispatch<SetStateAction<boolean>>
}

export function BaseMenu ( {updateParent}:updateProps) {
    const [menuContent, setMenuContent] = useState<number>(0);
    const [isName, setIsName] = useState<boolean>(false);
    const [isCafe, setIsCafe] = useState<boolean>(false);

    const handlePrev = () => {
        if (menuContent < 0) {
            updateParent(false);
            setMenuContent(0);
        } else {
            setMenuContent(0);
        }
    }

    return (
        <div>
        {menuContent == 0 ?(
            <div className="ml-15">
                <WoodContainer>
                    <div className="flex flex-col w-[25vw] h-[50vh]">
                        <div className="flex flex-row w-[25vw] justify-between pt-5">
                            {/* universal back button */}
                            <button className="pl-2" onClick={handlePrev}>
                                <img src="./back-arrow.png" alt="back-arrow" className="w-6 h-6"/>
                            </button>
                            <p className="text-2xl pr-2">Menu</p>
                            <div/>
                        </div>

                        <div className="grid grid-cols-3 gap-5 pl-5 pt-15">
                            <div>
                                <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1" onClick={() => setMenuContent(1)}>
                                    <img  className="w-3 h-3" src="./setting.png" alt="setting"/>
                                </button>
                                <p className="ml-1 text-md">Setting</p>
                            </div>

                            <div>
                                <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1" onClick={() => setMenuContent(2)}>
                                    <img  className="w-3 h-3" src="./setting.png" alt="shop"/>
                                </button>
                                <p className="ml-3 tet-md">Shop</p>
                            </div>

                            <div>
                                <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1">
                                    <img  className="w-3 h-3" src="./setting.png" alt="add"/>
                                </button>
                                <p className="ml-4 text-md">Add</p>
                            </div>

                            <div>
                                <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1">
                                    <img  className="w-3 h-3" src="./setting.png" alt="view"/>
                                </button>
                                <p className="ml-3 text-md">View</p>
                            </div>

                            <div>
                                <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1">
                                    <img  className="w-3 h-3" src="./setting.png" alt="Inventory"/>
                                </button>
                                <p className="ml-[-0.5vw] text-md">Inventory</p>
                            </div>

                            <div>
                                <button className="shadow-md rounded-2xl p-5 w-13 h-13 bg-theme-brown-light ml-1">
                                    <img  className="w-3 h-3" src="./setting.png" alt="Inventory"/>
                                </button>
                                <p className="ml-[0.3vw] text-md">Log Out</p>
                            </div>
                        </div>
                    </div>
                </WoodContainer>
            </div>
        ) : menuContent == 1 ?(
            <div className="ml-15">
                <WoodContainer>
                    <div className="flex flex-col w-[25vw] h-[50vh]">
                        <div className="flex flex-row w-[25vw] justify-between pt-5">
                            {/* universal back button */}
                            <button className="pl-2" onClick={handlePrev}>
                                <img src="./back-arrow.png" alt="back-arrow" className="w-6 h-6"/>
                            </button>
                            <p className="text-2xl pr-2">Setting</p>
                            <div/>
                        </div>

                        <div className="flex flex-col gap-2 pt-10">
                            <div className="pl-3 pr-3">
                                <form className="flex flex-row justify-between rounded-xl bg-theme-white/60 p-2">
                                    <label>Change username</label>
                                    <div>
                                        <input type="text" className="bg-theme-brown/50 border-transparent rounded-lg w-[8vw] mr-2"/>
                                        <input type="checkbox" checked={isName} onClick={() => setIsName(!isName)}/>
                                    </div>
                                </form>
                            </div>

                            <div className="pl-3 pr-3">
                                <form className="flex flex-row justify-between rounded-xl bg-theme-white/60 p-2">
                                    <label>Change Cafe Name</label>
                                    <div>
                                        <input type="text" className="bg-theme-brown/50 border-transparent rounded-lg w-[8vw] mr-2"/>
                                        <input type="checkbox" checked={isCafe} onClick={() => setIsCafe(!isCafe)}/>
                                    </div>
                                </form>
                            </div>

                            <div className="pl-3">
                                <button className="rounded-xl bg-theme-white/60">
                                    <p className="text-red-600 flex justify-center w-[23vw] text-lg p-2">Reset</p>
                                </button>
                            </div>
                        </div>
                    </div>
                </WoodContainer>
            </div>
        ) : (
            <p>gtw mas cape</p>
        )
        }
    </div>
    )
}