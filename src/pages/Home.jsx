import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants, containerVariants, fadeUpVariants } from '../utils/animations';
import { siteConfig } from '../constants/config';
import { services } from '../constants/services';
import ScrollDrivenHero from '../components/sections/ScrollDrivenHero';
import AIEngineDataFlow from '../components/ui/AIEngineDataFlow';
import TrustSection from '../components/sections/TrustSection';
import WeBuildSection from '../components/sections/WeBuildSection';
import SupportSection from '../components/sections/SupportSection';

const ServicesPreview = () => {
  return (
    <section className="py-32 bg-background relative">
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
              className="group p-8 rounded-3xl bg-secondary/30 border border-transparent hover:border-border hover:bg-card transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <div className="w-14 h-14 bg-card rounded-2xl flex items-center justify-center shadow-sm mb-6 text-primary group-hover:scale-110 transition-transform">
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
      
      <ScrollDrivenHero />
      <AIEngineDataFlow />
      <TrustSection />
      <ServicesPreview />
      <WeBuildSection />
      <SupportSection />
    </motion.div>
  );
}
