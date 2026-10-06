import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/index.css";
import { JsonLd } from "@/next/JsonLd";
import { homeJsonLd } from "@/next/route-metadata";

export const metadata: Metadata = {
  title: "Street Culture Tattoo & Academy | Tattoo Studio in Mumbai",
  description:
    "Street Culture is a custom tattoo and piercing studio and academy in Kandivali West, Mumbai.",
  metadataBase: new URL("https://streetculture.tattoo"),
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <JsonLd data={homeJsonLd()} />
        {children}
      </body>
    </html>
  );
}
