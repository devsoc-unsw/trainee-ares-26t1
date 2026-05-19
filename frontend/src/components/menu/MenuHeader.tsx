import type { LucideIcon } from "lucide-react";

interface MenuHeaderProps {
  title: string;
  Icon: LucideIcon;
  onBack: () => void;
}

export default function MenuHeader({ title, Icon, onBack }: MenuHeaderProps) {
  return (
    <div className="relative flex items-center justify-center w-[25vw] pt-5">
      {/* Left button */}
      <button className="absolute left-10" onClick={onBack}>
        <Icon className="w-6 h-6 text-theme-black" />
      </button>

      {/* Center title */}
      <h2 className="text-2xl text-theme-black">{title}</h2>
    </div>
  );
}
