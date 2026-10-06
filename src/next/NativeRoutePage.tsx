"use client";

import "../index.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { CursorProvider } from "@/components/Cursor";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyBookBar } from "@/components/StickyBookBar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Intro } from "@/components/Intro";
import { SocialDock } from "@/components/SocialDock";
import { BlockHitLayer } from "@/components/BlockHitLayer";
import { PixelCloud } from "@/components/PixelCloud";
import Portfolio from "../legacy-pages/Portfolio";
import BlogPost from "../legacy-pages/BlogPost";
import ConceptLab from "../legacy-pages/ConceptLab";
import NotFound from "../legacy-pages/NotFound";

type NativeRoute = "artist" | "blog" | "concept";

function RouteSyncer() {
  const location = useLocation();
  return <>{location.pathname && null}</>;
}

function NativeContent({ route }: { route: NativeRoute }) {
  return (
    <Routes>
      {route === "artist" && <>
        <Route path="/artists/:artistId" element={<Portfolio />} />
        <Route path="/artists/:artistId/portfolio" element={<Portfolio />} />
      </>}
      {route === "blog" && <Route path="/blog/:slug" element={<BlogPost />} />}
      {route === "concept" && <Route path="/concept" element={<ConceptLab />} />}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function NativeRoutePage({ route }: { route: NativeRoute }) {
  return (
    <>
      <BrowserRouter>
        <RouteSyncer />
        <CursorProvider>
          <ScrollToTop />
          <Intro />
          <BlockHitLayer />
          <PixelCloud />
          <Navbar />
          <main id="main"><NativeContent route={route} /></main>
          <Footer />
          <StickyBookBar />
          <SocialDock />
        </CursorProvider>
      </BrowserRouter>
      <Toaster />
      <SpeedInsights />
    </>
  );
}
