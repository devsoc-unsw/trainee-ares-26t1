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

// ─── Spritesheet constants ────────────────────────────────────────────────────

const FRAME_W = 16;
const FRAME_H = 16;

const ANIM_ROW: Record<AnimationName, number> = { idle: 0, walk: 1 };
const FRAME_COUNT: Record<AnimationName, number> = { idle: 3, walk: 4 };

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

  // Refs that the rAF loop reads — avoids stale closures
  const colRef       = useRef(initialCol);
  const rowRef       = useRef(initialRow);
  const movingRef    = useRef(false);
  const animRef      = useRef<AnimationName>("idle");
  const heldKeys     = useRef<Set<string>>(new Set());
  const lastMoveRef  = useRef(0);
  const lastFrameRef = useRef(0);
  const rafRef       = useRef<number | null>(null);

  // Keep refs in sync with state
  useEffect(() => { colRef.current = col; }, [col]);
  useEffect(() => { rowRef.current = row; }, [row]);

  // ── Collision ────────────────────────────────────────────────────────────
  function canMoveTo(r: number, c: number): boolean {
    const rows = collisionLayer.length;
    const cols = collisionLayer[0]?.length ?? 0;
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    return collisionLayer[r][c] == null;
  }

  // ── Track held keys (no OS repeat involved) ──────────────────────────────
  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (KEY_MAP[e.key]) { e.preventDefault(); heldKeys.current.add(e.key); }
    };
    const onUp = (e: KeyboardEvent) => {
      heldKeys.current.delete(e.key);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup",   onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup",   onUp);
    };
  }, []);

  // ── Main game loop ───────────────────────────────────────────────────────
  useEffect(() => {
    function tick(timestamp: number) {
      rafRef.current = requestAnimationFrame(tick);

      // ── Movement: attempt once per slideMs ──
      if (!movingRef.current && timestamp - lastMoveRef.current >= slideMs) {
        // Pick the first held key that maps to a direction
        const key = [...heldKeys.current].find(k => KEY_MAP[k]);
        if (key) {
          const { dc, dr, dir } = KEY_MAP[key];
          setDirection(dir);

          const nextRow = rowRef.current + dr;
          const nextCol = colRef.current + dc;

          if (canMoveTo(nextRow, nextCol)) {
            lastMoveRef.current = timestamp;
            movingRef.current   = true;

            colRef.current = nextCol;
            rowRef.current = nextRow;
            setCol(nextCol);
            setRow(nextRow);
            setFrame(0);
            setAnim("walk");
            animRef.current = "walk";

            setTimeout(() => {
              movingRef.current = false;
              // Only go idle if no key is still held
              if (![...heldKeys.current].some(k => KEY_MAP[k])) {
                setAnim("idle");
                animRef.current = "idle";
                setFrame(0);
              }
            }, slideMs);
          } else {
            // Facing a wall — turn but stay idle
            setAnim("idle");
            animRef.current = "idle";
          }
        } else if (!movingRef.current) {
          // No key held — ensure idle
          if (animRef.current !== "idle") {
            setAnim("idle");
            animRef.current = "idle";
            setFrame(0);
          }
        }
      }

      // ── Frame advance ──
      const currentAnim   = animRef.current;
      const frameDuration = currentAnim === "walk" ? walkFrameDuration : idleFrameDuration;
      const frameCount    = FRAME_COUNT[currentAnim];

      if (timestamp - lastFrameRef.current > frameDuration) {
        lastFrameRef.current = timestamp;
        setFrame(f => (f + 1) % frameCount);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [slideMs, idleFrameDuration, walkFrameDuration, collisionLayer]);

  // ── Spritesheet math ─────────────────────────────────────────────────────
  const { sheet, flip } = DIRECTION_SHEET[direction];
  const src             = spritesheets[sheet];
  const sheetRow        = ANIM_ROW[anim];
  const sheetCols       = Math.max(...Object.values(FRAME_COUNT)); // 4
  const bgX             = -(frame * FRAME_W * scale);
  const bgY             = -(sheetRow * FRAME_H * scale);
  const bgSize          = `${sheetCols * FRAME_W * scale}px ${Object.keys(ANIM_ROW).length * FRAME_H * scale}px`;
  const displaySize     = FRAME_W * scale;

  const offset = (tileSize - displaySize) / 2;
  const pixelX = col * tileSize + offset;
  const pixelY = row * tileSize + offset;

  return (
    <div
      className="absolute"
      style={{
        left:       pixelX,
        top:        pixelY,
        width:      displaySize,
        height:     displaySize,
        transition: `left ${slideMs}ms linear, top ${slideMs}ms linear`,
        zIndex:     10,
        transform:  flip ? "scaleX(-1)" : "scaleX(1)",
      }}
      aria-label="Player character"
    >
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