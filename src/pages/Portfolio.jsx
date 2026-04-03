import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants, containerVariants, fadeUpVariants } from '../utils/animations';
import { siteConfig } from '../constants/config';
import { portfolio } from '../constants/portfolio';

export default function Portfolio() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24 min-h-screen"
    >
      <Helmet>
        <title>Portfolio | {siteConfig.name}</title>
        <meta name="description" content="View our select case studies and flagship projects." />
      </Helmet>
      
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="max-w-3xl mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            Our Work
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="text-xl text-muted-foreground leading-relaxed">
            A selection of projects that showcase our commitment to quality, performance, and aesthetic perfection.
          </motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {portfolio.map((item) => (
            <motion.div 
              key={item.id}
              variants={fadeUpVariants}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-[2rem] aspect-[4/3] mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-xs font-semibold tracking-wider text-primary uppercase mb-2">
                    {item.category}
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                <div className="text-sm font-medium text-muted-foreground bg-secondary px-3 py-1 rounded-full">
                  {item.year}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
