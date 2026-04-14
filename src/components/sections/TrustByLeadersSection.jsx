import React from 'react';
import { motion } from 'framer-motion';
import desktop1 from '../../assets/templates/desktop-1.png';
import mobile1 from '../../assets/templates/mobile-1.png';
import desktop2 from '../../assets/templates/desktop-2.png';
import mobile2 from '../../assets/templates/mobile-2.png';

const templates = [
  {
    id: 1,
    title: "Modern Ceramics",
    subtitle: "Handmade stoneware for your home",
    image: desktop1,
    type: "desktop",
    width: "w-[350px] md:w-[500px]",
    aspect: "aspect-[16/10]"
  },
  {
    id: 2,
    title: "Art Studio & Shop",
    subtitle: "Showcasing incredible talent",
    image: mobile1,
    type: "mobile",
    width: "w-[180px] md:w-[260px]",
    aspect: "aspect-[9/16]"
  },
  {
    id: 3,
    title: "Luxury Furniture",
    subtitle: "Elegant pieces for modern living",
    image: desktop2,
    type: "desktop",
    width: "w-[350px] md:w-[500px]",
    aspect: "aspect-[16/10]"
  },
  {
    id: 4,
    title: "Fashion Boutique",
    subtitle: "Trending collections this season",
    image: mobile2,
    type: "mobile",
    width: "w-[180px] md:w-[260px]",
    aspect: "aspect-[9/16]"
  }
];

const TrustByLeadersSection = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  // Triple the items to ensure smooth infinite scroll
  const duplicatedTemplates = [...templates, ...templates, ...templates];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-bold text-black mb-6 tracking-tight"
        >
          Trusted by Leaders
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Choose from 100s of designs for every idea and industry.
        </motion.p>
      </div>

      {/* Autoscrolling Carousel Container */}
      <div 
        className="relative group/carousel overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div 
          className="flex gap-8"
          animate={{
            x: isHovered ? undefined : [0, -1648], // 1616px content + 32px gap
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
          style={{ width: "fit-content" }}
        >
          {duplicatedTemplates.map((template, index) => (
            <div 
              key={`${template.id}-${index}`}
              className={`flex-shrink-0 rounded-lg shadow-xl overflow-hidden border border-gray-100 ${template.width} ${template.aspect} group hover:shadow-2xl transition-shadow duration-500`}
            >
              <div className="relative w-full h-full">
                <img 
                  src={template.image} 
                  alt={template.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                  <h3 className="text-2xl font-bold">{template.title}</h3>
                  <p className="text-sm opacity-90">{template.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-12">
        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-10 py-4 bg-black text-white font-bold text-lg shadow-lg hover:bg-gray-900 transition-colors"
        >
          See Our Projects
        </motion.button>
      </div>
    </section>
  );
};

export default TrustByLeadersSection;
