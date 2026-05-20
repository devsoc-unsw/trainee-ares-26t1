import { MAX_MAP_SIZE } from "../../constants/userContants";

export const checkLayers = (layers: any): boolean => {
  const layerNames = ["layer0", "layer1", "layer2"];

  // Check that each layer in newLayers is of valid size
  for (const name in layerNames) {
    const layer = layers?.[name];

    // Check layer exists
    if (!layer) return false;

    // Check layer has 10 rows
    if (!Array.isArray(layer) || layer.length != MAX_MAP_SIZE) return false;

    // Check layer has 10 columns
    for (const row in layer) {
      if (!Array.isArray(row) || row.length != MAX_MAP_SIZE) return false;
    }
  }

  return true;
};
