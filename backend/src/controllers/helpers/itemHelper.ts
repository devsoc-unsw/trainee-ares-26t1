import { MAX_MAP_SIZE } from "../../constants/userContants";

export const checkLayers = (layers: any): boolean => {
  const layerNames = ["layer0", "layer1", "layer2"];

  for (const name of layerNames) {
    const layer = layers?.[name];

    if (!layer) return false;

    if (!Array.isArray(layer) || layer.length !== MAX_MAP_SIZE) return false;

    for (const row of layer) {
      if (!Array.isArray(row) || row.length !== MAX_MAP_SIZE) return false;
    }
  }

  return true;
};