// src/components/AnimatedDigit.jsx

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function AnimatedDigit({ value }) {
  return (
    <div className="w-8 h-12 relative overflow-hidden text-center text-4xl font-mono">
      <AnimatePresence initial={false} mode="popLayout">
        <motion.div
          key={value}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute w-full"
        >
          {value}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default AnimatedDigit;
