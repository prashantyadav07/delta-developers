import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import leaderImg from '../../assets/leader.png';

const PlatformSection = () => {
  return (
    <section className="bg-white py-8 md:py-12 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Main Outlined Container - Exact Sharp Design - Aggressively Compact */}
        <div className="flex flex-col lg:flex-row items-stretch border border-[#e5e7eb] rounded-[2px] overflow-hidden shadow-sm bg-white">
          
          {/* Left Content Column */}
          <div className="lg:w-1/2 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
            <motion.h2 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0e4a44] leading-tight mb-4 tracking-tight"
            >
              One platform. All teams. Every worker.
            </motion.h2>

            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg md:text-xl font-medium text-[#0e4a44] mb-3"
            >
              For operations leaders:
            </motion.h3>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-sm text-black leading-relaxed mb-6 max-w-md"
            >
              Boost productivity while building a more efficient, adaptable workforce. 
              Match the right people to the right shifts by understanding your workforce.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <button className="px-5 py-2.5 bg-[black] hover:bg-[#151922] text-white font-bold rounded-[2px] transition-colors text-xs shadow-sm uppercase tracking-tight">
                Learn more
              </button>
            </motion.div>
          </div>

          {/* Right Image Column */}
          <div className="lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            <div className="absolute inset-0">
              <img 
                src={leaderImg} 
                alt="Corporate Leader" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Chat Icon - Exact Match to Screenshot */}
            <div className="absolute bottom-6 right-6">
              <div className="w-14 h-14 bg-[#143d39] rounded-lg shadow-lg flex items-center justify-center cursor-pointer transition-transform hover:scale-105">
                <MessageSquare className="text-white w-7 h-7" fill="currentColor" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
