import { useEffect, useRef, useState } from "react";
import type { TileId } from "../map/MapTypes";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Direction = "down" | "up" | "left" | "right";
export type AnimationName = "idle" | "walk";

export interface PlayerSpritesheets {
  front: string;
  back:  string;
  side:  string;
}

export interface PlayerProps {
  spritesheets: PlayerSpritesheets;
  collisionLayer: TileId[][];

  initialCol?: number;
  initialRow?: number;

  tileSize?: number;
  scale?: number;
  slideMs?: number;
  idleFrameDuration?: number;
  walkFrameDuration?: number;
}

// ─── Spritesheet layout constants ─────────────────────────────────────────────

const FRAME_W = 16;
const FRAME_H = 16;

const ANIM_ROW: Record<AnimationName, number> = {
  idle: 0,
  walk: 1,
};

const FRAME_COUNT: Record<AnimationName, number> = {
  idle: 3,
  walk: 4,
};

const DIRECTION_SHEET: Record<Direction, { sheet: keyof PlayerSpritesheets; flip: boolean }> = {
  down:  { sheet: "front", flip: false },
  up:    { sheet: "back",  flip: false },
  right: { sheet: "side",  flip: false },
  left:  { sheet: "side",  flip: true  },
};

const KEY_MAP: Record<string, { dc: number; dr: number; dir: Direction }> = {
  ArrowUp:    { dc:  0, dr: -1, dir: "up"    },
  ArrowDown:  { dc:  0, dr:  1, dir: "down"  },
  ArrowLeft:  { dc: -1, dr:  0, dir: "left"  },
  ArrowRight: { dc:  1, dr:  0, dir: "right" },
  w: { dc:  0, dr: -1, dir: "up"    },
  s: { dc:  0, dr:  1, dir: "down"  },
  a: { dc: -1, dr:  0, dir: "left"  },
  d: { dc:  1, dr:  0, dir: "right" },
};

// ─── Player ───────────────────────────────────────────────────────────────────

export function Player({
  spritesheets,
  collisionLayer,
  initialCol = 0,
  initialRow = 0,
  tileSize   = 30,
  scale      = 2,
  slideMs    = 150,
  idleFrameDuration = 200,
  walkFrameDuration = 100,
}: PlayerProps) {
  const [col,       setCol]       = useState(initialCol);
  const [row,       setRow]       = useState(initialRow);
  const [direction, setDirection] = useState<Direction>("down");
  const [anim,      setAnim]      = useState<AnimationName>("idle");
  const [frame,     setFrame]     = useState(0);

  const movingRef    = useRef(false);
  const lastFrameRef = useRef(0);
  const rafRef       = useRef<number | null>(null);
  const animRef      = useRef<AnimationName>("idle");

  // ── Collision ────────────────────────────────────────────────────────────
  function canMoveTo(nextRow: number, nextCol: number): boolean {
    const rows = collisionLayer.length;
    const cols = collisionLayer[0]?.length ?? 0;
    if (nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols) return false;
    return collisionLayer[nextRow][nextCol] == null;
  }

  // ── Input ────────────────────────────────────────────────────────────────
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const delta = KEY_MAP[e.key];
      if (!delta) return;
      e.preventDefault();

      setDirection(delta.dir);

      if (movingRef.current) return;

      const nextRow = row + delta.dr;
      const nextCol = col + delta.dc;

      if (!canMoveTo(nextRow, nextCol)) return;

      movingRef.current = true;
      setRow(nextRow);
      setCol(nextCol);
      setFrame(0);
      setAnim("walk");
      animRef.current = "walk";

      setTimeout(() => {
        movingRef.current = false;
        setAnim("idle");
        animRef.current = "idle";
        setFrame(0);
      }, slideMs);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [col, row, collisionLayer, slideMs]);

  // ── Frame animation loop ─────────────────────────────────────────────────
  useEffect(() => {
    function tick(timestamp: number) {
      rafRef.current = requestAnimationFrame(tick);

      const currentAnim    = animRef.current;
      const frameDuration  = currentAnim === "walk" ? walkFrameDuration : idleFrameDuration;
      const frameCount     = FRAME_COUNT[currentAnim];

      if (timestamp - lastFrameRef.current > frameDuration) {
        lastFrameRef.current = timestamp;
        setFrame(f => (f + 1) % frameCount);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [idleFrameDuration, walkFrameDuration]);

  // ── Spritesheet math ─────────────────────────────────────────────────────
  const { sheet, flip }  = DIRECTION_SHEET[direction];
  const src              = spritesheets[sheet];
  const sheetRow         = ANIM_ROW[anim];
  const frameCount       = FRAME_COUNT[anim];

  // Total sheet width = widest row (walk = 4 frames)
  const sheetCols        = Math.max(...Object.values(FRAME_COUNT)); // 4
  const bgX              = -(frame * FRAME_W * scale);
  const bgY              = -(sheetRow * FRAME_H * scale);
  const bgSize           = `${sheetCols * FRAME_W * scale}px ${Object.keys(ANIM_ROW).length * FRAME_H * scale}px`;
  const displaySize      = FRAME_W * scale;

  // Centre sprite on tile
  const offset = (tileSize - displaySize) / 2;
  const pixelX = col * tileSize + offset;
  const pixelY = row * tileSize + offset;

  return (
    <div
      className="absolute"
      style={{
        left:      pixelX,
        top:       pixelY,
        width:     displaySize,
        height:    displaySize,
        transition: `left ${slideMs}ms linear, top ${slideMs}ms linear`,
        zIndex:    10,
        // Flip horizontally for "left" direction
        transform: flip ? "scaleX(-1)" : "scaleX(1)",
      }}
      aria-label="Player character"
    >
      {/* Inner div holds the background so the flip transform doesn't invert bgX */}
      <div
        style={{
          width:              displaySize,
          height:             displaySize,
          backgroundImage:    `url(${src})`,
          backgroundPosition: `${bgX}px ${bgY}px`,
          backgroundSize:     bgSize,
          backgroundRepeat:   "no-repeat",
          imageRendering:     "pixelated",
        }}
      />
    </div>
  );
}