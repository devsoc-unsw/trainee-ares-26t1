interface CafeNukedProps {
  onReset: () => void;
}

export const CafeNuked = ({ onReset }: CafeNukedProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
    <div className="bg-red-50 border-4 border-red-800 rounded-xl p-8 max-w-sm w-full mx-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-red-900 text-center">
        Cafe Nuked
      </h2>
      <p className="text-red-800 text-center text-sm">
        You were in debt for 7 days. No more cafe womp womp.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="bg-red-800 text-red-50 rounded-xl py-2 px-6 text-sm self-center"
      >
        Start Over
      </button>
    </div>
  </div>
);
