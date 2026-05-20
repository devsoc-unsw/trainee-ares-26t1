import { useRef, useState } from "react";
import { useUser } from "../../context/UserContext";
import BetInput from "../gambling/BetInput";
import Reel from "../gambling/Reel";

const SYMBOLS = ["♫", "★", "♥", "☺", "✦", "❅", "☁", "⛇"];
const WIN_SYMBOL = "♫";
const WIN_CHANCE = 0.1;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

function pickResults(): [string, string, string] {
  const win = Math.random() < WIN_CHANCE;
  if (win) {
    const s = randomSymbol();
    return [s, s, s];
  }
  // Guarantee at least one mismatch
  while (true) {
    const a = randomSymbol();
    const b = randomSymbol();
    const c = randomSymbol();
    if (!(a === b && b === c)) return [a, b, c];
  }
}

export default function GamblingMenu() {
  const { activeUser, updateMoney } = useUser();
  const money = activeUser.money;

  const [bet, setBet] = useState(10);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<[string, string, string] | null>(null);
  const [lastOutcome, setLastOutcome] = useState<{
    won: boolean;
    amount: number;
  } | null>(null);
  const doneCount = useRef(0);

  // Build reel strips: pad with random symbols above, end on result
  function buildStrip(finalSymbol: string, length = 16): string[] {
    const strip: string[] = [];
    for (let i = 0; i < length - 2; i++) strip.push(randomSymbol());
    strip.push(finalSymbol); // second-to-last = centre row when stopped
    strip.push(randomSymbol()); // padding below so the centre row isn't at the bottom
    return strip;
  }

  const [strips, setStrips] = useState<[string[], string[], string[]]>([
    buildStrip("♫"),
    buildStrip("★"),
    buildStrip("♥"),
  ]);

  const handleSpin = () => {
    if (spinning || money < bet) return;
    const [a, b, c] = pickResults();
    setStrips([buildStrip(a), buildStrip(b), buildStrip(c)]);
    setResult([a, b, c]);
    setLastOutcome(null);
    doneCount.current = 0;
    setSpinning(true);
  };

  const handleReelDone = () => {
    doneCount.current += 1;
    if (doneCount.current < 3) return;

    setSpinning(false);

    if (!result) return;
    const won = result[0] === result[1] && result[1] === result[2];
    if (won) {
      updateMoney(bet * 10);
    } else {
      updateMoney(-bet);
    }
    setLastOutcome({ won, amount: bet });
  };

  const canSpin = !spinning && money >= bet && bet >= 1;

  return (
    <div className="flex flex-col gap-3">
      {/* Reels */}
      <div className="flex gap-3">
        {strips.map((strip, i) => (
          <Reel
            key={i}
            symbols={strip}
            spinning={spinning}
            delay={i * 180}
            onDone={handleReelDone}
          />
        ))}
      </div>

      {/* Bet input */}
      <BetInput value={bet} max={money} onChange={setBet} disabled={spinning} />

      {/* Spin button */}
      <button
        onClick={handleSpin}
        disabled={!canSpin}
        className="relative py-2 rounded-xl font-bold text-xl tracking-wide transition-all duration-150
                     disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
        style={{
          background: canSpin ? "#EEB550" : "#4D3F38",
          color: canSpin ? "#1c0800" : "#6b4020",
        }}
      >
        {spinning ? "spinning..." : "Spin!"}
      </button>

      {lastOutcome &&
        (lastOutcome.won ? (
          <p className="text-center text-theme-white">
            Yay! You won ${lastOutcome.amount} !!!!
          </p>
        ) : (
          <p className="text-center text-theme-white">
            Womp womp... try again :/
          </p>
        ))}
    </div>
  );
}
