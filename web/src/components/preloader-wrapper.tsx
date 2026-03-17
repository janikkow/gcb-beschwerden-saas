"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const Preloader = dynamic(() => import("@/components/preloader"), {
  ssr: false,
});

export default function PreloaderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Before hydration: show nothing (body bg is black via CSS)
  if (!mounted) {
    return null;
  }

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {/* Only mount children after preloader is done — this ensures
          TypewriterHeading starts fresh */}
      {!loading && children}
    </>
  );
}
