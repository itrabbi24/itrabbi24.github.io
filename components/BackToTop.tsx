'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.75, y: 12 }}
          animate={{ opacity: 1, scale: 1,    y: 0  }}
          exit={{    opacity: 0, scale: 0.75, y: 12 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-50 w-11 h-11 flex items-center justify-center rounded-xl text-white transition-all hover:scale-110 hover:brightness-110"
          style={{
            background: 'linear-gradient(135deg, var(--cyan), var(--violet))',
            boxShadow: '0 4px 24px var(--glow-c)',
          }}
          aria-label="Back to top"
        >
          <FiArrowUp size={17} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
