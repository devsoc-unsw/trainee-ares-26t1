import { useEffect, useState } from "react";
import { Player } from "../sprites/Player";
import { DecorateMap } from "./DecorateMap";
import { GameGrid } from "./GameGrid";
import { TILE_TYPES } from "../../types/MapTypes";
import ZoomableContainer from "./ZoomableContainer";
import FloorGrid from "./FloorGrid";
import { useUser } from "../../context/UserContext";
import { getPlayerSprite } from "../../utils/player";
import { useGameState } from "../../context/GameStateContext";

const GameMap = () => {
  const { user, updateLayers, updateInventory } = useUser();

  const { mode, setMode } = useGameState();

  const [tempLayers, setTempLayers] = useState(user.layers);
  const [tempInventory, setTempInventory] = useState(user.inventory);

  useEffect(() => {
    if (mode === "decorate") {
      setTempLayers(structuredClone(user.layers));
      setTempInventory(structuredClone(user.inventory));
    }
  }, [mode, user.layers, user.inventory]);

  useEffect(() => {
    if (mode !== "decorate") return;

    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        await updateLayers(tempLayers);
        await updateInventory(tempInventory);

        setMode("play");
      }

      if (e.key === "Escape") {
        setTempLayers(structuredClone(user.layers));
        setTempInventory(structuredClone(user.inventory));

        setMode("play");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    mode,
    tempLayers,
    tempInventory,
    user.layers,
    user.inventory,
    updateLayers,
    updateInventory,
    setMode,
  ]);

  return (
    <ZoomableContainer>
      <div className="relative">
        <FloorGrid
          rows={tempLayers.layer0.length}
          cols={tempLayers.layer0[0].length}
          tileSize={50}
        />

        {mode === "decorate" ? (
          <DecorateMap
            layers={tempLayers}
            onLayersChange={setTempLayers}
            inventory={tempInventory}
            onInventoryChange={setTempInventory}
            tileSize={50}
          />
        ) : (
          <>
            <GameGrid layers={user.layers} tiles={TILE_TYPES} tileSize={50} />

            <Player
              spritesheets={getPlayerSprite(user.sprite)}
              collisionLayer={user.layers.layer1}
              tileSize={50}
              scale={3}
              slideMs={150}
            />
          </>
        )}
      </div>
    </ZoomableContainer>
  );
};

export default GameMap;
