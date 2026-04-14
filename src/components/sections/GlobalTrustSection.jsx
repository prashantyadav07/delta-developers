import React from 'react';
import { motion } from 'framer-motion';
import globeImg from '../../assets/globe.png';

const GlobalTrustSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden flex items-center justify-center">
      {/* Exact Design Background Layers */}
      <div className="relative w-full max-w-6xl px-4 flex items-center justify-center">
        
        {/* Layer 1: The Green Backdrop Shape */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute inset-x-0 inset-y-0 bg-[#82b43b] -skew-x-1 -rotate-1 translate-x-4 translate-y-4 rounded-xl z-0"
        />

        {/* Layer 2: The White Outer Frame */}
        <div className="relative z-10 w-full p-4 md:p-6 border-2 border-white rounded-2xl">
          
          {/* Layer 3: The White Content Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-2xl p-8 md:p-12 lg:p-16 relative overflow-hidden"
          >
            {/* Scribble Element - Exact Position */}
            <div className="absolute left-6 bottom-6 opacity-80 z-20 pointer-events-none">
              <svg width="120" height="40" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 45C20 40 35 55 50 45C65 35 80 50 95 40C110 30 125 45 140 35C155 25 170 40 185 30" stroke="black" strokeWidth="4" strokeLinecap="round"/>
                <path d="M15 55C30 50 45 65 60 55C75 45 90 60 105 50C120 40 135 55 150 45C165 35 180 50 195 40" stroke="black" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </div>

            <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
              {/* Left Content: Headline and Main Stats */}
              <div className="lg:w-1/2 space-y-12">
                <motion.h2 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="text-2xl md:text-4xl font-bold text-black leading-tight tracking-tight"
                >
                  Teams across the globe run on <br />
                  <span className="text-black underline underline-offset-4 decoration-gray-200">Delta Developers</span>
                </motion.h2>
                
                <div className="grid grid-cols-2 gap-8">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-1"
                  >
                    <span className="text-4xl md:text-5xl font-black text-black">
                      50+
                    </span>
                    <p className="text-[10px] md:text-xs text-black/50 uppercase tracking-widest font-bold">
                      Happy Clients
                    </p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-1"
                  >
                    <span className="text-4xl md:text-5xl font-black text-black">
                      15+
                    </span>
                    <p className="text-[10px] md:text-xs text-black/50 uppercase tracking-widest font-bold">
                      Industries
                    </p>
                  </motion.div>
                </div>
              </div>

              {/* Middle Content: More Stats with Vertical Divider */}
              <div className="lg:w-1/4 flex flex-col gap-10 relative lg:pl-12">
                <div className="hidden lg:block absolute left-0 top-1 bottom-1 w-px bg-gray-100" />
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-1"
                >
                  <span className="text-4xl md:text-5xl font-black text-black">
                    98%
                  </span>
                  <p className="text-[10px] md:text-xs text-black/50 uppercase tracking-widest font-bold">
                    Retention
                  </p>
                </motion.div>

                <div className="lg:hidden w-full h-px bg-gray-100" />

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="space-y-1"
                >
                  <span className="text-4xl md:text-5xl font-black text-black">
                    24/7
                  </span>
                  <p className="text-[10px] md:text-xs text-black/50 uppercase tracking-widest font-bold">
                    Support
                  </p>
                </motion.div>
              </div>

              {/* Right Content: Globe Illustration */}
              <div className="lg:w-1/4 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center"
                >
                  <img 
                    src={globeImg} 
                    alt="Global Reach" 
                    className="w-full h-full object-contain relative z-10"
                  />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GlobalTrustSection;
