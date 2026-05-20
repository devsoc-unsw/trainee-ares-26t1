interface BetInputProps {
  value: number;
  max: number;
  onChange: (v: number) => void;
  disabled: boolean;
}

function BetInput({ value, max, onChange, disabled }: BetInputProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={() => onChange(Math.max(1, value - 10))}
          disabled={disabled || value <= 1}
          className="w-8 h-8 text-theme-black font-bold text-2xl transition-all
                    hover:bg-theme-brown-dark/50 rounded-l disabled:opacity-30 disabled:cursor-not-allowed"
        >
          −
        </button>

        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-black">
            $
          </span>
          <input
            type="number"
            min={1}
            max={max}
            value={value}
            disabled={disabled}
            onChange={(e) =>
              onChange(
                Math.min(max, Math.max(1, parseInt(e.target.value) || 1)),
              )
            }
            className="w-28 pl-8 pr-3 py-2 rounded-xl text-center text-theme-black font-mono font-semibold
                       bg-theme-brown-light outline-none
                       disabled:opacity-50 [appearance:textfield]"
          />
        </div>

        <button
          onClick={() => onChange(Math.min(max, value + 10))}
          disabled={disabled || value >= max}
          className="w-8 h-8 text-theme-black font-bold text-2xl transition-all
                    hover:bg-theme-brown-dark/50 rounded-l disabled:opacity-30 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default BetInput;
