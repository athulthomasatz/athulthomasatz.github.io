import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  Award,
  Clock,
  Mail,
} from 'lucide-react';
import BlockCard from './BlockCard';
import ExpandModal from './ExpandModal';

const BLOCKS = [
  { id: 'home', title: 'Home', icon: Home },
  { id: 'about', title: 'About', icon: User },
  { id: 'projects', title: 'Projects', icon: Briefcase },
  { id: 'certificates', title: 'Certificates', icon: Award },
  { id: 'experience', title: 'Experience', icon: Clock },
  { id: 'contact', title: 'Contact', icon: Mail },
];

const PREVIEWS = {
  home: (
    <div className="space-y-2">
      <p className="text-white font-medium text-lg">Athul Thomas</p>
      <p className="text-sm">Full-Stack Developer building modern web experiences.</p>
      <div className="flex gap-2 mt-3">
        <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-mono" style={{ color: '#ff9999' }}>React</span>
        <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-mono" style={{ color: '#ff9999' }}>Node.js</span>
        <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-xs font-mono" style={{ color: '#ff9999' }}>TypeScript</span>
      </div>
    </div>
  ),
  about: (
    <div className="space-y-2">
      <p>Passionate developer with expertise in distributed systems and scalable architecture.</p>
      <div className="flex items-center gap-2 text-xs font-mono text-white/50 mt-2">
        <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
        Available for opportunities
      </div>
    </div>
  ),
  projects: (
    <div className="space-y-2">
      <p>Building high-performance applications with modern tech stacks.</p>
      <p className="text-xs font-mono text-white/40 mt-2">{`>`} 12+ projects shipped</p>
    </div>
  ),
  certificates: (
    <div className="space-y-2">
      <p>Certified in cloud platforms, data science, and software engineering.</p>
      <p className="text-xs font-mono text-white/40 mt-2">{`>`} View credentials</p>
    </div>
  ),
  experience: (
    <div className="space-y-2">
      <p>Professional experience across startups and enterprise environments.</p>
      <div className="mt-2 space-y-1">
        <div className="flex justify-between text-xs">
          <span className="text-white/70">Full-Stack Developer</span>
          <span className="text-white/40 font-mono">2022 — Present</span>
        </div>
      </div>
    </div>
  ),
  contact: (
    <div className="space-y-2">
      <p>Let's build something amazing together.</p>
      <p className="text-xs font-mono text-accent mt-2" style={{ color: '#ff9999' }}>athulthomasatz@gmail.com</p>
    </div>
  ),
};

const EXPANDED_PLACEHOLDERS = {
  home: <p className="text-white/60 text-center py-12">Full home content coming soon.</p>,
  about: <p className="text-white/60 text-center py-12">Full about content coming soon.</p>,
  projects: <p className="text-white/60 text-center py-12">Full projects content coming soon.</p>,
  certificates: <p className="text-white/60 text-center py-12">Full certificates content coming soon.</p>,
  experience: <p className="text-white/60 text-center py-12">Full experience content coming soon.</p>,
  contact: <p className="text-white/60 text-center py-12">Full contact content coming soon.</p>,
};

function findBlockInDirection(fromIndex, direction, blockRefs) {
  const fromEl = blockRefs.current[fromIndex];
  if (!fromEl) return fromIndex;

  const fromRect = fromEl.getBoundingClientRect();
  const fromCenter = {
    x: fromRect.left + fromRect.width / 2,
    y: fromRect.top + fromRect.height / 2,
  };

  let bestIndex = fromIndex;
  let bestScore = -Infinity;

  blockRefs.current.forEach((el, i) => {
    if (i === fromIndex || !el) return;
    const rect = el.getBoundingClientRect();
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    const dx = center.x - fromCenter.x;
    const dy = center.y - fromCenter.y;
    let score = -Infinity;

    switch (direction) {
      case 'left':
        if (dx < -20) score = -dx - Math.abs(dy) * 0.8;
        break;
      case 'right':
        if (dx > 20) score = dx - Math.abs(dy) * 0.8;
        break;
      case 'up':
        if (dy < -20) score = -dy - Math.abs(dx) * 0.8;
        break;
      case 'down':
        if (dy > 20) score = dy - Math.abs(dx) * 0.8;
        break;
    }

    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  });

  return bestIndex;
}

export default function DashboardGrid() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const blockRefs = useRef([]);

  // Listen for sidebar block-select events
  useEffect(() => {
    const handleBlockSelect = (e) => {
      const blockId = e.detail;
      const index = BLOCKS.findIndex((b) => b.id === blockId);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    };
    window.addEventListener('block-select', handleBlockSelect);
    return () => window.removeEventListener('block-select', handleBlockSelect);
  }, []);

  // Global keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't intercept if modal is open or user is typing
      if (expandedIndex !== null) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      let nextIndex = selectedIndex;
      let shouldFocus = false;

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          nextIndex = findBlockInDirection(selectedIndex, 'left', blockRefs);
          shouldFocus = true;
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextIndex = findBlockInDirection(selectedIndex, 'right', blockRefs);
          shouldFocus = true;
          break;
        case 'ArrowUp':
          e.preventDefault();
          nextIndex = findBlockInDirection(selectedIndex, 'up', blockRefs);
          shouldFocus = true;
          break;
        case 'ArrowDown':
          e.preventDefault();
          nextIndex = findBlockInDirection(selectedIndex, 'down', blockRefs);
          shouldFocus = true;
          break;
        case 'Home':
          e.preventDefault();
          nextIndex = 0;
          shouldFocus = true;
          break;
        case 'End':
          e.preventDefault();
          nextIndex = BLOCKS.length - 1;
          shouldFocus = true;
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          setExpandedIndex(selectedIndex);
          return;
      }

      if (nextIndex !== selectedIndex) {
        setSelectedIndex(nextIndex);
      }
      if (shouldFocus) {
        // Focus after state update
        setTimeout(() => {
          blockRefs.current[nextIndex]?.focus();
        }, 50);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, expandedIndex]);

  const handleSelect = useCallback((index) => {
    setSelectedIndex(index);
  }, []);

  const handleExpand = useCallback((index) => {
    setExpandedIndex(index);
  }, []);

  const handleCloseModal = useCallback(() => {
    setExpandedIndex(null);
  }, []);

  const expandedBlock = expandedIndex !== null ? BLOCKS[expandedIndex] : null;

  return (
    <>
      {/* Grid */}
      <div
        className="
          grid gap-4 md:gap-5 lg:gap-6
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          w-full
          min-h-0
        "
      >
        {BLOCKS.map((block, index) => {
          const isHome = block.id === 'home';
          const isContact = block.id === 'contact';

          return (
            <div
              key={block.id}
              className={`
                ${isHome ? 'md:col-span-2 lg:col-span-2' : ''}
                ${isContact ? 'md:col-span-2 lg:col-span-3' : ''}
              `}
            >
              <BlockCard
                ref={(el) => { blockRefs.current[index] = el; }}
                id={block.id}
                title={block.title}
                icon={block.icon}
                index={index}
                isSelected={selectedIndex === index}
                onSelect={handleSelect}
                onExpand={handleExpand}
              >
                {PREVIEWS[block.id]}
              </BlockCard>
            </div>
          );
        })}
      </div>

      {/* Expand Modal */}
      <ExpandModal
        isOpen={expandedIndex !== null}
        onClose={handleCloseModal}
        title={expandedBlock?.title}
        icon={expandedBlock?.icon}
      >
        {expandedBlock && EXPANDED_PLACEHOLDERS[expandedBlock.id]}
      </ExpandModal>
    </>
  );
}
