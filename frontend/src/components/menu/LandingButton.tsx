interface FormButtonProps {
  text: string;
  onClick?: () => void;
}

export default function FormButton({ text, onClick }: FormButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center">
      <button
        className="
                    w-70 h-15
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
        <p className="text-md text-center mt-1 text-theme-black">{text}</p>
      </button>
    </div>
  );
}
