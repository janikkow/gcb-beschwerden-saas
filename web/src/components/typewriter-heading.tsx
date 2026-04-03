"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TypewriterHeadingProps {
  text: string;
  /** Millisekunden pro Buchstabe (default 45) */
  speed?: number;
  /** Verzögerung bevor das Tippen startet in ms (default 300) */
  delay?: number;
  className?: string;
}

export default function TypewriterHeading({
  text,
  speed = 45,
  delay = 300,
  className,
}: TypewriterHeadingProps) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) {
      setDisplayed(text);
      setDone(true);
      return;
    }

    setDisplayed("");
    setDone(false);

    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (i < text.length) {
        i++;
        setDisplayed(text.slice(0, i));
        timeout = setTimeout(type, speed);
      } else {
        setDone(true);
      }
    };

    timeout = setTimeout(type, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay, reduceMotion]);

  return (
    <h1 className={cn(className, "break-words")} aria-label={text}>
      {displayed}
      <span
        aria-hidden
        className={`inline-block w-[3px] translate-y-[0.05em] bg-brand-400 ${
          done ? "animate-blink" : ""
        }`}
        style={{ height: "0.85em", marginLeft: "2px" }}
      />
    </h1>
  );
}
