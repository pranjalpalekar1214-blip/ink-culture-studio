"use client";

import dynamic from "next/dynamic";

const NativeRoutePage = dynamic(() => import("./NativeRoutePage"), { ssr: false });

export default function ClientRouteBoundary({ route }: { route: "artist" | "blog" | "concept" }) {
  return <NativeRoutePage route={route} />;
}
