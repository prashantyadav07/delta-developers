import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * ScrollDrivenHero - Delta Developer Consultancy
 * Optimized Sticky-Hybrid Implementation (Reverted + Sharpness Fix).
 */
const ScrollDrivenHero = ({
  jstotalFrames = 240,
  framePath = "/hero-image/",
  framePrefix = "ezgif-frame-",
  frameExtension = "jpg",
  paddingDigits = 3,
  scrollPinDistance = 4000, 
  headerEntryProgress = 0.25,
  textEntryStart = 0.30,
  textEntryEnd = 0.60,
  scrubValue = 0.5,
  companyName = "Delta Developer Consultancy",
  tagline = "We build what others imagine.",
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [mountLoader, setMountLoader] = useState(true);

  const runwayRef = useRef(null); 
  const stickyRef = useRef(null); 
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const stRef = useRef(null);
  const resizeObserverRef = useRef(null);
  const loaderRef = useRef(null);

  // Phase 1: Draw Frame Function (Retina-Sharp)
  const drawFrame = (index) => {
    const clampedIndex = Math.max(0, Math.min(jstotalFrames - 1, index));
    const img = imagesRef.current[clampedIndex];
    if (!img || !img.complete) return;
    
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    // Drawing in the scaled context (scaled by DPR in useEffect)
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    const scale = Math.max(window.innerWidth / img.naturalWidth, window.innerHeight / img.naturalHeight);
    const x = (window.innerWidth - img.naturalWidth * scale) / 2;
    const y = (window.innerHeight - img.naturalHeight * scale) / 2;
    
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  };

  // Phase 2: Preloading Engine
  useEffect(() => {
    imagesRef.current = [];
    let counter = 0;
    const total = jstotalFrames;

    for (let i = 1; i <= total; i++) {
      const img = new Image();
      img.src = `${framePath}${framePrefix}${String(i).padStart(paddingDigits, '0')}.${frameExtension}`;
      img.onload = () => {
        counter++;
        setLoadedCount(counter);
        if (counter === total) setIsLoaded(true);
      };
      img.onerror = () => {
        counter++; 
        setLoadedCount(counter);
        if (counter === total) setIsLoaded(true);
      };
      imagesRef.current.push(img);
    }
  }, [jstotalFrames, framePath, framePrefix, frameExtension, paddingDigits]);

  // Phase 3: GSAP Sticky-Hybrid Sync
  useEffect(() => {
    if (!isLoaded) return;

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    ctxRef.current = canvas.getContext('2d', { alpha: false });
    
    // Set buffer size to high-DPI
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    // Set CSS size to viewport
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    // Scale context to draw in "CSS" units
    ctxRef.current.scale(dpr, dpr);
    
    drawFrame(0);

    resizeObserverRef.current = new ResizeObserver(() => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctxRef.current.setTransform(dpr, 0, 0, dpr, 0, 0); 
      drawFrame(currentFrameRef.current);
      ScrollTrigger.refresh();
    });
    resizeObserverRef.current.observe(runwayRef.current);

    const ctx = gsap.context(() => {
      gsap.to(loaderRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: 'expo.inOut',
        onComplete: () => setMountLoader(false)
      });

      const styleTag = document.createElement('style');
      styleTag.id = 'hero-navbar-override';
      styleTag.innerHTML = `header.hero-active { opacity: 0 !important; transform: translateY(-40px) !important; pointer-events: none !important; }`;
      document.head.appendChild(styleTag);
      document.querySelector('header')?.classList.add('hero-active');

      const tl = gsap.timeline({ paused: true });

      tl.call(() => {
        const header = document.querySelector('header');
        header?.classList.remove('hero-active');
        gsap.to('header', { opacity: 1, y: 0, duration: 0.8, ease: 'power4.out' });
      }, null, headerEntryProgress);

      tl.fromTo('.hero-text-overlay', 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 
        textEntryStart
      );

      stRef.current = ScrollTrigger.create({
        trigger: runwayRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: scrubValue,
        onUpdate: (self) => {
          const index = Math.round(self.progress * (jstotalFrames - 1));
          if (currentFrameRef.current !== index) {
            currentFrameRef.current = index;
            drawFrame(index);
          }
          tl.progress(self.progress);
        },
        onRefresh: () => drawFrame(currentFrameRef.current)
      });

      ScrollTrigger.refresh();
    }, runwayRef);

    return () => {
      ctx.revert(); 
      resizeObserverRef.current?.disconnect();
      const header = document.querySelector('header');
      header?.classList.remove('hero-active');
      document.getElementById('hero-navbar-override')?.remove();
      gsap.set('header', { clearProps: 'all' });
      imagesRef.current = [];
    };
  }, [isLoaded, headerEntryProgress, jstotalFrames, scrubValue, textEntryStart]);

  const progress = Math.round((loadedCount / jstotalFrames) * 100);

  return (
    <>
      {mountLoader && (
        <div ref={loaderRef} style={{
          position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--background)'
        }}>
          <p style={{ fontSize: '12px', letterSpacing: '0.4em', color: 'var(--muted-foreground)', fontVariantNumeric: 'tabular-nums' }}>
            {progress}%
          </p>
          <div style={{ width: '160px', height: '1px', background: 'var(--border)', borderRadius: '999px', overflow: 'hidden', marginTop: '12px' }}>
            <div style={{ height: '100%', background: 'var(--primary)', width: `${progress}%`, transition: 'width 0.1s ease' }} />
          </div>
        </div>
      )}

      <div 
        ref={runwayRef} 
        className="hero-scroll-runway"
        style={{ 
          position: 'relative', 
          width: '100%', 
          height: `${window.innerHeight + scrollPinDistance}px`, 
          backgroundColor: 'var(--background)',
          zIndex: 1
        }}
      >
        <div 
          ref={stickyRef}
          style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <canvas 
            ref={canvasRef} 
            style={{ 
              display: 'block', 
              width: '100vw', 
              height: '100vh',
              pointerEvents: 'none'
            }} 
          />
          
          <div
            className="hero-text-overlay"
            style={{
              position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)',
              zIndex: 10, textAlign: 'center', opacity: 0, pointerEvents: 'none', width: '90%', maxWidth: '800px',
            }}
          >
            <div style={{
              position: 'absolute', inset: '-60px -100px', zIndex: -1, pointerEvents: 'none',
              background: 'radial-gradient(ellipse at center, var(--background) 0%, transparent 80%)',
            }} />
            <h1 style={{
              fontFamily: 'var(--font-heading, inherit)', fontSize: 'clamp(40px, 8vw, 92px)', 
              color: 'var(--foreground)', lineHeight: 0.95, letterSpacing: '-0.05em', marginBottom: '24px', fontWeight: 300
            }}>
              {companyName}
            </h1>
            <p style={{
              fontSize: 'clamp(14px, 1.2vw, 17px)', color: 'var(--primary)', 
              letterSpacing: '0.08em', lineHeight: 1.8, fontWeight: 500, textTransform: 'uppercase'
            }}>
              {tagline}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScrollDrivenHero;
