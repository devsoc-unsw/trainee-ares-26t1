import { Player } from "../sprites/Player"
import WoodContainer from "../WoodContainer"
import { GameGrid } from "./GameGrid"
import { DUMMY_LAYERS, TILE_TYPES } from "./MapTypes"
import ZoomableContainer from "./ZoomableContainer"

const GameMap = () => {
  return (
    <ZoomableContainer>
      <WoodContainer>
        <div className="p-3">
          <div className="relative">
            <GameGrid
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
            />
          </div>
        </div>
      </WoodContainer>
    </ZoomableContainer>
  )
}

export default GameMap;