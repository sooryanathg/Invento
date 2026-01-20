export default function heroSectionCard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-2">
      <div className="card relative h-auto min-h-72 md:min-h-80 lg:min-h-80 backdrop-blur-md p-6 opacity-0 translate-y-10 border-t border-r border-b border-white/60">
        <div className="absolute top-0 right-0 w-6 h-6 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
      </div>

      <div className="card relative h-80 backdrop-blur-md p-6 opacity-0 translate-y-10 border-t border-r border-b border-white/60">
        <div className="absolute top-0 right-0 w-6 h-6 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
      </div>

      <div className="card relative h-80 backdrop-blur-md p-6 opacity-0 translate-y-10 border-t border-r border-b border-white/60">
         <div className="absolute top-0 right-0 w-6 h-6 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}></div>
      </div>
    </div>
  );
}
