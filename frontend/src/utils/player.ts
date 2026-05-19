export const getPlayerSprite = (sprite: "black" | "orange" | "waiter") => ({
  front: `/sprites/cat-${sprite}-front.png`,
  back: `/sprites/cat-${sprite}-back.png`,
  side: `/sprites/cat-${sprite}-side.png`,
});
