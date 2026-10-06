"use client";

import dynamic from "next/dynamic";

const LegacySite = dynamic(() => import("@/next/LegacySite"), { ssr: false });

export default function LegacySiteIsland({ routePath = "/" }: { routePath?: string }) {
  return <LegacySite routePath={routePath} />;
}
