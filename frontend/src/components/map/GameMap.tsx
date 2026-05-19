import { useState } from "react";
import { Player } from "../sprites/Player";
import { DecorateMap } from "./DecorateMap";
import { GameGrid } from "./GameGrid";
import { TILE_TYPES, type InventoryItem } from "../../types/MapTypes";
import ZoomableContainer from "./ZoomableContainer";
import FloorGrid from "./FloorGrid";
import { useUser } from "../../context/UserContext";
import { getPlayerSprite } from "../../utils/player";

const GameMap = () => {
  const { user, setUser } = useUser();
  const [decorating, setDecorating] = useState(false);
  const [inventory, setInventory] = useState<InventoryItem[]>(user.inventory);

  return (
    <ZoomableContainer>
      <div className="relative">
        <FloorGrid
          rows={user.layers.layer0.length}
          cols={user.layers.layer0[0].length}
          tileSize={50}
        />
        {/* Decorate mode */}
        {decorating && (
          <DecorateMap
            layers={user.layers}
            onLayersChange={(newLayers) =>
              setUser((prev) => ({
                ...prev,
                layers: newLayers,
              }))
            }
            inventory={inventory}
            onInventoryChange={setInventory}
            tileSize={50}
          />
        )}
        {/* Normal view */}
        {!decorating && (
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
        s
      </div>
    </ZoomableContainer>
  );
};

export default GameMap;
