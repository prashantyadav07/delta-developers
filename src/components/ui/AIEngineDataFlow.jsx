/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "framer-motion";
import { 
  Database, 
  Zap, 
  FileCode, 
  Cpu, 
  BarChart3, 
  Bell
} from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

const Node = ({ icon: Icon, title, subtitle, position, id }) => {
  const isCenter = position === "center";
  
  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: isCenter ? 0 : 0.2 }}
      className={`relative flex items-center gap-4 p-4 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm shadow-2xl transition-colors hover:border-white/20 group
        ${isCenter ? 'w-64 h-40 flex-col justify-center text-center' : 'w-64 h-24'}
      `}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
      
      <div className={`relative z-10 flex items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-primary/50 transition-colors
        ${isCenter ? 'mb-2' : ''}
      `}>
        <Icon className={`w-6 h-6 ${isCenter ? 'text-primary' : 'text-white/70'}`} />
        {isCenter && (
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 rounded-xl bg-primary/20 blur-md"
            />
        )}
      </div>
      
      <div className="relative z-10 flex flex-col">
        <span className="text-sm font-semibold text-white tracking-tight">{title}</span>
        <span className="text-xs text-white/40 font-medium">{subtitle}</span>
      </div>

      {/* Connection points */}
      {position === "left" && (
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary border border-background shadow-sm shadow-primary" />
      )}
      {position === "right" && (
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary border border-background shadow-sm shadow-primary" />
      )}
      {isCenter && (
        <>
          <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary border border-background shadow-sm shadow-primary" />
          <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary border border-background shadow-sm shadow-primary" />
        </>
      )}
    </motion.div>
  );
};

const ConnectionLine = ({ fromId, toId, containerRef, reverse = false }) => {
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

        // Determine start and end points based on relative positions
        let startX, startY, endX, endY;

        if (reverse) {
          // Center to Right
          startX = fromRect.right - containerRect.left;
          startY = fromRect.top + fromRect.height / 2 - containerRect.top;
          endX = toRect.left - containerRect.left;
          endY = toRect.top + toRect.height / 2 - containerRect.top;
        } else {
          // Left to Center
          startX = fromRect.right - containerRect.left;
          startY = fromRect.top + fromRect.height / 2 - containerRect.top;
          endX = toRect.left - containerRect.left;
          endY = toRect.top + toRect.height / 2 - containerRect.top;
        }

        const cp1x = startX + (endX - startX) * 0.5;
        const cp1y = startY;
        const cp2x = startX + (endX - startX) * 0.5;
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
      <motion.path
        d={path}
        fill="none"
        stroke="var(--color-primary)"
        strokeOpacity="0.2"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
      />
      <motion.path
        d={path}
        fill="none"
        stroke="url(#gradient)"
        strokeWidth="2"
        strokeDasharray="10 20"
        initial={{ strokeDashoffset: 100, opacity: 0 }}
        animate={{ strokeDashoffset: 0, opacity: 1 }}
        transition={{ 
          strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
          opacity: { duration: 1 }
        }}
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0" />
          <stop offset="50%" stopColor="var(--color-primary)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
    </g>
  );
};

export default function AIEngineDataFlow() {
  const containerRef = useRef(null);

  return (
    <section className="bg-background flex items-center justify-center p-4 md:p-12 py-32 overflow-hidden relative w-full">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-5 pointer-events-none" />
      
      <div ref={containerRef} className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-6xl gap-16 md:gap-24">
        
        {/* SVG Layer for Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden md:block">
          <ConnectionLine fromId="input-1" toId="center-node" containerRef={containerRef} />
          <ConnectionLine fromId="input-2" toId="center-node" containerRef={containerRef} />
          <ConnectionLine fromId="input-3" toId="center-node" containerRef={containerRef} />
          <ConnectionLine fromId="center-node" toId="output-1" containerRef={containerRef} reverse />
          <ConnectionLine fromId="center-node" toId="output-2" containerRef={containerRef} reverse />
        </svg>

        {/* Inputs Column */}
        <div className="flex flex-col gap-8 md:gap-12 z-10 w-full md:w-auto">
          <Node id="input-1" icon={Database} title="User Data" subtitle="PostgreSQL" position="left" />
          <Node id="input-2" icon={Zap} title="Events" subtitle="Webhook" position="left" />
          <Node id="input-3" icon={FileCode} title="Files" subtitle="S3 Bucket" position="left" />
        </div>

        {/* Center Node */}
        <div className="z-10 flex justify-center w-full md:w-auto">
          <Node id="center-node" icon={Cpu} title="AI Engine" subtitle="Processing" position="center" />
        </div>

        {/* Outputs Column */}
        <div className="flex flex-col gap-8 md:gap-12 z-10 w-full md:w-auto">
          <Node id="output-1" icon={BarChart3} title="Analytics" subtitle="Dashboard" position="right" />
          <Node id="output-2" icon={Bell} title="Notifications" subtitle="Slack/Email" position="right" />
        </div>

      </div>
    </section>
  );
}
