/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "framer-motion";
import React from "react";
import { ArrowRight } from "lucide-react";

const Ring = ({ 
  size, 
  rotateX = 0, 
  rotateY = 0, 
  rotateZ = 0, 
  duration = 5, 
  opacity = 0.5
}) => {
  return (
    <motion.div
      className="absolute rounded-full border-2 border-primary/30 border-solid"
      style={{
        width: size,
        height: size,
        boxShadow: `0 0 ${size / 15}px var(--color-primary)`,
        opacity
      }}
      initial={{ rotateX, rotateY, rotateZ }}
      animate={{
        rotateX: [rotateX, rotateX + 360],
        rotateY: [rotateY, rotateY + 360],
        rotateZ: [rotateZ, rotateZ + 360],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const CyclingRings = () => {
  return (
    <div className="relative flex items-center justify-center w-full h-[500px] perspective-[1000px] overflow-hidden">
      {/* Central Core */}
      <div className="absolute w-2 h-2 bg-primary rounded-full blur-[2px] opacity-60 shadow-lg shadow-primary" />
      
      {/* Inner Rings */}
      <Ring size={80} rotateX={75} rotateY={15} rotateZ={0} duration={3} opacity={0.2} />
      <Ring size={110} rotateX={-65} rotateY={25} rotateZ={45} duration={4} opacity={0.25} />
      
      {/* Middle Rings */}
      <Ring size={150} rotateX={40} rotateY={40} rotateZ={90} duration={5} opacity={0.4} />
      <Ring size={180} rotateX={-40} rotateY={-40} rotateZ={135} duration={6} opacity={0.5} />
      <Ring size={210} rotateX={15} rotateY={75} rotateZ={180} duration={7} opacity={0.6} />
      
      {/* Outer Rings */}
      <Ring size={250} rotateX={5} rotateY={85} rotateZ={225} duration={8} opacity={0.75} />
      <Ring size={280} rotateX={85} rotateY={5} rotateZ={270} duration={9} opacity={0.85} />
      <Ring size={320} rotateX={45} rotateY={-45} rotateZ={315} duration={10} opacity={0.95} />
    </div>
  );
};

const StatCard = ({ value, label }) => (
  <motion.div 
    whileHover={{ y: -5, backgroundColor: "var(--color-card)" }}
    className="p-8 rounded-3xl bg-card border border-border flex flex-col gap-2 min-w-[200px] transition-colors"
  >
    <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
      {value}
    </span>
    <span className="text-sm text-white/50 font-medium uppercase tracking-wider">{label}</span>
  </motion.div>
);

export default function TrustSection() {
  return (
    <section className="py-32 bg-background overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left Content */}
          <div className="flex-1 space-y-12">
            <div className="space-y-6">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl font-semibold tracking-tight text-white leading-tight"
              >
                Trusted by <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                  Industry Leaders
                </span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-white/60 max-w-xl leading-relaxed"
              >
                From startups to Fortune 500 companies, businesses worldwide trust Abhastra Automation to deliver mission-critical AI solutions.
              </motion.p>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              <StatCard value="50+" label="Enterprise Projects" />
              <StatCard value="100%" label="Client Satisfaction" />
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a 
                href="/case-studies"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-4 transition-all group"
              >
                View Case Studies <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Content - Animation */}
          <div className="flex-1 w-full relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <CyclingRings />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
