export interface MapTile {
  id: number,
  name: string,
  layer: number,
  sprite: string,
  price: number,
}

export type TileId = number | null;

export interface MapLayers {
  layer0: TileId[][];  // floor decor (no collision)
  layer1: TileId[][];  // solid objects (collision)
  layer2: TileId[][];  // decorative overlay (no collision)
}

export const TILE_TYPES: Record<number, MapTile> = {
  // Layer 0 ///////////////////////////////////////
  1: {
      id: 1,
      name: "Chair",
      layer: 0,
      sprite: "/tiles/lv0/chair.png",
      price: 67,
  },

  2: {
      id: 2,
      name: "Rug Left",
      layer: 0,
      sprite: "/tiles/lv0/rug_left.png",
      price: 20,
  },

  3: {
      id: 3,
      name: "Rug Right",
      layer: 0,
      sprite: "/tiles/lv0/rug_right.png",
      price: 20,
  },

  // Layer 1 ///////////////////////////////////////
  10: {
      id: 10,
      name: "Potted Plant",
      layer: 1,
      sprite: "/tiles/lv1/plant.png",
      price: 40,
  },

  11: {
      id: 11,
      name: "Counter (Left)",
      layer: 1,
      sprite: "/tiles/lv1/counter_left.png",
      price: 40,
  },

  12: {
      id: 12,
      name: "Counter (Middle)",
      layer: 1,
      sprite: "/tiles/lv1/counter_middle.png",
      price: 40,
  },

  13: {
      id: 13,
      name: "Counter (Right)",
      layer: 1,
      sprite: "/tiles/lv1/counter_right.png",
      price: 40,
  },


  // Layer 2 ///////////////////////////////////////
  // 20: {
  //   id: 20,
  //   name: "Flowers",
  //   layer: 2,
  //   sprite: "/tiles/flowers.png",
  // },
}

export const DUMMY_LAYERS: MapLayers = {
  layer0: [
    [1, 2, 3, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ],
  layer1: [
    [null, null, null, null, 10, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, 11, 12, 13, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ],
  layer2: [
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ],
}