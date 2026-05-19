import { useRef, useState } from "react";

interface ZoomableContainerProps {
    children: React.ReactNode;
}

export default function ZoomableContainer({ children }: ZoomableContainerProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);

    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({
      x: window.innerWidth / 3,
      y: window.innerHeight / 5,
    });

    const [dragging, setDragging] = useState(false);
    const [start, setStart] = useState({ x: 0, y: 0 });

    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();

        const zoomSpeed = 0.1;

        setScale((prev) => {
            const next = e.deltaY < 0 ? prev + zoomSpeed : prev - zoomSpeed;
            return Math.min(Math.max(next, 0.5), 3); // clamp 0.5x - 3x
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
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

    const handleMouseUp = () => {
        setDragging(false);
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing border-2 border-black"
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
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