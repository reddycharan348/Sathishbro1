export function Logo({ className = "", iconSize = 40, textSize = "text-xl", onClick, showName = true }: { className?: string, iconSize?: number, textSize?: string, onClick?: () => void, showName?: boolean }) {
  return (
    <div className={`flex items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${className}`} onClick={onClick}>
      <img 
        src="/logo.png" 
        alt="Tectonix Logo" 
        style={{ height: iconSize }}
        className="object-contain shrink-0"
      />
      {showName && (
        <span className={`${textSize} text-slate-800 dark:text-white font-black uppercase tracking-tighter`}>
          Tectonix
        </span>
      )}
    </div>
  );
}
