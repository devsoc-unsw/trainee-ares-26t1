const normalizeSprite = (sprite: unknown) => {
  const value = typeof sprite === "string" ? sprite.toLowerCase() : "orange";
  return ["black", "orange", "waiter"].includes(value) ? value : "orange";
};

export const getPlayerSprite = (sprite: unknown) => {
  const normalized = normalizeSprite(sprite);
  return {
    front: `/sprites/cat-${normalized}-front.png`,
    back: `/sprites/cat-${normalized}-back.png`,
    side: `/sprites/cat-${normalized}-side.png`,
  };
};

export function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function getDayDiff(start: string, current: string) {
  const ms = new Date(current).getTime() - new Date(start).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}
