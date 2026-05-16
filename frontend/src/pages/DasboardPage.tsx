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
            setMeowBucks(data.meowBucks);
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
                            <p> to save</p>
                        </div>
                        <div/>
                        <div className="flex flex-row mt-2">
                            <p className="pl-1 pr-1 bg-theme-brown/60 rounded-md">Esc</p>
                            <p>to cancel</p>
                        </div>
                    </div>

                    <div className="flex flex-row">
                        <WoodContainer>
                            <p className="w-[10vw] md:w-[5vw] h-0 text-xl flex justify-end items-center">$ {meowBucks}</p>
                        </WoodContainer>
                    </div>
                </div>
            </div>
            {/* body of the dashboard */}
            <div className="flex flex-row mt-5 w-screen pt-20">
                {/* to set the side menu to true */}
                <div style={{visibility: menu ? "hidden" : "visible"}}>
                    <button onClick={() => setMenu(!menu)}>
                        <WoodContainer>
                            <div className=" flex items-center h-[5vh] w-[5vw]">
                                <p className="rotate-90 text-2xl pl-10 pt-5">MENU</p>
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