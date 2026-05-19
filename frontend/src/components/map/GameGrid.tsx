import { MapCell } from "./MapCell";
import type { MapLayers, MapTile } from "./MapTypes";

interface GameGridProps {
  layers: MapLayers;
  tiles: Record<number, MapTile>;
  tileSize?: number;
  showGrid?: boolean;
  highlightCollision?: boolean;
}

// grid
export function GameGrid({
  layers,
  tiles,
  tileSize = 16,
  showGrid = false,
  highlightCollision = false,
}: GameGridProps) {
  const rows = layers.layer0.length;
  const cols = layers.layer0[0].length;
 
  return (
    <div className="inline-flex flex-col">
      {Array.from({ length: rows }, (_, row) => (
        <div key={row} className="flex">
          {Array.from({ length: cols }, (_, col) => (
            <MapCell
              key={col}
              col={col}
              row={row}
              layers={layers}
              tiles={tiles}
              tileSize={tileSize}
              showGrid={showGrid}
              highlightCollision={highlightCollision}
            />
          ))}
        </div>
      ))}
    </div>
  );
}