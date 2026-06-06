import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

const BlockCard = forwardRef(function BlockCard(
  { id, title, icon: Icon, index, isSelected, onSelect, onExpand, children, className = '' },
  ref
) {
  return (
    <motion.div
      ref={ref}
      data-block-index={index}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`${title} section. Press Enter to expand.`}
      onClick={() => onSelect(index)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onExpand(index);
        }
      }}
      animate={{
        scale: isSelected ? 1.02 : 1,
        y: isSelected ? -4 : 0,
      }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        relative rounded-xl border p-6 outline-none
        transition-colors duration-200
        focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-0
        ${
          isSelected
            ? 'border-accent/50 bg-surface-container/80'
            : 'border-white/10 bg-surface-container hover:border-white/20'
        }
        ${className}
      `}
      style={
        isSelected
          ? {
              boxShadow:
                '0 0 20px rgba(0,240,255,0.15), 0 0 40px rgba(0,240,255,0.08), inset 0 1px 0 rgba(0,240,255,0.1)',
            }
          : {
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            }
      }
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className={`
              w-9 h-9 rounded-lg flex items-center justify-center shrink-0
              transition-colors duration-200
              ${isSelected ? 'bg-accent/15 text-accent' : 'bg-white/5 text-text-secondary'}
            `}
            style={{ color: isSelected ? '#00f0ff' : '#a1a1aa' }}
          >
            <Icon size={18} strokeWidth={isSelected ? 2.5 : 2} />
          </div>
          <h3
            className={`
              font-semibold text-base tracking-tight
              transition-colors duration-200
              ${isSelected ? 'text-white' : 'text-white/90'}
            `}
          >
            {title}
          </h3>
        </div>

        {/* Expand Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onExpand(index);
          }}
          aria-label={`Expand ${title}`}
          aria-expanded={false}
          className={`
            w-8 h-8 rounded-lg flex items-center justify-center
            transition-all duration-200 outline-none
            focus-visible:ring-2 focus-visible:ring-accent/60
            ${
              isSelected
                ? 'text-accent hover:bg-accent/10'
                : 'text-text-secondary hover:text-white hover:bg-white/5'
            }
          `}
          style={{ color: isSelected ? '#00f0ff' : '#a1a1aa' }}
        >
          <Maximize2 size={15} />
        </button>
      </div>

      {/* Content */}
      <div className="text-sm text-text-secondary leading-relaxed">
        {children}
      </div>
    </motion.div>
  );
});

export default BlockCard;
