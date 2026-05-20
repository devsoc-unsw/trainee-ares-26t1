import ItemButton from "./ItemButton";
import { TILE_TYPES } from "../../types/MapTypes";
import { useUser } from "../../context/UserContext";

export const ShopMenu = () => {
  const { buyItem } = useUser();

  return (
    <div className="grid grid-cols-3 gap-2 items-start justify-items-center overflow-y-auto">
      {Object.values(TILE_TYPES).map((tile) => (
        <ItemButton
          key={tile.id}
          text={`${tile.name} $${tile.price}`}
          icon={tile.sprite}
          onClick={() => buyItem(tile.id)}
        />
      ))}
    </div>
  );
};
