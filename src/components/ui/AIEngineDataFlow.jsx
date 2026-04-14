import { motion } from "framer-motion";
import {
  Database,
  Zap,
  FileCode,
  Cpu,
  BarChart3,
  Bell,
  Sparkles
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

const PremiumNode = ({ icon: Icon, title, subtitle, position, id }) => {
  const isCenter = position === "center";

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: isCenter ? 0 : 0.2, ease: "easeOut" }}
      className={`relative flex items-center bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-500 group
        hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(251,191,36,0.08)] hover:border-amber-300/50
        ${isCenter 
          ? 'w-60 h-60 rounded-full flex-col justify-center text-center p-6 z-20 gap-3' // Perfect Circle for Center
          : 'w-72 h-auto rounded-[2rem] p-2.5 pr-6 gap-4 z-10' // Capsule shape for Left/Right
        }
      `}
    >
      {/* Icon Container */}
      <div className={`relative flex items-center justify-center transition-all duration-500
        ${isCenter 
          ? 'w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-100 group-hover:border-amber-300 shadow-inner' 
          : 'p-4 rounded-2xl bg-slate-50 border border-slate-100 group-hover:bg-amber-50 group-hover:border-amber-200'}
      `}>
        <Icon className={`transition-colors duration-500 
          ${isCenter ? 'w-10 h-10 text-amber-500' : 'w-6 h-6 text-slate-500 group-hover:text-amber-600'}
        `} />
        
        {/* Soft Breathing Glow in Center Icon */}
        {isCenter && (
          <motion.div
            animate={{ opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-amber-400 blur-xl z-[-1]"
          />
        )}
      </div>

      {/* Text Info */}
      <div className={`relative z-10 flex flex-col ${isCenter ? 'items-center mt-1' : 'items-start'}`}>
        <span className={`font-bold tracking-tight text-slate-800 ${isCenter ? 'text-xl' : 'text-base'}`}>
          {title}
        </span>
        <span className={`font-medium ${isCenter ? 'text-slate-500 text-sm mt-0.5' : 'text-slate-400 text-xs'}`}>
          {subtitle}
        </span>
      </div>

      {/* Connection Ports */}
      {position === "left" && (
        <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4 rounded-full bg-white border-2 border-slate-200 group-hover:border-amber-400 transition-colors shadow-sm z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-amber-500 transition-colors" />
        </div>
      )}
      {position === "right" && (
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4 rounded-full bg-white border-2 border-slate-200 group-hover:border-amber-400 transition-colors shadow-sm z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-amber-500 transition-colors" />
        </div>
      )}
      {isCenter && (
        <>
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4 rounded-full bg-white border-2 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)] z-10">
             <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          </div>
          <div className="absolute -right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-4 h-4 rounded-full bg-white border-2 border-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.3)] z-10">
             <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          </div>
        </>
      )}
    </motion.div>
  );
};

const StaticConnectionLine = ({ fromId, toId, containerRef, reverse = false }) => {
  const [path, setPath] = useState("");

  useEffect(() => {
    const updatePath = () => {
      const fromEl = document.getElementById(fromId);
      const toEl = document.getElementById(toId);
      const container = containerRef.current;

      if (fromEl && toEl && container) {
        const fromRect = fromEl.getBoundingClientRect();
        const toRect = toEl.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        let startX, startY, endX, endY;

        if (reverse) {
          startX = fromRect.right - containerRect.left;
          startY = fromRect.top + fromRect.height / 2 - containerRect.top;
          endX = toRect.left - containerRect.left;
          endY = toRect.top + toRect.height / 2 - containerRect.top;
        } else {
          startX = fromRect.right - containerRect.left;
          startY = fromRect.top + fromRect.height / 2 - containerRect.top;
          endX = toRect.left - containerRect.left;
          endY = toRect.top + toRect.height / 2 - containerRect.top;
        }

        const cp1x = startX + (endX - startX) * 0.4;
        const cp1y = startY;
        const cp2x = startX + (endX - startX) * 0.6;
        const cp2y = endY;

        setPath(`M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`);
      }
    };

    updatePath();
    const observer = new ResizeObserver(updatePath);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener('resize', updatePath);

    return () => {
      window.removeEventListener('resize', updatePath);
      observer.disconnect();
    };
  }, [fromId, toId, containerRef, reverse]);

  return (
    <g>
      {/* Subtle Base Line */}
      <path
        d={path}
        fill="none"
        stroke="#f1f5f9" // very faint slate-100
        strokeWidth="3"
      />
      
      {/* Elegant Solid Draw-in Line (No continuous running animation) */}
      <motion.path
        d={path}
        fill="none"
        stroke="url(#golden-gradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: reverse ? 1 : 0.2 }}
      />
    </g>
  );
};

export default function WhiteThemeDataFlow() {
  const containerRef = useRef(null);

  return (
    <section className="bg-[#fafafa] flex flex-col items-center justify-center p-4 md:p-12 py-32 overflow-hidden relative w-full min-h-screen font-sans">
      
      {/* Dotted Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,191,36,0.05)_0%,transparent_50%)] pointer-events-none" />

      {/* Heading */}
      <div className="text-center mb-24 relative z-10 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-200 bg-amber-50 mb-6 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Enterprise Architecture</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm pb-2">
          Delta <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-amber-700">AI Ecosystem</span>
        </h2>
        <p className="text-slate-500 mt-4 max-w-xl text-sm md:text-base font-medium">
          Unified pipeline processing data intelligently in real-time.
        </p>
      </div>

      <div ref={containerRef} className="relative flex flex-col xl:flex-row items-center justify-between w-full max-w-7xl gap-16 xl:gap-0">

        {/* SVG Path Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden xl:block">
          <defs>
            <linearGradient id="golden-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fcd34d" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
              <stop offset="100%" stopColor="#fcd34d" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          
          <StaticConnectionLine fromId="input-1" toId="center-node" containerRef={containerRef} />
          <StaticConnectionLine fromId="input-2" toId="center-node" containerRef={containerRef} />
          <StaticConnectionLine fromId="input-3" toId="center-node" containerRef={containerRef} />
          <StaticConnectionLine fromId="center-node" toId="output-1" containerRef={containerRef} reverse />
          <StaticConnectionLine fromId="center-node" toId="output-2" containerRef={containerRef} reverse />
        </svg>

        {/* Inputs Column */}
        <div className="flex flex-col gap-6 md:gap-8 z-10 w-full xl:w-auto items-center">
          <PremiumNode id="input-1" icon={Database} title="User Data" subtitle="PostgreSQL" position="left" />
          <PremiumNode id="input-2" icon={Zap} title="Live Events" subtitle="Webhooks" position="left" />
          <PremiumNode id="input-3" icon={FileCode} title="Assets" subtitle="S3 Storage" position="left" />
        </div>

        {/* CIRCULAR CENTER NODE */}
        <div className="z-10 flex justify-center w-full xl:w-auto my-12 xl:my-0 relative">
          {/* Circular Decorative Rings */}
          <div className="absolute inset-0 border border-amber-200/40 rounded-full scale-[1.15] -z-10 shadow-[0_0_20px_rgba(251,191,36,0.1)]" />
          <div className="absolute inset-0 border border-slate-200/50 rounded-full scale-[1.3] -z-10" />
          
          <PremiumNode id="center-node" icon={Cpu} title="Delta AI Engine" subtitle="Neural Processing Core" position="center" />
        </div>

        {/* Outputs Column */}
        <div className="flex flex-col gap-6 md:gap-8 z-10 w-full xl:w-auto items-center">
          <PremiumNode id="output-1" icon={BarChart3} title="Insights" subtitle="Analytics Dashboard" position="right" />
          <PremiumNode id="output-2" icon={Bell} title="Alerts" subtitle="Slack / Email" position="right" />
        </div>

      </div>
    </section>
  );
}