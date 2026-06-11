import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Home,
  User,
  Briefcase,
  Award,
  Clock,
  Image,
  Activity,
} from 'lucide-react';
import BlockCard from './BlockCard';
import ExpandModal from './ExpandModal';

const BLOCKS = [
  { id: 'home', title: 'ID: HOME_SYS', icon: Home },
  { id: 'about', title: 'SYS_INFO', icon: User },
  { id: 'avatar', title: 'AVATAR_3PC', icon: Image },
  { id: 'experience', title: 'EXECUTION_HISTORY', icon: Clock },
  { id: 'projects', title: 'ACTIVE_PROJECTS', icon: Briefcase },
  { id: 'certificates', title: 'CERTIFICATES', icon: Award },
  { id: 'reliability', title: 'SYS_METRICS', icon: Activity },
];

const PROJECTS = [
  { name: 'TERMINAL_EMU_V2', tech: ['RUST', 'TYPESCRIPT'], desc: 'High-performance terminal emulator with GPU acceleration.' },
  { name: 'DATA_PIPELINE', tech: ['PYTHON', 'GO'], desc: 'Distributed event processing handling 10M+ events/sec.' },
];

const CERTS = [
  { name: 'AWS_ARCH_PRO', year: '2024' },
  { name: 'CKA_CERTIFIED', year: '2023' },
  { name: 'OFFSEC_OSCP', year: '2023' },
];

const EXPERIENCE = [
  {
    role: 'SENIOR_ENGINEER',
    company: 'VOID_CORP',
    period: '2022–PRESENT',
    desc: 'Architected distributed systems processing 10M+ events/sec. Reduced latency by 40% through aggressive caching and memory pooling.',
  },
  {
    role: 'SYS_ADMIN',
    company: 'NEURAL_NET',
    period: '2021–2022',
    desc: 'Maintained bare-metal clusters. Automated deployment pipelines using Ansible and custom bash scripts. Zero downtime recorded.',
  },
];

const SKILLS = ['RUST', 'TYPESCRIPT', 'GOLANG', 'KUBERNETES', 'AWS'];

/* ─── Previews (compact, single-page, no scroll) ─── */

const HomePreview = () => (
  <div className="flex flex-col h-full justify-between gap-3">
    <div className="space-y-2">
      <p className="text-white font-mono text-xl lg:text-2xl font-bold tracking-tight">
        <span className="text-white/40 mr-1">&gt;</span>HELLO_WORLD
      </p>
      <p className="text-xs text-text-secondary leading-relaxed line-clamp-3">
        I am a Full-Stack Systems Engineer specializing in high-performance
        computing, brutalist interfaces, and scalable architectures.
        Data-driven and precision-focused.
      </p>
    </div>

    <div className="flex flex-wrap gap-2">
      <a
        href="mailto:athulthomasatz@gmail.com"
        className="inline-flex items-center px-3 py-1.5 rounded border border-white/20 bg-white text-black text-[10px] font-mono font-semibold tracking-wider uppercase hover:bg-white/90 transition-colors"
      >
        INITIATE_CONTACT
      </a>
      <button
        onClick={() => window.open('/v1/index.html', '_blank')}
        className="inline-flex items-center px-3 py-1.5 rounded border border-white/10 text-[10px] font-mono tracking-wider uppercase text-white/60 hover:bg-white/5 hover:text-white transition-colors"
      >
        VIEW_LOGS
      </button>
    </div>
  </div>
);

const SysInfoPreview = () => (
  <div className="flex flex-col h-full justify-between gap-2">
    <div className="space-y-2">
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-white/40">LOCATION:</span>
          <span className="text-white/70">SECTOR_76 // TOKYO</span>
        </div>
        <div className="flex justify-between text-[10px] font-mono">
          <span className="text-white/40">UPTIME:</span>
          <span className="text-white/70">8_YEARS (PROFESSIONAL)</span>
        </div>
      </div>

      <div>
        <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider mb-1.5">
          CORE_MODULES:
        </p>
        <div className="flex flex-wrap gap-1">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[9px] font-mono tracking-wider text-white/60"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const AvatarPreview = () => (
  <div className="flex flex-col h-full">
    <div className="flex-1 rounded border border-white/10 bg-black/60 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.03) 1px, rgba(255,255,255,0.03) 2px)',
      }} />
      <div className="w-12 h-12 rounded border border-white/20 flex items-center justify-center">
        <User size={20} className="text-white/20" />
      </div>
    </div>
    <p className="text-[8px] font-mono text-white/30 tracking-wider mt-1.5">
      AVATAR.JPG
    </p>
  </div>
);

const ExperiencePreview = () => (
  <div className="space-y-2">
    {EXPERIENCE.map((job) => (
      <div key={job.role} className="space-y-0.5">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[10px] font-mono font-semibold text-white tracking-wide truncate">
            {job.role} <span className="text-white/30">@</span> {job.company}
          </p>
          <span className="text-[9px] font-mono text-white/30 shrink-0">{job.period}</span>
        </div>
        <p className="text-[10px] text-text-secondary leading-relaxed line-clamp-2">{job.desc}</p>
      </div>
    ))}
  </div>
);

const ProjectsPreview = () => (
  <div className="flex flex-col h-full justify-between gap-2">
    <div className="grid grid-cols-2 gap-2">
      {PROJECTS.map((project) => (
        <div
          key={project.name}
          className="rounded border border-white/10 bg-black/30 p-2 space-y-1"
        >
          <p className="text-[10px] font-mono font-semibold text-white tracking-wide truncate">
            {project.name}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-1 py-0.5 rounded border border-white/10 text-[8px] font-mono tracking-wider text-white/50"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CertificatesPreview = () => (
  <div className="space-y-1">
    {CERTS.map((cert) => (
      <div key={cert.name} className="flex items-center gap-1.5">
        <span className="text-white/30 text-[10px]">&gt;</span>
        <p className="text-[10px] font-mono text-white truncate">{cert.name}</p>
      </div>
    ))}
  </div>
);

const ReliabilityPreview = () => (
  <div className="flex flex-col h-full items-center justify-center gap-1">
    <span className="text-2xl lg:text-3xl font-mono font-bold text-white tracking-tight">
      99.9<span className="text-sm">%</span>
    </span>
    <p className="text-[8px] font-mono text-white/30 uppercase tracking-wider text-center">
      SYSTEM_RELIABILITY
    </p>
  </div>
);

const PREVIEWS = {
  home: <HomePreview />,
  about: <SysInfoPreview />,
  avatar: <AvatarPreview />,
  experience: <ExperiencePreview />,
  projects: <ProjectsPreview />,
  certificates: <CertificatesPreview />,
  reliability: <ReliabilityPreview />,
};

const EXPANDED_PLACEHOLDERS = {
  home: <p className="text-white/60 text-center py-12">Full home content coming soon.</p>,
  about: <p className="text-white/60 text-center py-12">Full about content coming soon.</p>,
  avatar: <p className="text-white/60 text-center py-12">Avatar content coming soon.</p>,
  experience: <p className="text-white/60 text-center py-12">Full experience content coming soon.</p>,
  projects: <p className="text-white/60 text-center py-12">Full projects content coming soon.</p>,
  certificates: <p className="text-white/60 text-center py-12">Full certificates content coming soon.</p>,
  reliability: <p className="text-white/60 text-center py-12">Metrics content coming soon.</p>,
};

/* ─── Keyboard navigation helper ─── */

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

/* ─── BlockCard wrapper with ref capture ─── */

function BlockCardWrapper({ block, index, isSelected, onSelect, onExpand, blockRefs, className = '' }) {
  const isHome = block.id === 'home';
  return (
    <BlockCard
      ref={(el) => { blockRefs.current[index] = el; }}
      id={block.id}
      title={block.title}
      icon={block.icon}
      index={index}
      isSelected={isSelected}
      onSelect={onSelect}
      onExpand={onExpand}
      badge={isHome ? 'ACTIVE' : null}
      className={className}
    >
      {PREVIEWS[block.id]}
    </BlockCard>
  );
}

/* ─── Component ─── */

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

  const getBlockIndex = (id) => BLOCKS.findIndex((b) => b.id === id);
  const isBlockSelected = (id) => selectedIndex === getBlockIndex(id);

  return (
    <>
      {/* Nested 2-column main stage — non-scrolling */}
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1.8fr] gap-3 h-full w-full overflow-hidden">

        {/* ─── LEFT COLUMN ─── */}
        <div className="grid grid-rows-[1.2fr_1fr] gap-3 min-h-0">
          {/* HOME_SYS */}
          <BlockCardWrapper
            block={BLOCKS[0]}
            index={0}
            isSelected={isBlockSelected('home')}
            onSelect={handleSelect}
            onExpand={handleExpand}
            blockRefs={blockRefs}
            className="h-full"
          />
          {/* EXECUTION_HISTORY */}
          <BlockCardWrapper
            block={BLOCKS[3]}
            index={3}
            isSelected={isBlockSelected('experience')}
            onSelect={handleSelect}
            onExpand={handleExpand}
            blockRefs={blockRefs}
            className="h-full"
          />
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="grid grid-rows-[1.1fr_1fr] gap-3 min-h-0">

          {/* Right Top: SYS_INFO + AVATAR */}
          <div className="grid grid-cols-[2fr_1fr] gap-3 min-h-0">
            <BlockCardWrapper
              block={BLOCKS[1]}
              index={1}
              isSelected={isBlockSelected('about')}
              onSelect={handleSelect}
              onExpand={handleExpand}
              blockRefs={blockRefs}
              className="h-full"
            />
            <BlockCardWrapper
              block={BLOCKS[2]}
              index={2}
              isSelected={isBlockSelected('avatar')}
              onSelect={handleSelect}
              onExpand={handleExpand}
              blockRefs={blockRefs}
              className="h-full"
            />
          </div>

          {/* Right Bottom: ACTIVE_PROJECTS + bottom strip */}
          <div className="grid grid-rows-[1.4fr_1fr] gap-3 min-h-0">
            <BlockCardWrapper
              block={BLOCKS[4]}
              index={4}
              isSelected={isBlockSelected('projects')}
              onSelect={handleSelect}
              onExpand={handleExpand}
              blockRefs={blockRefs}
              className="h-full"
            />

            {/* Bottom Strip: CERTIFICATES + 99.9% */}
            <div className="grid grid-cols-[2fr_1fr] gap-3 min-h-0">
              <BlockCardWrapper
                block={BLOCKS[5]}
                index={5}
                isSelected={isBlockSelected('certificates')}
                onSelect={handleSelect}
                onExpand={handleExpand}
                blockRefs={blockRefs}
                className="h-full"
              />
              <BlockCardWrapper
                block={BLOCKS[6]}
                index={6}
                isSelected={isBlockSelected('reliability')}
                onSelect={handleSelect}
                onExpand={handleExpand}
                blockRefs={blockRefs}
                className="h-full"
              />
            </div>
          </div>

        </div>

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
