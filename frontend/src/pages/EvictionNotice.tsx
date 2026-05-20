interface EvictionNoticeProps {
  debtDays: number;
  onDismiss: () => void;
}

export const EvictionNotice = ({
  debtDays,
  onDismiss,
}: EvictionNoticeProps) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="bg-amber-50 border-4 border-amber-800 rounded-xl p-8 max-w-sm w-full mx-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-amber-900 text-center">
        ⚠️ Eviction Notice
      </h2>
      <p className="text-amber-800 text-center text-sm">
        You have been in debt for{" "}
        <strong>
          {debtDays} day{debtDays !== 1 ? "s" : ""}
        </strong>
        . Pay off your debt before it's too late!
      </p>
      <p className="text-amber-700 text-center text-xs">
        {7 - debtDays} day{7 - debtDays !== 1 ? "s" : ""} until your café is
        repossessed.
      </p>
      <button
        type="button"
        onClick={onDismiss}
        className="bg-amber-800 text-amber-50 rounded-xl py-2 px-6 text-sm self-center"
      >
        Dismiss
      </button>
    </div>
  </div>
);
