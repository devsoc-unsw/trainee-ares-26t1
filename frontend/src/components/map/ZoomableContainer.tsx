import { useRef, useState, useEffect } from "react";

interface ZoomableContainerProps {
  children: React.ReactNode;
  /** Called when a mousedown starts on the container. Return true to suppress panning. */
  suppressPan?: boolean;
}

export default function ZoomableContainer({
  children,
  suppressPan = false,
}: ZoomableContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({
    x: window.innerWidth / 3,
    y: window.innerHeight / 5,
  });

  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  // ── Wheel zoom — must be { passive: false } to call preventDefault ───────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSpeed = 0.1;
      setScale((prev) => {
        const next = e.deltaY < 0 ? prev + zoomSpeed : prev - zoomSpeed;
        return Math.min(Math.max(next, 0.5), 3);
      });
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (suppressPan) return;
    setDragging(true);
    setStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - start.x,
      y: e.clientY - start.y,
    });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing border-2 border-black"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      // onWheel removed — handled by the native listener above
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "center",
        }}
        className="w-fit h-fit"
      >
        {children}
      </div>
    </div>
  );
}
