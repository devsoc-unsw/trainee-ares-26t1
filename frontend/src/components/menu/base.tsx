import WoodContainer from "../WoodContainer";
import { useState } from "react";

export const BaseMenu = () => {
    // might need to consider enum for the menu type tho
    const [setting, setSetting] = useState(false);
    const [ToDo, setToDo] = useState(false);
    const [shop, setShop] = useState(false);

    return (
        <div>
            <WoodContainer>
                <></>
            </WoodContainer>
        </div>
    )
}