import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Send } from 'lucide-react';
import { pageVariants, containerVariants, fadeUpVariants } from '../utils/animations';
import { siteConfig } from '../constants/config';

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success('Message sent successfully', {
        description: "We'll be in touch with you shortly.",
      });
      e.target.reset();
    }, 1500);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="pt-32 pb-24 min-h-screen bg-secondary/10"
    >
      <Helmet>
        <title>Contact | {siteConfig.name}</title>
        <meta name="description" content="Reach out to discuss your next digital project." />
      </Helmet>
      
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1 variants={fadeUpVariants} className="text-4xl md:text-6xl font-semibold tracking-tight mb-6">
            Let's Talk
          </motion.h1>
          <motion.p variants={fadeUpVariants} className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Ready to build something extraordinary? Fill out the form below and our engineering team will get back to you.
          </motion.p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2rem] border border-border p-8 md:p-12 shadow-xl shadow-primary/5"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="interest" className="text-sm font-medium text-foreground">Topic of Interest</label>
              <select 
                id="interest" 
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans appearance-none"
              >
                <option value="frontend">Frontend Architecture</option>
                <option value="design">UI/UX Design</option>
                <option value="mobile">Mobile App</option>
                <option value="audit">Performance Audit</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">Project Details</label>
              <textarea 
                id="message" 
                rows={5} 
                required 
                className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-sans resize-none"
                placeholder="Tell us about your timeline, budget, and exact requirements..."
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full sm:w-auto inline-flex justify-center items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all shadow-md mt-4 disabled:opacity-70"
            >
              {loading ? 'Sending...' : 'Send Message'} 
              {!loading && <Send size={18} />}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
}
