interface KeyHintProps {
  keyName: string;
  action: string;
}

export default function KeyHint({ keyName, action }: KeyHintProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <p className="px-1 bg-theme-brown/60 rounded-md text-lg text-theme-yellow drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
          {keyName}
        </p>
        <p className="text-lg drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
          {action}
        </p>
      </div>
    </div>
  );
}
