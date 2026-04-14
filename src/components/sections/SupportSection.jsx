import { motion } from 'framer-motion';

export default function SupportSection() {
  return (
    <section className="relative min-h-[80vh] flex flex-col items-center justify-center bg-white overflow-hidden px-6 selection:bg-primary/20 selection:text-primary py-32">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Main Animated Arc */}
        <svg
          viewBox="0 0 1000 500"
          className="absolute top-[-5%] left-1/2 -translate-x-1/2 w-[160%] md:w-[130%] lg:w-[110%] h-auto"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M50,500 A450,450 0 0,1 950,500"
            stroke="url(#arcGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: [0, 1, 1, 0] }}
            viewport={{ once: true }}
            transition={{
              duration: 4,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.1, 0.9, 1]
            }}
          />
          <defs>
            <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="1" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-10"
        >
          <h2 className="text-5xl md:text-6xl font-sans font-bold text-[#0f172a] leading-[1.1] tracking-tight">
            24/7 support <br />
            <span>for your mind</span>
          </h2>

          <p className="text-lg md:text-xl font-sans text-muted-foreground leading-relaxed max-w-2xl mx-auto font-light">
            Over 99% of life happens between therapy sessions.
            Dawn meets you in the moments that matter, with
            proactive check-ins and real-time responses at any
            time of day.
          </p>
        </motion.div>
      </div>

      {/* Bottom Vignette - Adjusted for light mode */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--background)_100%)] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
