import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const WaveDivider = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 25]);
  const dotScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div ref={ref} className="relative w-full -mt-16 md:-mt-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-50/80" />

      {/* Logo Container */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 md:bottom-6 z-10">
        <motion.div 
          className="relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Logo Glow Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/10 to-purple-500/10 rounded-full blur-xl scale-150" />
          <div className="absolute inset-0 bg-white/10 rounded-full backdrop-blur-sm" />
          
          {/* Logo Image */}
          <div className="relative">
            <Image 
              src="/Logo.webp" 
              alt="Yallburru Community Services Logo" 
              className="rounded-full ring-1 ring-white/20" 
              width={80} 
              height={80}
              priority
            />
          </div>
        </motion.div>
      </div>

      {/* Wave SVG Container */}
      <div className="relative">
        {/* Decorative Lines */}
        <motion.div 
          className="absolute inset-0 opacity-[0.15] mix-blend-multiply"
          style={{ scale: dotScale }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]" />
        </motion.div>

        {/* Main Wave */}
        <div className="relative z-[1]">
          {/* Base Wave */}
          <motion.svg
            style={{ y: y1 }}
            viewBox="0 0 1440 100"
            className="w-full h-16 md:h-24 absolute"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0L40,5.3C80,11,160,21,240,32C320,43,400,53,480,58.7C560,64,640,64,720,58.7C800,53,880,43,960,37.3C1040,32,1120,32,1200,37.3C1280,43,1360,53,1400,58.7L1440,64L1440,100L1400,100C1360,100,1280,100,1200,100C1120,100,1040,100,960,100C880,100,800,100,720,100C640,100,560,100,480,100C400,100,320,100,240,100C160,100,80,100,40,100L0,100Z"
              className="fill-gray-50"
            />
          </motion.svg>
          
          {/* Overlay Wave */}
          <motion.svg
            style={{ y: y2 }}
            viewBox="0 0 1440 100"
            className="w-full h-16 md:h-24 relative"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,20L40,24C80,28,160,36,240,41.3C320,47,400,49,480,49.3C560,49,640,47,720,41.3C800,36,880,28,960,26.7C1040,25,1120,31,1200,34.7C1280,39,1360,41,1400,42.7L1440,44L1440,100L1400,100C1360,100,1280,100,1200,100C1120,100,1040,100,960,100C880,100,800,100,720,100C640,100,560,100,480,100C400,100,320,100,240,100C160,100,80,100,40,100L0,100Z"
              className="fill-gray-50/50"
            />
          </motion.svg>
        </div>
      </div>
    </div>
  );
};

export default WaveDivider;