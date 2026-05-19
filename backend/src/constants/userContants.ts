export const MAX_MAP_SIZE = 10;

export const DEFAULT_USER_STATE = {
  money: 0,
  layers: {
    layer0: Array.from({ length: MAX_MAP_SIZE }, () =>
      Array.from({ length: MAX_MAP_SIZE }, () => null)
    ),
    layer1: Array.from({ length: MAX_MAP_SIZE }, () =>
      Array.from({ length: MAX_MAP_SIZE }, () => null)
    ),
    layer2: Array.from({ length: MAX_MAP_SIZE }, () =>
      Array.from({ length: MAX_MAP_SIZE }, () => null)
    ),
  },
  inventory: {},
  tasks: [],
  debtStartDate: null,
};

export enum CatType {
  Black = "Black",
  Orange = "Orange",
  White = "White",
}
