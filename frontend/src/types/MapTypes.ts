export interface MapTile {
  id: number;
  name: string;
  layer: number;
  sprite: string;
  price: number;
}

export type TileId = number | null;

export interface MapLayers {
  layer0: TileId[][]; // floor decor (no collision)
  layer1: TileId[][]; // solid objects (collision)
  layer2: TileId[][]; // decorative overlay (no collision)
}

export interface InventoryItem {
  tileId: number;
  count: number;
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
    name: "Rug (Left)",
    layer: 0,
    sprite: "/tiles/lv0/rug_left.png",
    price: 20,
  },

  3: {
    id: 3,
    name: "Rug (Right)",
    layer: 0,
    sprite: "/tiles/lv0/rug_right.png",
    price: 20,
  },

  4: {
    id: 4,
    name: "Stool",
    layer: 0,
    sprite: "/tiles/lv0/stool.png",
    price: 40,
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
    price: 30,
  },

  12: {
    id: 12,
    name: "Counter (Middle)",
    layer: 1,
    sprite: "/tiles/lv1/counter_middle.png",
    price: 30,
  },

  13: {
    id: 13,
    name: "Counter (Right)",
    layer: 1,
    sprite: "/tiles/lv1/counter_right.png",
    price: 30,
  },

  14: {
    id: 14,
    name: "Table (Top Left)",
    layer: 1,
    sprite: "/tiles/lv1/table_tl.png",
    price: 40,
  },

  15: {
    id: 15,
    name: "Table (Top Right)",
    layer: 1,
    sprite: "/tiles/lv1/table_tr.png",
    price: 40,
  },

  16: {
    id: 16,
    name: "Table (Bottom Left)",
    layer: 1,
    sprite: "/tiles/lv1/table_bl.png",
    price: 40,
  },

  17: {
    id: 17,
    name: "Table (Bottom Right)",
    layer: 1,
    sprite: "/tiles/lv1/table_br.png",
    price: 40,
  },

  // Layer 2 ///////////////////////////////////////
  20: {
    id: 20,
    name: "Cake",
    layer: 2,
    sprite: "/tiles/lv2/cake.png",
    price: 10,
  },

  21: {
    id: 21,
    name: "Coffee Machine",
    layer: 2,
    sprite: "/tiles/lv2/coffee_machine.png",
    price: 50,
  },

  22: {
    id: 22,
    name: "Coffee",
    layer: 2,
    sprite: "/tiles/lv2/coffee.png",
    price: 5,
  },

  23: {
    id: 23,
    name: "Croissant",
    layer: 2,
    sprite: "/tiles/lv2/croissant.png",
    price: 8,
  },

  24: {
    id: 24,
    name: "Pie",
    layer: 2,
    sprite: "/tiles/lv2/pie.png",
    price: 10,
  },
};

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
    [null, null, null, null, 14, 15, null, null, null, null],
    [null, null, null, null, 16, 17, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ],
  layer2: [
    [null, 24, 23, 21, null, null, null, null, null, null],
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
};
