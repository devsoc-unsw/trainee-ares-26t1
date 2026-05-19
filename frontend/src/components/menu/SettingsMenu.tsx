// SettingsMenu.tsx
import { useState } from "react";

interface SettingsMenuProps {
    onBack: () => void;
}

export const SettingsMenu = ({ onBack }: SettingsMenuProps) => {
    const [isName, setIsName] = useState(false);
    const [isCafe, setIsCafe] = useState(false);

    return (
        <div>

            {/* Content */}
            <div className="flex flex-col gap-4 pt-10 px-4">

                {/* Username */}
                <form className="flex items-center justify-between rounded-xl bg-theme-white/60 p-3">
                    <label>Change Username</label>

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            className="
                                bg-theme-brown/50
                                rounded-lg
                                w-[8vw]
                                px-2
                                py-1
                            "
                        />

                        <input
                            type="checkbox"
                            checked={isName}
                            onChange={() => setIsName(!isName)}
                        />
                    </div>
                </form>

                {/* Cafe Name */}
                <form className="flex items-center justify-between rounded-xl bg-theme-white/60 p-3">
                    <label>Change Cafe Name</label>

                    <div className="flex items-center gap-2">
                        <input
                            type="text"
                            className="
                                bg-theme-brown/50
                                rounded-lg
                                w-[8vw]
                                px-2
                                py-1
                            "
                        />

                        <input
                            type="checkbox"
                            checked={isCafe}
                            onChange={() => setIsCafe(!isCafe)}
                        />
                    </div>
                </form>

                {/* Reset */}
                <button className="rounded-xl bg-theme-white/60 p-3">
                    <p className="text-red-600 text-lg text-center">
                        Reset
                    </p>
                </button>

            </div>

        </div>
    );
}

export default SettingsMenu;