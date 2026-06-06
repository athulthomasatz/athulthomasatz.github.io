import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  Award,
  Clock,
  Mail,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'experience', label: 'Experience', icon: Clock },
  { id: 'contact', label: 'Contact', icon: Mail },
];

const STORAGE_KEY = 'sidebar-collapsed';
const TRAVEL_DURATION = 500;

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(STORAGE_KEY) === 'true';
  });
  const [activeSection, setActiveSection] = useState('home');
  const navRef = useRef(null);
  const lineRef = useRef(null);

  // Orb-to-beam handoff state
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelY, setTravelY] = useState({ from: 0, to: 0 });
  const travelTimeoutRef = useRef(null);

  // Scroll spy with IntersectionObserver
  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.getElementById(item.id)
    ).filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Persist collapse state + sync CSS variable for main content margin
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isCollapsed));
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isCollapsed ? '72px' : '260px'
    );
  }, [isCollapsed]);

  // Set initial CSS variable on mount
  useEffect(() => {
    document.documentElement.style.setProperty(
      '--sidebar-width',
      isCollapsed ? '72px' : '260px'
    );
  }, []);

  const itemRefs = useRef([]);

  const scrollToSection = useCallback(
    (id) => {
      if (id === activeSection) return;

      const targetEl = document.getElementById(id);
      if (!targetEl) return;

      // Cancel any in-progress travel
      if (travelTimeoutRef.current) {
        clearTimeout(travelTimeoutRef.current);
      }

      // Measure start and end positions relative to line container
      const fromIndex = NAV_ITEMS.findIndex((i) => i.id === activeSection);
      const toIndex = NAV_ITEMS.findIndex((i) => i.id === id);
      const fromEl = itemRefs.current[fromIndex];
      const toEl = itemRefs.current[toIndex];
      const lineEl = lineRef.current;

      if (fromEl && toEl && lineEl) {
        const lineRect = lineEl.getBoundingClientRect();
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();

        setTravelY({
          from: fromRect.top - lineRect.top + fromRect.height / 2 - 4,
          to: toRect.top - lineRect.top + toRect.height / 2 - 4,
        });
      }

      setIsTraveling(true);
      targetEl.scrollIntoView({ behavior: 'smooth' });

      travelTimeoutRef.current = setTimeout(() => {
        setIsTraveling(false);
      }, TRAVEL_DURATION);
    },
    [activeSection]
  );

  // Keyboard navigation within nav list
  const handleKeyDown = useCallback(
    (e, index) => {
      const items = NAV_ITEMS;
      let nextIndex = index;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextIndex = (index + 1) % items.length;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        nextIndex = (index - 1 + items.length) % items.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        nextIndex = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        nextIndex = items.length - 1;
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToSection(items[index].id);
        return;
      }

      if (nextIndex !== index) {
        const nextEl = navRef.current?.querySelector(
          `[data-nav-index="${nextIndex}"]`
        );
        nextEl?.focus();
      }
    },
    [scrollToSection]
  );

  const sidebarWidth = isCollapsed ? '72px' : '260px';

  return (
    <aside
      className="hidden md:flex flex-col fixed left-0 top-0 h-screen bg-surface-container border-r border-white/5 z-40"
      style={{
        width: sidebarWidth,
        transition: 'width 250ms ease-in-out',
      }}
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Logo / Brand */}
      <div
        className="flex items-center h-16 px-5 border-b border-white/5 shrink-0 overflow-hidden"
        style={{ transition: 'padding 250ms ease-in-out' }}
      >
        <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shrink-0">
          <span className="text-surface font-bold text-sm font-mono">AT</span>
        </div>
        <span
          className={`
            ml-3 font-semibold text-white whitespace-nowrap overflow-hidden
            transition-all duration-200 ease-in-out
            ${isCollapsed ? 'opacity-0 w-0 ml-0' : 'opacity-100 w-auto ml-3'}
          `}
        >
          Athul Thomas
        </span>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 py-6 px-3 relative" ref={navRef}>
        {/* Vertical Glowing Line */}
        <div
          ref={lineRef}
          className="absolute left-[21px] top-6 bottom-6 w-px bg-white/10 rounded-full"
        >
          <AnimatePresence>
            {isTraveling && (
              <>
                {/* Traveling Glow Orb */}
                <motion.div
                  key="orb"
                  initial={{ opacity: 0, scale: 0.5, top: travelY.from }}
                  animate={{ opacity: 1, scale: 1, top: travelY.to }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{
                    duration: TRAVEL_DURATION / 1000,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: '#00f0ff',
                    boxShadow:
                      '0 0 6px 2px #00f0ff, 0 0 12px 4px rgba(0,240,255,0.5), 0 0 24px 8px rgba(0,240,255,0.2)',
                  }}
                />
                {/* Glow trail */}
                <motion.div
                  key="trail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: TRAVEL_DURATION / 1000,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className="absolute left-1/2 -translate-x-1/2 w-px rounded-full"
                  style={{
                    top: travelY.from,
                    height: Math.abs(travelY.to - travelY.from),
                    background:
                      'linear-gradient(180deg, transparent, #00f0ff 20%, #00f0ff 80%, transparent)',
                  }}
                />
              </>
            )}
          </AnimatePresence>
        </div>

        <ul className="space-y-3" role="menubar">
          {NAV_ITEMS.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <li key={item.id} role="none">
                <button
                  ref={(el) => { itemRefs.current[index] = el; }}
                  data-nav-index={index}
                  role="link"
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => scrollToSection(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  tabIndex={0}
                  className={`
                    relative w-full flex items-center rounded-lg px-3 py-3
                    text-left outline-none
                    transition-colors duration-200 ease-in-out
                    focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-0
                    ${
                      isActive
                        ? 'text-white bg-white/5'
                        : 'hover:text-white hover:bg-white/5'
                    }
                  `}
                  style={{ color: isActive ? '#ffffff' : '#a1a1aa' }}
                >
                  {/* Active Indicator Beam — only when NOT traveling */}
                  {isActive && !isTraveling && (
                    <div
                      className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                      style={{
                        backgroundColor: '#00f0ff',
                        boxShadow:
                          '0 0 8px #00f0ff, 0 0 16px rgba(0,240,255,0.4), 0 0 32px rgba(0,240,255,0.15)',
                      }}
                    />
                  )}

                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className="shrink-0"
                  />

                  <span
                    className={`
                      whitespace-nowrap overflow-hidden font-medium text-sm
                      transition-all duration-200 ease-in-out
                      ${
                        isCollapsed
                          ? 'opacity-0 w-0 ml-0'
                          : 'opacity-100 w-auto ml-3'
                      }
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-white/5 shrink-0">
        <button
          onClick={() => setIsCollapsed((c) => !c)}
          aria-expanded={!isCollapsed}
          aria-label="Toggle sidebar"
          className="
            w-full flex items-center justify-center rounded-lg px-3 py-3
            hover:bg-white/5
            transition-colors duration-200 ease-in-out
            outline-none focus-visible:ring-2 focus-visible:ring-accent/60
          "
          style={{ color: '#a1a1aa' }}
        >
          <span className="shrink-0 transition-transform duration-200">
            {isCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
          </span>
          <span
            className={`
              whitespace-nowrap overflow-hidden text-sm font-medium
              transition-all duration-200 ease-in-out
              ${isCollapsed ? 'opacity-0 w-0 ml-0' : 'opacity-100 w-auto ml-3'}
            `}
          >
            Collapse
          </span>
        </button>
      </div>
    </aside>
  );
}
