const GlobalLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="min-h-screen bg-repeat bg-center flex p-6"
      style={{
        backgroundImage: "url('/starrybg.png')",
      }}
    >
      <div className="w-full max-w-4xl">
        {children}
      </div>
    </div>
  );

}

export default GlobalLayout;