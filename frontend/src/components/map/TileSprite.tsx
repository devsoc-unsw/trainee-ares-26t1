import type { MapTile } from "./MapTypes";

interface TileSpriteProps {
  tile: MapTile;
  tileSize: number;
}

const TileSprite = ({ tile, tileSize }: TileSpriteProps) => {
  return (
    <img
      src={tile.sprite as string}
      alt={tile.name as string}
      title={tile.name as string}
      draggable={false}
      className="pointer-events-none select-none"
      style={{
        width: tileSize,
        height: tileSize,
        imageRendering: "pixelated",
        display: "block",
      }}
    />
  );
}

export default TileSprite;