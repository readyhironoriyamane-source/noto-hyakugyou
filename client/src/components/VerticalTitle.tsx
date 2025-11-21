interface VerticalTitleProps {
  text: string;
  className?: string;
}

export default function VerticalTitle({ text, className = "" }: VerticalTitleProps) {
  return (
    <div className={`writing-vertical-rl text-orientation-upright font-serif tracking-widest select-none ${className}`}>
      {text}
    </div>
  );
}
