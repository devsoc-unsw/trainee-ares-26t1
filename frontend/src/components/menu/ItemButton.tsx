interface ItemButtonProps {
  text: string;
  icon: string;
  onClick?: () => void;
}

export default function ItemButton({ text, icon, onClick }: ItemButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="
                    w-15 h-15
                    rounded-2xl
                    bg-theme-brown-light
                    flex items-center justify-center

                    shadow-[4px_4px_0_#3b2a1f]
                    transition-all duration-100

                    hover:translate-x-[2px]
                    hover:translate-y-[2px]
                    hover:shadow-[2px_2px_0_#3b2a1f]

                    active:translate-x-[4px]
                    active:translate-y-[4px]
                    active:shadow-none
                "
        onClick={onClick}
      >
        <img src={icon} className="h-10 w-10" />
      </button>

      <p className="text-md text-center mt-1 text-theme-white">{text}</p>
    </div>
  );
}