import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { Home } from 'lucide-react';
import { pageVariants } from '../utils/animations';
import { siteConfig } from '../constants/config';

export default function NotFound() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24 min-h-screen flex items-center justify-center bg-background relative overflow-hidden"
    >
      <Helmet>
        <title>404 - Page Not Found | {siteConfig.name}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      
      {/* Abstract background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h1 
          className="text-9xl md:text-[150px] font-bold text-foreground/10 tracking-tighter"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          404
        </motion.h1>
        
        <motion.div 
          className="-mt-12 md:-mt-20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">Off the grid.</h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            The page you are looking for has either been moved or doesn't exist in our architecture.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <NavLink 
            to="/" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-background rounded-full font-medium hover:bg-primary hover:text-background transition-all shadow-md"
          >
            <Home size={18} /> Return Home
          </NavLink>
        </motion.div>
      </div>
    </motion.div>
  );
}
