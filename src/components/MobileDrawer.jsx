import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  Award,
  Clock,
  Mail,
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'certificates', label: 'Certificates', icon: Award },
  { id: 'experience', label: 'Experience', icon: Clock },
  { id: 'contact', label: 'Contact', icon: Mail },
];

export default function MobileDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const drawerRef = useRef(null);
  const hamburgerRef = useRef(null);
  const lastFocusedRef = useRef(null);

  // Listen for block-select from dashboard grid
  useEffect(() => {
    const handleBlockSelect = (e) => {
      setActiveSection(e.detail);
    };
    window.addEventListener('block-select', handleBlockSelect);
    return () => window.removeEventListener('block-select', handleBlockSelect);
  }, []);

  const scrollToSection = useCallback(
    (id) => {
      window.dispatchEvent(new CustomEvent('block-select', { detail: id }));
      setActiveSection(id);
      setIsOpen(false);
    },
    []
  );

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    // Store last focused element before opening
    lastFocusedRef.current = document.activeElement;

    // Focus first focusable element in drawer
    const focusable = drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (e.key !== 'Tab') return;

      const focusables = Array.from(
        drawer.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Return focus to hamburger when closing
      lastFocusedRef.current?.focus();
    };
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        ref={hamburgerRef}
        onClick={() => setIsOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-surface-container border border-white/10 flex items-center justify-center text-white hover:bg-white/5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
      >
        <Menu size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer */}
            <motion.div
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="md:hidden fixed left-0 top-0 h-screen w-[280px] bg-surface-container border-r border-white/10 z-50 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between h-16 px-5 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                    <span className="text-surface font-bold text-sm font-mono">
                      AT
                    </span>
                  </div>
                  <span className="font-semibold text-white">Athul Thomas</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/5 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  style={{ color: '#a1a1aa' }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* Nav Items */}
              <nav className="flex-1 py-6 px-3">
                <ul className="space-y-1" role="menubar">
                  {NAV_ITEMS.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;

                    return (
                      <li key={item.id} role="none">
                        <button
                          role="link"
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => scrollToSection(item.id)}
                          className={`
                            relative w-full flex items-center gap-3 rounded-lg px-3 py-3
                            text-left outline-none
                            transition-colors duration-200 ease-in-out
                            focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-0
                            ${
                              isActive
                                ? 'text-white bg-white/5'
                                : 'text-text-secondary hover:text-white hover:bg-white/5'
                            }
                          `}
                          style={{ color: isActive ? '#ffffff' : '#a1a1aa' }}
                        >
                          {/* Active Indicator */}
                          {isActive && (
                            <motion.div
                              layoutId="mobileActiveIndicator"
                              className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                              style={{
                                backgroundColor: '#ff9999',
                                boxShadow:
                                  '0 0 8px #ff9999, 0 0 16px rgba(255,153,153,0.4)',
                              }}
                              transition={{
                                type: 'spring',
                                stiffness: 380,
                                damping: 30,
                              }}
                            />
                          )}

                          <Icon
                            size={20}
                            strokeWidth={isActive ? 2.5 : 2}
                            className="shrink-0"
                          />
                          <span className="font-medium text-sm">
                            {item.label}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
