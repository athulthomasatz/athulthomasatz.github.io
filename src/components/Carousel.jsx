import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Carousel({ items, renderItem }) {
  const [index, setIndex] = useState(0);

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className="relative">
      {/* Slide container */}
      <div className="rounded-lg border border-white/10 bg-black/40 p-4 min-h-[140px] flex flex-col justify-center">
        {renderItem(items[index])}
      </div>

      {/* Direction buttons */}
      {items.length > 1 && (
        <div className="flex items-center justify-end gap-2 mt-3">
          <button
            onClick={goPrev}
            aria-label="Previous"
            className="
              w-7 h-7 rounded-md flex items-center justify-center
              border border-white/10 bg-white/5
              text-white/40 hover:text-white hover:bg-white/10
              transition-colors duration-200 outline-none
              focus-visible:ring-2 focus-visible:ring-white/40
            "
          >
            <ChevronLeft size={14} strokeWidth={1.5} />
          </button>

          <span className="text-xs font-mono text-white/30 tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>

          <button
            onClick={goNext}
            aria-label="Next"
            className="
              w-7 h-7 rounded-md flex items-center justify-center
              border border-white/10 bg-white/5
              text-white/40 hover:text-white hover:bg-white/10
              transition-colors duration-200 outline-none
              focus-visible:ring-2 focus-visible:ring-white/40
            "
          >
            <ChevronRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  );
}
