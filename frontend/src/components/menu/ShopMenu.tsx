import ItemButton from "./ItemButton";
import { TILE_TYPES } from "../../types/MapTypes";

interface ShopMenuProps {
  onBack: () => void;
}

export const ShopMenu = ({ onBack }: ShopMenuProps) => {
  return (
    <div className="grid grid-cols-3 gap-5 items-start justify-items-center overflow-y-auto">
      {Object.values(TILE_TYPES).map((tile) => (
        <ItemButton
          key={tile.id}
          text={tile.name + " " + "$" + tile.price as string}
          icon={tile.sprite}
          onClick={() => console.log(tile)}
        />
      ))}
    </div>
  );
};

export default ShopMenu;
