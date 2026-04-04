/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const words = ["DEVELOPERS", "CREATORS", "DESIGNERS"];

export default function WeBuildSection() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentWord = words[currentWordIndex];
      
      if (isDeleting) {
        setDisplayText(prev => prev.slice(0, -1));
        setTypingSpeed(50);
      } else {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
        setTypingSpeed(150);
      }

      if (!isDeleting && displayText === currentWord) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWordIndex, typingSpeed]);

  return (
    <section className="py-32 bg-background overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col items-start space-y-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase leading-[0.9]"
          >
            We Build For
          </motion.h2>
          
          <div className="flex items-center gap-4 md:gap-8">
            <span className="text-4xl md:text-7xl font-black text-primary">
              &gt;
            </span>
            <div className="relative flex items-center min-h-[60px] md:min-h-[100px]">
              <span className="text-4xl md:text-7xl font-black bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent uppercase tracking-tighter w-full">
                {displayText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block w-1 h-10 md:h-16 bg-foreground ml-2"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-primary/5 blur-[120px] rounded-full -z-10" />
    </section>
  );
}
