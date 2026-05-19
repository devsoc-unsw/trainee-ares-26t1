import { useState } from "react"
import { Player } from "../sprites/Player"
import WoodContainer from "../WoodContainer"
import { DecorateMap } from "./DecorateMap"
import { GameGrid } from "./GameGrid"
import { DUMMY_LAYERS, TILE_TYPES, type InventoryItem, type MapLayers } from "../../types/MapTypes"
import ZoomableContainer from "./ZoomableContainer"
import FloorGrid from "./FloorGrid"

const GameMap = () => {
  const [decorating, setDecorating] = useState(false);
  const [layers, setLayers] = useState<MapLayers>(DUMMY_LAYERS);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { tileId: 1, count: 3 },  // 3 chairs
    { tileId: 2, count: 1 },  // 1 rug left
  ]);

  return (
    <ZoomableContainer>
      <div className="relative">
        
        <FloorGrid
          rows={layers.layer0.length}
          cols={layers.layer0[0].length}
          tileSize={50}
        />

        <DecorateMap
          layers={layers}
          onLayersChange={setLayers}
          inventory={inventory}
          onInventoryChange={setInventory}
          tileSize={50}
        />
        {/* <GameGrid
          layers={DUMMY_LAYERS}
          tiles={TILE_TYPES}
          tileSize={50}
          showGrid
          highlightCollision
        />
        <Player
          spritesheets={{
          front: "/sprites/cat-waiter-front.png",
          back:  "/sprites/cat-waiter-back.png",
          side:  "/sprites/cat-waiter-side.png",
          }}
          collisionLayer={DUMMY_LAYERS.layer1}
          tileSize={50}
          scale={3}
          slideMs={150}
        /> */}
      </div>
    </ZoomableContainer>
  )
}

export default GameMap;