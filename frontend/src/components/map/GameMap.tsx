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
import type { User } from "../../api/api";

const GameMap = () => {
  const { user, saveMap } = useUser();
  const userData = user!;

  const { mode, setMode } = useGameState();

  const [editLayers, setEditLayers] = useState<User["layers"] | null>(null);
  const [editInventory, setEditInventory] = useState<User["inventory"] | null>(
    null,
  );

  useEffect(() => {
    if (mode === "decorate") {
      setEditLayers(structuredClone(userData.layers));
      setEditInventory(structuredClone(userData.inventory));
    }
  }, [mode, userData.layers, userData.inventory]);

  useEffect(() => {
    if (mode !== "decorate" || !editLayers || !editInventory) return;

    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        await saveMap(editLayers, editInventory);
        setMode("play");
      }

      if (e.key === "Escape") {
        setMode("play");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mode, editLayers, editInventory, saveMap, setMode]);


  const currentLayers =
    mode === "decorate" && editLayers ? editLayers : userData.layers;
  const currentInventory =
    mode === "decorate" && editInventory ? editInventory : userData.inventory;

  return (
    <ZoomableContainer>
      <div className="relative">
        <FloorGrid rows={10} cols={10} tileSize={50} />

        {mode === "decorate" && editLayers && editInventory ? (
          <DecorateMap
            layers={currentLayers}
            onLayersChange={setEditLayers}
            inventory={currentInventory}
            onInventoryChange={setEditInventory}
            tileSize={50}
          />
        ) : (
          <div>
            <GameGrid
              layers={userData.layers}
              tiles={TILE_TYPES}
              tileSize={50}
            />
            <Player
              spritesheets={getPlayerSprite(userData.sprite)}
              collisionLayer={userData.layers.layer1}
              tileSize={50}
              scale={3}
              slideMs={150}
            />
          </div>
        )}
      </div>
    </ZoomableContainer>
  );
};

export default GameMap;
