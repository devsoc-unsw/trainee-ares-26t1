import { TILE_TYPES, type InventoryItem } from "../../types/MapTypes";

interface SidebarProps {
  inventory: InventoryItem[];
  selectedTileId: number | null;
  onSelect: (tileId: number) => void;
}

function InventorySidebar({
  inventory,
  selectedTileId,
  onSelect,
}: SidebarProps) {
  return (
    <div className="w-48 shrink-0 bg-theme-brown-dark flex flex-col rounded-r-xl border-theme-brown border-t-5 border-b-5 border-r-5">
      <div className="px-3 py-2 border-b border-amber-800">
        <p className="text-theme-yellow text-xs font-semibold uppercase tracking-widest">
          Inventory
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
        {inventory.length === 0 && (
          <p className="text-amber-600 text-xs text-center mt-4">No items</p>
        )}
        {inventory.map(({ tileId, count }) => {
          const tile = TILE_TYPES[tileId];
          if (!tile || count <= 0) return null;
          const selected = selectedTileId === tileId;
          return (
            <button
              key={tileId}
              onClick={() => onSelect(tileId)}
              className={[
                "flex items-center gap-2 px-2 py-1.5 rounded text-left w-full transition-colors",
                selected
                  ? "bg-amber-500/30 ring-1 ring-amber-400"
                  : "hover:bg-amber-800/40",
              ].join(" ")}
            >
              <img
                src={tile.sprite}
                alt={tile.name}
                className="block shrink-0"
                style={{ width: 24, height: 24, imageRendering: "pixelated" }}
              />
              <span className="text-amber-100 text-xs flex-1 truncate">
                {tile.name}
              </span>
              <span className="text-amber-500 text-xs">×{count}</span>
            </button>
          );
        })}
      </div>
      <div className="px-3 py-2 border-t border-amber-800">
        <p className="text-amber-600 text-[10px]">
          &#91;Click&#93; map item to move it
        </p>
        <p className="text-amber-600 text-[10px]">&#91;Q&#93; to store item</p>
        <p className="text-amber-600 text-[10px]">
          &#91;Shift + click&#93; to store item
        </p>
      </div>
    </div>
  );
}

export default InventorySidebar;
