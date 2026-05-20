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
