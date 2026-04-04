import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants, containerVariants, fadeUpVariants } from '../utils/animations';
import { siteConfig } from '../constants/config';
import { ArrowUpRight } from 'lucide-react';

const positions = [
  { id: 1, title: 'Senior Frontend Architect', type: 'Full-time', location: 'Remote (US/EU)' },
  { id: 2, title: 'Creative Technologist (Three.js)', type: 'Full-time', location: 'Remote' },
  { id: 3, title: 'UX/UI Product Designer', type: 'Contract', location: 'London / Hybrid' },
];

export default function Careers() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24 min-h-screen"
    >
      <Helmet>
        <title>Careers | {siteConfig.name}</title>
        <meta name="description" content="Join our team of elite developers and designers." />
      </Helmet>
      
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="max-w-3xl mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            Join the Vanguard
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="text-xl text-muted-foreground leading-relaxed">
            We're always looking for exceptional talent. If you obsess over performance, design, and beautiful code, you belong here.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="bg-card rounded-[2rem] border border-border p-8 md:p-12 shadow-sm"
        >
          <motion.h2 variants={fadeUpVariants} className="text-2xl font-semibold mb-8 border-b border-border pb-6">
            Open Positions
          </motion.h2>
          
          <div className="space-y-4">
            {positions.map((pos) => (
              <motion.a 
                key={pos.id}
                href={`mailto:${siteConfig.contactEngineers}?subject=Application for ${pos.title}`}
                variants={fadeUpVariants}
                className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl hover:bg-secondary/50 border border-transparent hover:border-border transition-all duration-300"
              >
                <div>
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{pos.title}</h3>
                  <div className="flex gap-3 text-sm text-muted-foreground mt-2">
                    <span>{pos.type}</span>
                    <span>&bull;</span>
                    <span>{pos.location}</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-background p-2 text-sm rounded-full">
                  <ArrowUpRight size={18} />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
