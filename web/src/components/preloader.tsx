"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ShaderAnimation } from "@/components/ui/shader-animation";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [showText, setShowText] = useState(false);
  const [visible, setVisible] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), reduceMotion ? 0 : 400);
    const exitTimer = setTimeout(() => setVisible(false), reduceMotion ? 900 : 2600);
    return () => {
      clearTimeout(textTimer);
      clearTimeout(exitTimer);
    };
  }, [reduceMotion]);

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
          transition={{ duration: reduceMotion ? 0.2 : 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="absolute inset-0">
            {reduceMotion ? <div className="h-full w-full bg-black" /> : <ShaderAnimation />}
          </div>

          <motion.div
            className="absolute inset-0 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.5 }}
          />

          <div className="relative z-10 flex items-center">
            {"OUTAG".split("").map((letter, i) => (
              <motion.span
                key={i}
                className="font-display text-6xl font-extrabold tracking-[0.06em] text-white sm:text-8xl lg:text-9xl"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={
                  showText
                    ? reduceMotion
                      ? { opacity: 1 }
                      : { opacity: 1, y: 0 }
                    : reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 30 }
                }
                transition={{
                  duration: reduceMotion ? 0.2 : 0.5,
                  delay: reduceMotion ? 0 : i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
            <motion.span
              className="font-display text-6xl font-extrabold tracking-[0.06em] sm:text-8xl lg:text-9xl"
              style={{ color: "var(--brand-400)" }}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
              animate={
                showText
                  ? reduceMotion
                    ? { opacity: 1 }
                    : { opacity: 1, scale: 1 }
                  : reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.5 }
              }
              transition={{
                duration: reduceMotion ? 0.2 : 0.6,
                delay: reduceMotion ? 0 : 5 * 0.08,
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
