import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { pageVariants, containerVariants, fadeUpVariants } from '../utils/animations';
import { siteConfig } from '../constants/config';
import { services } from '../constants/services';
import { AbstractHeroCanvas } from '../components/3d/AbstractHeroCanvas';

const Hero = memo(() => {
  return (
    <section className="relative min-h-screen flex items-center pt-24 overflow-hidden">
      <AbstractHeroCanvas />
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          className="max-w-4xl"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={fadeUpVariants} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-primary/20 text-primary mb-8 text-sm font-medium">
            <Sparkles size={16} /> Awwwards Level Engineering
          </motion.div>
          
          <motion.h1 
            variants={fadeUpVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[1.1] text-foreground mb-8"
          >
            Engineering <br/>
            <span className="text-gradient">Digital</span> Excellence.
          </motion.h1>
          
          <motion.p 
            variants={fadeUpVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12"
          >
            {siteConfig.description} We build high-performance, scalable, and immersive experiences for forward-thinking brands.
          </motion.p>
          
          <motion.div variants={fadeUpVariants} className="flex flex-wrap gap-4">
            <NavLink 
              to="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:scale-105 hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95"
            >
              Start Your Project <ArrowRight size={18} />
            </NavLink>
            <NavLink 
              to="/portfolio" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/50 border border-border text-foreground backdrop-blur-md rounded-full font-medium hover:bg-white transition-all active:scale-95"
            >
              View Portfolio
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

const ServicesPreview = () => {
  return (
    <section className="py-32 bg-white relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mb-16"
        >
          <motion.h2 variants={fadeUpVariants} className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-6">
            Core Competencies
          </motion.h2>
          <motion.p variants={fadeUpVariants} className="text-lg text-muted-foreground max-w-2xl">
            A comprehensive suite of technical capabilities designed to scale your digital presence.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.slice(0, 3).map((service) => (
            <motion.div 
              key={service.id}
              variants={fadeUpVariants}
              className="group p-8 rounded-3xl bg-secondary/30 border border-transparent hover:border-border hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-primary group-hover:scale-110 transition-transform">
                <service.icon size={28} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <Helmet>
        <title>{siteConfig.name} | Premium Frontend Architecture</title>
        <meta name="description" content={siteConfig.description} />
      </Helmet>
      
      <Hero />
      <ServicesPreview />
    </motion.div>
  );
}
