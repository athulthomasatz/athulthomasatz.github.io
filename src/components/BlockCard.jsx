import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const BlockCard = forwardRef(function BlockCard(
  { id, title, icon: Icon, index, isSelected, onSelect, onExpand, children, className = '', badge = null },
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
        y: isSelected ? -4 : 0,
      }}
      transition={{
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`
        relative rounded-xl border p-3 lg:p-4 outline-none overflow-hidden
        transition-colors duration-200 flex flex-col
        focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-0
        ${
          isSelected
            ? 'border-accent/50 bg-surface-elevated/80'
            : 'border-white/10 bg-surface-elevated hover:border-white/20'
        }
        ${className}
      `}
      style={
        isSelected
          ? {
              boxShadow:
                '0 0 20px rgba(255,255,255,0.15), 0 0 40px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)',
            }
          : {
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }
      }
    >
      {/* Header: UPPERCASE title left, badge center (if any), category icon right */}
      <div className="flex items-center justify-between mb-2 lg:mb-3">
        <h3
          className="
            text-xs font-mono font-medium tracking-[0.15em] uppercase
            text-white/50
          "
        >
          {title}
        </h3>

        <div className="flex items-center gap-2">
          {badge && (
            <span className="px-2 py-0.5 rounded border border-white/20 text-[10px] font-mono tracking-wider uppercase text-white/70">
              {badge}
            </span>
          )}
          <div
            className={`
              w-7 h-7 rounded-md flex items-center justify-center shrink-0
              transition-colors duration-200
              ${isSelected ? 'text-accent' : 'text-white/30'}
            `}
            style={{ color: isSelected ? '#ffffff' : '#555555' }}
          >
            <Icon size={15} strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-sm text-text-secondary leading-relaxed flex-1 flex flex-col min-h-0">
        {children}
      </div>

      {/* Expand button — bottom right, external link style */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onExpand(index);
        }}
        aria-label={`Expand ${title}`}
        aria-expanded={false}
        className={`
          absolute bottom-4 right-4
          w-7 h-7 rounded-md flex items-center justify-center
          transition-all duration-200 outline-none
          focus-visible:ring-2 focus-visible:ring-accent/60
          ${
            isSelected
              ? 'text-accent hover:bg-accent/10'
              : 'text-white/20 hover:text-white/60 hover:bg-white/5'
          }
        `}
        style={{ color: isSelected ? '#ffffff' : '#555555' }}
      >
        <ExternalLink size={14} strokeWidth={1.5} />
      </button>
    </motion.div>
  );
});

export default BlockCard;
