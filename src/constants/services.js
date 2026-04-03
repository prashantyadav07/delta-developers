import { Code, Layout, Blocks, Cpu, Smartphone, ShieldCheck } from "lucide-react";

export const services = [
  {
    id: "frontend-architecture",
    title: "Frontend Architecture",
    description: "We design highly scalable, performant, and maintainable frontend architectures tailored to modern web applications.",
    icon: Blocks,
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description: "Award-winning interface design focusing on conversion, usability, and breathtaking visual aesthetics.",
    icon: Layout,
  },
  {
    id: "web-development",
    title: "Web Engineering",
    description: "Production-grade React and Next.js applications featuring cinematic animations and flawless SEO.",
    icon: Code,
  },
  {
    id: "mobile-development",
    title: "Mobile Experiences",
    description: "Responsive, native-feeling progressive web apps and mobile interfaces.",
    icon: Smartphone,
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description: "Audit and resolve core web vitals, bundle sizes, and rendering bottlenecks.",
    icon: Cpu,
  },
  {
    id: "security",
    title: "Frontend Security",
    description: "Implementing strict CSPs, XSS mitigation, and highly secure authentication flows.",
    icon: ShieldCheck,
  }
];
