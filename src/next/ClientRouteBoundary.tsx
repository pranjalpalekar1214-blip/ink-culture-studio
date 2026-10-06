"use client";

import dynamic from "next/dynamic";

const NativeRoutePage = dynamic(() => import("./NativeRoutePage"), { ssr: false });

export default function ClientRouteBoundary({ routePath = "/" }: { routePath?: string }) {
  return <NativeRoutePage routePath={routePath} />;
}
