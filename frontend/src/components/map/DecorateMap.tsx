import { useCallback, useEffect, useRef, useState } from "react";
import {
  TILE_TYPES,
  type InventoryItem,
  type MapLayers,
  type TileId,
} from "../../types/MapTypes";
import InventorySidebar from "./Inventory";

// ─── Types ──────────────────────────────────────────────────────────────────
export interface DecorateModeProps {
  layers: MapLayers;
  onLayersChange: (layers: MapLayers) => void;
  inventory: InventoryItem[];
  onInventoryChange: (inventory: InventoryItem[]) => void;
  tileSize?: number;
}

interface CursorItem {
  tileId: number;
  fromMap?: { row: number; col: number; layer: number };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function cloneLayers(layers: MapLayers): MapLayers {
  return {
    layer0: layers.layer0.map((r) => [...r]),
    layer1: layers.layer1.map((r) => [...r]),
    layer2: layers.layer2.map((r) => [...r]),
  };
}

function getLayer(layers: MapLayers, n: number): TileId[][] {
  if (n === 0) return layers.layer0;
  if (n === 1) return layers.layer1;
  return layers.layer2;
}

function isCellOccupiedOnLayer(
  layers: MapLayers,
  row: number,
  col: number,
  layerN: number,
): boolean {
  return getLayer(layers, layerN)[row][col] != null;
}

export function DecorateMap({
  layers,
  onLayersChange,
  inventory,
  onInventoryChange,
  tileSize = 50,
}: DecorateModeProps) {
  const mapRef = useRef<HTMLDivElement>(null);

  const [cursor, setCursor] = useState<CursorItem | null>(null);
  const [selectedInventoryId, setSelectedInventoryId] = useState<number | null>(
    null,
  );
  const [hoverCell, setHoverCell] = useState<{
    row: number;
    col: number;
  } | null>(null);

  const rows = layers.layer0.length;
  const cols = layers.layer0[0].length;

  const activeTileId = cursor?.tileId ?? selectedInventoryId ?? null;
  const activeTile = activeTileId != null ? TILE_TYPES[activeTileId] : null;
  const activeLayer = activeTile?.layer ?? null;

  // ── Can we place on this cell? ───────────────────────────────────────────
  const canPlace = useCallback(
    (row: number, col: number): boolean => {
      if (activeLayer == null) return false;
      if (
        cursor?.fromMap &&
        cursor.fromMap.row === row &&
        cursor.fromMap.col === col
      )
        return true;
      return !isCellOccupiedOnLayer(layers, row, col, activeLayer);
    },
    [layers, activeLayer, cursor],
  );

  // ── Mouse move → update hover cell ──────────────────────────────────────
  const getCellFromEvent = useCallback(
    (e: React.MouseEvent): { row: number; col: number } | null => {
      if (!mapRef.current) return null;
      const rect = mapRef.current.getBoundingClientRect();
      const cssScale = rect.width / (cols * tileSize);
      const col = Math.floor((e.clientX - rect.left) / (tileSize * cssScale));
      const row = Math.floor((e.clientY - rect.top) / (tileSize * cssScale));
      if (row < 0 || row >= rows || col < 0 || col >= cols) return null;
      return { row, col };
    },
    [tileSize, rows, cols],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      setHoverCell(getCellFromEvent(e));
    },
    [getCellFromEvent],
  );

  const handleMouseLeave = useCallback(() => setHoverCell(null), []);

  // ── Click on map ─────────────────────────────────────────────────────────
  const handleMapClick = useCallback(
    (e: React.MouseEvent) => {
      const cell = getCellFromEvent(e);
      if (!cell) return;
      const { row, col } = cell;

      // shift click to return item
      if (e.shiftKey && !cursor) {
        for (const layerN of [2, 1, 0]) {
          const tileId = getLayer(layers, layerN)[row][col];
          if (tileId != null) {
            const next = cloneLayers(layers);
            getLayer(next, layerN)[row][col] = null;
            onLayersChange(next);
            onInventoryChange(
              inventory.some((i) => i.tileId === tileId)
                ? inventory.map((i) =>
                    i.tileId === tileId ? { ...i, count: i.count + 1 } : i,
                  )
                : [...inventory, { tileId, count: 1 }],
            );
            return;
          }
        }
        return;
      }

      // try to place item on cursor
      if (cursor) {
        if (!canPlace(row, col)) return;
        const next = cloneLayers(layers);
        getLayer(
          next,
          cursor.tileId != null ? TILE_TYPES[cursor.tileId].layer : 0,
        )[row][col] = cursor.tileId;
        onLayersChange(next);
        setCursor(null);
        return;
      }

      // place item from inventory
      if (selectedInventoryId != null) {
        const tile = TILE_TYPES[selectedInventoryId];
        if (!tile) return;
        if (!canPlace(row, col)) return;
        const nextInv = inventory.map((i) =>
          i.tileId === selectedInventoryId ? { ...i, count: i.count - 1 } : i,
        );
        onInventoryChange(nextInv);
        // Place on map
        const next = cloneLayers(layers);
        getLayer(next, tile.layer)[row][col] = selectedInventoryId;
        onLayersChange(next);
        // If count hits 0, deselect
        const remaining =
          nextInv.find((i) => i.tileId === selectedInventoryId)?.count ?? 0;
        if (remaining <= 0) setSelectedInventoryId(null);
        return;
      }

      // nothing held, pick up curr item
      for (const layerN of [2, 1, 0]) {
        const tileId = getLayer(layers, layerN)[row][col];
        if (tileId != null) {
          const next = cloneLayers(layers);
          getLayer(next, layerN)[row][col] = null;
          onLayersChange(next);
          setCursor({ tileId, fromMap: { row, col, layer: layerN } });
          return;
        }
      }
    },
    [
      cursor,
      selectedInventoryId,
      layers,
      inventory,
      canPlace,
      getCellFromEvent,
      onLayersChange,
      onInventoryChange,
    ],
  );

  // ── Inventory sidebar selection ──────────────────────────────────────────
  const handleInventorySelect = useCallback(
    (tileId: number) => {
      // Drop any cursor item back to inventory first
      if (cursor) {
        if (cursor.fromMap) {
          // Restore to original position
          const next = cloneLayers(layers);
          getLayer(next, cursor.fromMap.layer)[cursor.fromMap.row][
            cursor.fromMap.col
          ] = cursor.tileId;
          onLayersChange(next);
        } else {
          onInventoryChange(
            inventory.map((i) =>
              i.tileId === cursor.tileId ? { ...i, count: i.count + 1 } : i,
            ),
          );
        }
        setCursor(null);
      }
      setSelectedInventoryId((prev) => (prev === tileId ? null : tileId));
    },
    [cursor, layers, inventory, onLayersChange, onInventoryChange],
  );

  // ── Return a tileId to inventory (adds to existing stack or creates new) ──
  const returnToInventory = useCallback(
    (tileId: number) => {
      onInventoryChange(
        inventory.some((i) => i.tileId === tileId)
          ? inventory.map((i) =>
              i.tileId === tileId ? { ...i, count: i.count + 1 } : i,
            )
          : [...inventory, { tileId, count: 1 }],
      );
    },
    [inventory, onInventoryChange],
  );

  // ── Cancel (Q) — always returns held item to inventory ────────────
  const cancelCursor = useCallback(() => {
    if (!cursor) {
      setSelectedInventoryId(null);
      return;
    }
    returnToInventory(cursor.tileId);
    setCursor(null);
  }, [cursor, returnToInventory]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "q") cancelCursor();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cancelCursor]);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="flex h-full gap-7">
      {/* ── Map area ── */}
      <div className="flex-1 overflow-auto">
        <div
          ref={mapRef}
          className="relative inline-flex flex-col select-none"
          style={{ cursor: activeTileId != null ? "crosshair" : "default" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleMapClick}
        >
          {/* Base map grid */}
          {Array.from({ length: rows }, (_, row) => (
            <div key={row} className="flex">
              {Array.from({ length: cols }, (_, col) => {
                const id0 = layers.layer0[row][col];
                const id1 = layers.layer1[row][col];
                const id2 = layers.layer2[row][col];
                const tile0 = id0 != null ? TILE_TYPES[id0] : null;
                const tile1 = id1 != null ? TILE_TYPES[id1] : null;
                const tile2 = id2 != null ? TILE_TYPES[id2] : null;

                const isHovered =
                  hoverCell?.row === row && hoverCell?.col === col;
                const placeable =
                  isHovered && activeTileId != null && canPlace(row, col);
                const blocked =
                  isHovered && activeTileId != null && !canPlace(row, col);

                return (
                  <div
                    key={col}
                    className="relative shrink-0"
                    style={{ width: tileSize, height: tileSize }}
                  >
                    {/* Tiles */}
                    {tile0 && (
                      <img
                        src={tile0.sprite}
                        alt={tile0.name}
                        draggable={false}
                        className="absolute inset-0 block pointer-events-none"
                        style={{
                          width: tileSize,
                          height: tileSize,
                          imageRendering: "pixelated",
                          zIndex: 0,
                        }}
                      />
                    )}
                    {tile1 && (
                      <img
                        src={tile1.sprite}
                        alt={tile1.name}
                        draggable={false}
                        className="absolute inset-0 block pointer-events-none"
                        style={{
                          width: tileSize,
                          height: tileSize,
                          imageRendering: "pixelated",
                          zIndex: 1,
                        }}
                      />
                    )}
                    {tile2 && (
                      <img
                        src={tile2.sprite}
                        alt={tile2.name}
                        draggable={false}
                        className="absolute inset-0 block pointer-events-none"
                        style={{
                          width: tileSize,
                          height: tileSize,
                          imageRendering: "pixelated",
                          zIndex: 2,
                        }}
                      />
                    )}

                    {/* Available slot highlight */}
                    {activeTileId != null &&
                      activeLayer != null &&
                      !isCellOccupiedOnLayer(layers, row, col, activeLayer) && (
                        <div
                          className="absolute inset-0 bg-green-700/20 pointer-events-none"
                          style={{ zIndex: 5 }}
                        />
                      )}

                    {/* Hover: placeable */}
                    {placeable && activeTile && (
                      <>
                        <div
                          className="absolute inset-0 ring-2 ring-inset ring-lime-400 pointer-events-none"
                          style={{ zIndex: 6 }}
                        />
                        <img
                          src={activeTile.sprite}
                          alt={activeTile.name}
                          draggable={false}
                          className="absolute inset-0 block pointer-events-none opacity-70"
                          style={{
                            width: tileSize,
                            height: tileSize,
                            imageRendering: "pixelated",
                            zIndex: 7,
                          }}
                        />
                      </>
                    )}

                    {/* Hover: blocked */}
                    {blocked && (
                      <div
                        className="absolute inset-0 ring-2 ring-inset ring-red-600 bg-red-500/20 pointer-events-none"
                        style={{ zIndex: 6 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          ))}

          {/* Cursor ghost: follows mouse, rendered outside grid cells */}
          {activeTile && hoverCell == null && (
            <div
              className="absolute top-0 left-0 pointer-events-none opacity-60"
              style={{ zIndex: 50 }}
            >
              <img
                src={activeTile.sprite}
                alt=""
                style={{
                  width: tileSize,
                  height: tileSize,
                  imageRendering: "pixelated",
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Cancel button (floating) ── */}
      {(cursor || selectedInventoryId != null) && (
        <button
          onClick={cancelCursor}
          className="fixed -bottom-12 left-1/3 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/80 hover:bg-amber-800 border border-amber-700 text-amber-200 text-sm shadow-lg transition-colors z-50"
        >
          <span>Store item</span>
          <span className="text-amber-400 text-xs">Q</span>
        </button>
      )}

      {/* ── Inventory sidebar ── */}
      <InventorySidebar
        inventory={inventory}
        selectedTileId={selectedInventoryId}
        onSelect={handleInventorySelect}
      />
    </div>
  );
}
