"use client";

import { useState } from "react";
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

  return (
    <>
      {children}
      {loading && <Preloader onComplete={() => setLoading(false)} />}
    </>
  );
}
