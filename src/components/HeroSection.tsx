import { useEffect, useState, useRef } from 'react';

interface HeroSectionProps {
  theme: 'light' | 'dark';
}

export function HeroSection({ theme }: HeroSectionProps) {
  const [scale, setScale] = useState(0.3);
  const [isScaleLocked, setIsScaleLocked] = useState(true);
  const scrollAccumulator = useRef(0);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If scale is not yet at max, prevent default scroll and scale image instead
      if (scale < 1) {
        e.preventDefault();
        
        // Accumulate scroll delta
        scrollAccumulator.current += e.deltaY;
        
        // Scale from 0.3 to 1.0 based on accumulated scroll
        // Needs about 700px of scroll to go from 0.3 to 1.0
        const newScale = Math.min(1, Math.max(0.3, 0.3 + (scrollAccumulator.current / 700)));
        setScale(newScale);
        
        // Once fully scaled, unlock scrolling
        if (newScale >= 1) {
          setIsScaleLocked(false);
        }
      }
    };

    // Add wheel listener to window with passive: false to allow preventDefault
    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [scale]);

  // Reset on theme change or mount
  useEffect(() => {
    if (scale >= 1) {
      setIsScaleLocked(false);
    }
  }, [scale]);

  const imageOpacity = scale > 0.7 ? 1 : 0.7;
  const textColor = scale > 0.7 
    ? (theme === 'light' ? 'text-white' : 'text-white')
    : (theme === 'light' ? 'text-gray-900' : 'text-white');

  // Determine text styling based on scale and theme
  const getTextStyle = () => {
    const isLarge = scale > 0.7;
    const isLightTheme = theme === 'light';
    
    if (isLarge) {
      // Large state - white text with shadow
      return {
        fontSize: '3.5rem',
        fontWeight: 900,
        lineHeight: 1.1,
        textShadow: '0 4px 20px rgba(0,0,0,0.5)',
        color: 'white',
      };
    } else if (isLightTheme) {
      // Light theme small state - gradient text
      return {
        fontSize: '2.5rem',
        fontWeight: 900,
        lineHeight: 1.1,
        textShadow: 'none',
        background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      };
    } else {
      // Dark theme small state - gradient text
      return {
        fontSize: '2.5rem',
        fontWeight: 900,
        lineHeight: 1.1,
        textShadow: 'none',
        background: 'linear-gradient(135deg, #ffd23f 0%, #ff6b35 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        color: 'transparent',
      };
    }
  };

  return (
    <div 
      ref={heroRef}
      className={`relative overflow-hidden transition-all duration-500 ${
        scale > 0.7 ? 'min-h-[70vh]' : 'min-h-[40vh]'
      }`}
    >
      {/* Background gradient overlay */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        scale > 0.7 ? 'opacity-60' : 'opacity-20'
      } ${
        theme === 'light' 
          ? 'bg-gradient-to-b from-gray-900/80 via-gray-900/60 to-transparent' 
          : 'bg-gradient-to-b from-[#0f0b1f]/90 via-[#1a1433]/70 to-transparent'
      }`} style={{ zIndex: scale > 0.7 ? 2 : 0 }} />

      {/* Smart City Image */}
      <div 
        className="absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out"
        style={{
          transform: `scale(${scale})`,
          opacity: imageOpacity,
          zIndex: 1
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1699602050604-698045645108?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMGNpdHklMjBpbmZyYXN0cnVjdHVyZSUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzY3MDE2NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Smart City"
          className={`w-full h-full object-cover transition-all duration-700 ${
            scale > 0.7 ? 'rounded-none' : 'rounded-2xl shadow-2xl'
          }`}
          style={{
            maxWidth: scale > 0.7 ? '100%' : '800px',
            maxHeight: scale > 0.7 ? '100%' : '500px',
          }}
        />
      </div>

      {/* Text Content */}
      <div 
        className="relative z-10 flex flex-col items-center justify-center min-h-[40vh] px-6 transition-all duration-500"
        style={{
          paddingTop: scale > 0.7 ? '15vh' : '8vh',
        }}
      >
        {/* Top Text Line */}
        <div className="text-center mb-4">
          <div 
            className={`inline-block transition-all duration-500 ${textColor}`}
            style={{
              transform: `translateY(${scale > 0.7 ? '-20px' : '0px'})`,
            }}
          >
            <h2 
              className="tracking-wider uppercase transition-all duration-500"
              style={getTextStyle()}
            >
              CITY INFRASTRUCTURE
            </h2>
          </div>
        </div>

        {/* Connecting Line */}
        <div 
          className="my-6 transition-all duration-500"
          style={{
            width: '2px',
            height: scale > 0.7 ? '60px' : '40px',
            background: theme === 'light' 
              ? 'linear-gradient(to bottom, #ff6b35, #f7931e)'
              : 'linear-gradient(to bottom, #ffd23f, #fb923c)',
            opacity: 0.6
          }}
        />

        {/* Bottom Text Line */}
        <div className="text-center">
          <div 
            className={`inline-block transition-all duration-500 ${textColor}`}
            style={{
              transform: `translateY(${scale > 0.7 ? '20px' : '0px'})`,
            }}
          >
            <h2 
              className="tracking-wider uppercase transition-all duration-500"
              style={getTextStyle()}
            >
              & VITAL INTELLIGENCE SYSTEM
            </h2>
          </div>
        </div>

        {/* Scroll Indicator */}
        {scale < 0.9 && (
          <div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
            style={{ opacity: 1 - scale }}
          >
            <div className={`w-6 h-10 rounded-full border-2 flex items-start justify-center p-2 ${
              theme === 'light' ? 'border-gray-400' : 'border-gray-500'
            }`}>
              <div className={`w-1.5 h-1.5 rounded-full ${
                theme === 'light' ? 'bg-gray-400' : 'bg-gray-500'
              }`} />
            </div>
          </div>
        )}
      </div>

      {/* Bottom fade gradient */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-32 pointer-events-none ${
          theme === 'light'
            ? 'bg-gradient-to-t from-[#f8fafc] to-transparent'
            : 'bg-gradient-to-t from-[#0f0b1f] to-transparent'
        }`}
        style={{ zIndex: 3 }}
      />
    </div>
  );
}