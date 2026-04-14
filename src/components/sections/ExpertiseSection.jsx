import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Database, Smartphone, Globe, ShieldCheck } from 'lucide-react';

const serviceCategories = [
  {
    id: "ai-llm",
    label: "AI & LLMs",
    title: "Artificial Intelligence & LLM Solutions",
    color: "#e6f4f1", // Light mint
    cards: [
      {
        title: "Custom LLM Agents",
        description: "Deploy autonomous AI agents that handle customer support and complex workflow automation with human-like precision.",
        price: "Starting ₹ 45,000/mo",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
        badge: "AI SUGGESTION",
        buttonText: "Request Demo"
      },
      {
        title: "RAG Knowledge Bases",
        description: "Transform your company's data into an intelligent knowledge system with zero-hallucination retrieval architecture.",
        price: "₹ 1,24,999 once",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
        badge: "RECOMMENDED",
        buttonText: "Secure Your Data",
        cardBg: "#eef2ff" // Light blue
      }
    ]
  },
  {
    id: "microcontrollers",
    label: "Microcontrollers",
    title: "Hardware & Embedded Systems",
    color: "#fdf8ef", // Light beige
    cards: [
      {
        title: "Ultra-Low Power Firmware",
        description: "Specialized C/C++ code for ESP32, STM32, and ARM processors designed for maximum battery life and performance.",
        price: "Custom Engineering",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        badge: "HARDWARE",
        buttonText: "Get Technical Specs"
      },
      {
        title: "Industrial IoT Nodes",
        description: "Production-ready sensor networks and custom PCB designs for smart factories and real-time monitoring.",
        price: "From ₹ 1,50,000",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
        badge: "PRODUCTION READY",
        buttonText: "Design Your Setup",
        cardBg: "#f5f6f7" // Light grey
      }
    ]
  },
  {
    id: "erp",
    label: "AI-based ERP",
    title: "Enterprise Resource Planning",
    color: "#f0fdf4", // Light green
    cards: [
      {
        title: "Predictive Inventory",
        description: "Reduce stock-outs and optimize warehouse turnover with AI that predicts demand before it happens.",
        price: "₹ 24,999/mo",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
        badge: "EFFICIENCY+",
        buttonText: "Optimize Inventory"
      },
      {
        title: "Automated CRM Insights",
        description: "Bridge sales data and customer behavior with intelligent insights that drive better conversion rates.",
        price: "Contact for Pricing",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
        badge: "POPULAR",
        buttonText: "Connect Your CRM",
        cardBg: "#fffbeb" // Light amber
      }
    ]
  },
  {
    id: "apps",
    label: "App Development",
    title: "Mobile Solutions",
    color: "#fff7ed", // Light orange
    cards: [
      {
        title: "Cross-Platform Mobile",
        description: "High-performance iOS and Android applications built with React Native for faster time-to-market.",
        price: "From ₹ 2,49,000",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
        badge: "BEST VALUE",
        buttonText: "Start My App"
      },
      {
        title: "Native Architecture UX",
        description: "Pixel-perfect interfaces crafted for high engagement, fluid animations, and native-level speed.",
        price: "Consultation Free",
        image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800",
        badge: "USER CENTRIC",
        buttonText: "Book UX Review",
        cardBg: "#eff6ff" // Light blue
      }
    ]
  },
  {
    id: "web",
    label: "Web Development",
    title: "Modern Web Platforms",
    color: "#faf5ff", // Light purple
    cards: [
      {
        title: "Next.js Enterprise",
        description: "Scalable frontend architectures optimized for 100/100 Lighthouse scores and peak SEO visibility.",
        price: "Starting ₹ 99,000",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
        badge: "SEO READY",
        buttonText: "Explore Architecture"
      },
      {
        title: "Headless E-commerce",
        description: "Flexible online stores with custom logic, lightning-fast checkouts, and seamless payment flows.",
        price: "₹ 14,999/mo",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
        badge: "HIGH CONVERSION",
        buttonText: "Launch Store",
        cardBg: "#fdf2f8" // Light pink
      }
    ]
  },
  {
    id: "consulting",
    label: "IT Consulting",
    title: "Strategic Advice",
    color: "#f8fafc", // Light slate
    cards: [
      {
        title: "Tech Strategy Audit",
        description: "Full-stack review of your digital infrastructure to identify security risks and technical debt.",
        price: "Professional Audit",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
        badge: "STRATEGY",
        buttonText: "Get Audit Report"
      },
      {
        title: "Cloud Performance Scalability",
        description: "Secure AWS and Azure configurations designed to handle million-user traffic without overspending.",
        price: "Free Setup Check",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        badge: "SECURE",
        buttonText: "Secure My Setup",
        cardBg: "#ecfdf5" // Light emerald
      }
    ]
  }
];

const ServiceCard = ({ card, color }) => {
  const bg = card.cardBg || color;
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="rounded-xl overflow-hidden flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
      style={{ backgroundColor: bg }}
    >
      <div className="p-5 md:p-6 flex flex-col h-full">
        <div className="relative mb-5 rounded-lg overflow-hidden border border-black/5">
          <img 
            src={card.image} 
            alt={card.title} 
            className="w-full aspect-video object-cover"
          />
          {card.badge === "AI SUGGESTION" && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-black/5 flex items-center gap-1.5">
              <div className="w-4 h-4 bg-cyan-400 rounded-full flex items-center justify-center">
                <Brain size={10} className="text-white" />
              </div>
              <span className="text-[11px] font-bold text-slate-900 tracking-tight">AI Suggestion</span>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1">
          {card.badge && card.badge !== "AI SUGGESTION" && (
            <span className="inline-block self-start px-1.5 py-0.5 mb-3 text-[10px] font-black uppercase tracking-wider text-cyan-600 bg-cyan-500/10 rounded-sm">
              {card.badge}
            </span>
          )}
          
          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 leading-tight">
            {card.title} <br/> <span className="font-medium text-slate-600 text-base">{card.price}</span>
          </h3>
          
          <p className="text-[#444] text-sm leading-[1.5] mb-6 flex-1">
            {card.description}
          </p>

          <button className="self-start px-6 py-3 bg-black text-white text-[13px] font-bold rounded-lg hover:bg-slate-900 transition-colors">
            {card.buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ExpertiseSection = () => {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id);
  const activeCategory = serviceCategories.find(cat => cat.id === activeTab);

  return (
    <section id="expertise" className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* ─── Centered Header ─── */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-10">
            What's first up for your business?
          </h2>

          {/* ─── Category Tabs (Pills) ─── */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {serviceCategories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`
                    px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 border
                    ${isActive 
                      ? 'bg-black text-white border-black' 
                      : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400'}
                  `}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ─── Card Grid ─── */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {activeCategory.cards.map((card, idx) => (
                <ServiceCard key={card.title} card={card} color={activeCategory.color} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
