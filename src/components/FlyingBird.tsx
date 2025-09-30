import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import flyingBird from '@/assets/flying-bird.png';

export const FlyingBird = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed z-50 pointer-events-none"
      initial={{
        x: window.innerWidth * 0.8, // Start from right side of hero image
        y: window.innerHeight * 0.6,
        scale: 1,
        opacity: 0.8
      }}
      animate={{
        x: 150, // End at logo position (approximate)
        y: 50,
        scale: 0.3,
        opacity: 1
      }}
      transition={{
        duration: 4,
        ease: "easeInOut",
        times: [0, 0.7, 1],
      }}
      onAnimationComplete={() => {
        // Hide bird after animation
        setTimeout(() => setIsVisible(false), 1000);
      }}
    >
      <motion.img
        src={flyingBird}
        alt="Flying bird"
        className="w-16 h-16 object-contain"
        animate={{
          y: [-2, 2, -2],
          rotate: [-2, 2, -2]
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};