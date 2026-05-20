import ItemButton from "./ItemButton";
import { TILE_TYPES } from "../../types/MapTypes";
import { buyItem } from "../../api/api";
import { useUser } from "../../context/UserContext";

interface ShopMenuProps {
  onBack: () => void;
}

export const ShopMenu = ({ onBack }: ShopMenuProps) => {
  const { setUser } = useUser();
  const handleBuyItem = async (id: number) => {
    try {
      const res = (await buyItem(id)) as any;
      setUser(res.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 items-start justify-items-center overflow-y-auto">
      {Object.values(TILE_TYPES).map((tile) => (
        <ItemButton
          key={tile.id}
          text={(tile.name + " " + "$" + tile.price) as string}
          icon={tile.sprite}
          onClick={() => handleBuyItem(tile.id)}
        />
      ))}
    </div>
  );
};

export default ShopMenu;
