export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-20 h-20 rounded-full border-2 border-neon-cyan/20 animate-pulse"></div>
        
        {/* Spinning ring */}
        <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-t-neon-cyan animate-spin"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-3 w-14 h-14 rounded-full bg-neon-cyan/10 animate-pulse"></div>
        
        {/* Center dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-neon-cyan shadow-neon-cyan"></div>
        </div>
      </div>
      
      <p className="mt-6 font-display text-neon-cyan tracking-widest text-sm animate-pulse">
        LOADING_DATA...
      </p>
    </div>
  );
}