type WoodContainerProps = {
  children: React.ReactNode;
};

const WoodContainer = ({ children }: WoodContainerProps) => {
  return (
    <div className="relative bg-theme-brown p-6 overflow-visible">

      {/* left */}
      <div className="absolute -left-2 top-[-12px] h-[calc(100%+24px)] w-3 bg-theme-brown-dark border border-theme-purple shadow-[2px_2px_0px_#161B2C]" />

      {/* top */}
      <div className="absolute -top-2 left-[-12px] w-[calc(100%+24px)] h-3 bg-theme-brown-dark border border-theme-purple shadow-[2px_2px_0px_#161B2C]" />

      {/* right */}
      <div className="absolute -right-2 top-[-12px] h-[calc(100%+24px)] w-3 bg-theme-brown-dark border border-theme-purple shadow-[2px_2px_0px_#161B2C]" />

      {/* bottom */}
      <div className="absolute -bottom-2 left-[-12px] w-[calc(100%+24px)] h-3 bg-theme-brown-dark border border-theme-purple shadow-[2px_2px_0px_#161B2C]" />

      {/* content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default WoodContainer;