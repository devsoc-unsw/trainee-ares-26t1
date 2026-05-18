import { BaseMenu } from "../components/menu/base";
import WoodContainer from "../components/WoodContainer";
import { useState } from "react";
import { fetchUser } from "../api/api";

const DashboardPage = () => {
    const [menu, setMenu] = useState(false);
    const [meowBucks, setMeowBucks] = useState(0);
    
    const bucks = async() => {
        try {
            const data = await fetchUser();
            setMeowBucks(data.money);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        // need to test this on pnpm dev
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 flex flex-col w-[85vw] md:w-[95vw]">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-col">
                        <div className="flex flex-row">
                            <p className="pl-1 pr-1 bg-theme-brown/60 rounded-md">Enter</p>
                            <p>to save</p>
                        </div>
                        <div/>
                        <div className="flex flex-row mt-2">
                            <p className="pl-1 pr-1 bg-theme-brown/60 rounded-md">Esc</p>
                            <p>to cancel</p>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <WoodContainer>
                            <div className="flex flex-row w-[20vw] md:w-[6vw] h-[5vh] justify-between items-center">
                                <p className="text-xl pr-2 md:pt-5 pt-3 pl-2">$</p>
                                <p className="pr-2 md:pt-5 pt-3 text-xl">{meowBucks}</p>
                            </div>
                        </WoodContainer>
                    </div>
                </div>
            </div>

            {/* body of the dashboard */}
            <div className="flex flex-row mt-5 w-screen pt-20">
                {/* to set the side menu to true */}
                <div style={{visibility: menu ? "hidden" : "visible"}}>
                    <button className="flex h-[50vh] items-center ml-[-20vw] md:ml-[-9vw]" onClick={() => setMenu(!menu)}>
                        <WoodContainer>
                            <div className="flex items-center p-10 md:p-15 h-[40vh] w-[2vw] md:h-[50vh]">
                                <p className="rotate-90 text-2xl md:pl-10 pt-5 md:pt-0">MENU</p>
                            </div>
                            <div className="h-[5vh] w-[10vw]"/>
                        </WoodContainer>
                    </button>
                    
                </div>

                {/* to set the base menu component */}
                <div style={{visibility: menu ? "visible" : "hidden"}}>
                    <BaseMenu/>
                </div>

                {/* for map */}
                <div></div>
            </div>
        </div>
    )
}

export default DashboardPage;