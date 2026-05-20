interface FloorGridProps {
  rows: number;
  cols: number;
  tileSize: number;
}

const FloorGrid = ({ rows, cols, tileSize }: FloorGridProps) => {
  rows = rows + 2;
  cols = cols + 1;

  const getFloorSprite = (row: number, col: number) => {
    const even = (row + col) % 2 === 0;

    // ─── BACK WALL ROW ─────────────────────
    if (row === 0) {
      if (col === 0) return "/tiles/floor/floor_corner_lt.png";
      if (col === cols - 1) return "/tiles/floor/floor_corner_rt.png";
      return "/tiles/floor/floor_top.png";
    }

    // ─── TOP EDGE ──────────────────────────
    if (row === 1) {
      if (col === 0) return "/tiles/floor/floor_edge_corner_l.png";
      if (col === cols - 1) return "/tiles/floor/floor_edge_corner_r.png";
      return even
        ? "/tiles/floor/floor_edge_1.png"
        : "/tiles/floor/floor_edge_2.png";
    }

    // ─── BOTTOM EDGE ───────────────────────
    if (row === rows - 1) {
      if (col === 0) return "/tiles/floor/floor_corner_lb.png";
      if (col === cols - 1) return "/tiles/floor/floor_corner_rb.png";
      return even
        ? "/tiles/floor/floor_bottom_1.png"
        : "/tiles/floor/floor_bottom_2.png";
    }

    // ─── LEFT / RIGHT SIDES ────────────────
    if (col === 0) return "/tiles/floor/floor_left.png";

    if (col === cols - 1) return "/tiles/floor/floor_right.png";

    // ─── MIDDLE FLOOR ──────────────────────
    return even
      ? "/tiles/floor/floor_middle_1.png"
      : "/tiles/floor/floor_middle_2.png";
  };

  return (
    <div className="absolute -top-[75px] -left-[25px] inline-flex flex-col z-0 bg-theme-brown rounded-xl">
      {Array.from({ length: rows }, (_, row) => (
        <div key={row} className="flex leading-none">
          {Array.from({ length: cols }, (_, col) => (
            <img
              key={`${row}-${col}`}
              src={getFloorSprite(row, col)}
              draggable={false}
              className="pointer-events-none select-none block"
              style={{
                width: tileSize,
                height: tileSize,
                imageRendering: "pixelated",
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default FloorGrid;
