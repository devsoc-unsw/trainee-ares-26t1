import type { MapLayers, MapTile } from "../../types/MapTypes";
import TileSprite from "./TileSprite";

interface MapCellProps {
  col: number;
  row: number;
  layers: MapLayers;
  tiles: Record<number, MapTile>;
  tileSize: number;
  showGrid: boolean;
  highlightCollision: boolean;
}

export const MapCell = ({
  col,
  row,
  layers,
  tiles,
  tileSize,
  showGrid,
  highlightCollision,
}: MapCellProps) => {
  const id0 = layers.layer0[row][col];
  const id1 = layers.layer1[row][col];
  const id2 = layers.layer2[row][col];

  const tile0 = id0 != null ? tiles[id0] : null;
  const tile1 = id1 != null ? tiles[id1] : null;
  const tile2 = id2 != null ? tiles[id2] : null;

  const hasCollision = tile1 != null;

  return (
    <div
      className={[
        "relative shrink-0 box-border",
        showGrid ? "border border-white/[0.08]" : "",
        highlightCollision && hasCollision ? "bg-red-500/10" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width: tileSize, height: tileSize }}
    >
      {/* Layer 0 – floor decor (z-index 0) */}
      {tile0 && (
        <div className="absolute inset-0 z-0">
          <TileSprite tile={tile0} tileSize={tileSize} />
        </div>
      )}

      {/* Layer 1 – collision objects (z-index 10) */}
      {tile1 && (
        <div className="absolute inset-0 z-10">
          <TileSprite tile={tile1} tileSize={tileSize} />
        </div>
      )}

      {/* Layer 2 – decorative overlay (z-index 20) */}
      {tile2 && (
        <div className="absolute inset-0 z-20">
          <TileSprite tile={tile2} tileSize={tileSize} />
        </div>
      )}
    </div>
  );
};
