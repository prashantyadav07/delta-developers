import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { pageVariants, containerVariants, fadeUpVariants } from '../utils/animations';
import { siteConfig } from '../constants/config';
import { Users, Target, Shield } from 'lucide-react';

export default function About() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24 min-h-screen"
    >
      <Helmet>
        <title>About Us | {siteConfig.name}</title>
        <meta name="description" content="Learn about our mission to architect premium digital experiences." />
      </Helmet>
      
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div 
          className="max-w-3xl mb-24"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl font-semibold tracking-tight mb-8">
            We don't just build websites. <br/> We engineer <span className="text-gradient">experiences</span>.
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="text-xl text-muted-foreground leading-relaxed">
            Founded with the vision to deliver Awwwards-winning quality without compromising on production-grade performance. We bridge the gap between creative design and hardcore engineering.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div variants={fadeUpVariants}>
            <Target className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Precision</h3>
            <p className="text-muted-foreground">Every pixel is mathematically calculated. We respect the grid and believe in systematic design scaling.</p>
          </motion.div>
          <motion.div variants={fadeUpVariants}>
            <Shield className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Reliability</h3>
            <p className="text-muted-foreground">Production systems must scale. We build architectures that do not break under load.</p>
          </motion.div>
          <motion.div variants={fadeUpVariants}>
            <Users className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-2xl font-semibold mb-4">Collaboration</h3>
            <p className="text-muted-foreground">We aren't just an agency; we integrate with your team to deliver world-class infrastructure alongside you.</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
