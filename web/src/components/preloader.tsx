"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShaderAnimation } from "@/components/ui/shader-animation";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [showText, setShowText] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show text after shader renders
    const textTimer = setTimeout(() => setShowText(true), 400);
    // Start exit after text animation
    const exitTimer = setTimeout(() => setVisible(false), 2600);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
    };
  }, []);

  const handleExitComplete = useCallback(() => {
    onComplete();
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[99999] flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Shader background */}
          <div className="absolute inset-0">
            <ShaderAnimation />
          </div>

          {/* Dark overlay for text readability */}
          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          {/* OUTAG3 text */}
          <div className="relative z-10 flex items-center">
            {"OUTAG".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="font-display text-6xl font-extrabold tracking-[0.06em] text-white sm:text-8xl lg:text-9xl"
                initial={{ opacity: 0, y: 30 }}
                animate={
                  showText
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              className="font-display text-6xl font-extrabold tracking-[0.06em] sm:text-8xl lg:text-9xl"
              style={{ color: "var(--brand-400)" }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                showText
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{
                duration: 0.6,
                delay: 5 * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              3
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
