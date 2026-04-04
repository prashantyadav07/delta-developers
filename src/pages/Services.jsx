import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants, containerVariants, fadeUpVariants } from '../utils/animations';
import { siteConfig } from '../constants/config';
import { services } from '../constants/services';

export default function Services() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24 min-h-screen bg-secondary/10"
    >
      <Helmet>
        <title>Our Services | {siteConfig.name}</title>
        <meta name="description" content="Explore our suite of scalable technical and design services." />
      </Helmet>
      
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="max-w-3xl mb-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            Capabilities
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="text-xl text-muted-foreground leading-relaxed">
            Delivering end-to-end technical excellence across the entire product lifecycle.
          </motion.p>
        </motion.div>

        <div className="space-y-6">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-card p-8 md:p-12 rounded-3xl border border-border flex flex-col md:flex-row gap-8 items-start group hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <service.icon size={32} strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed max-w-2xl text-lg">
                  {service.description} 
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
