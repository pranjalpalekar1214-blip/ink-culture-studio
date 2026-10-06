"use client";

import "../index.css";
import React, { Suspense, lazy, useEffect } from "react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { BlockHitLayer } from "@/components/BlockHitLayer";
import { PixelCloud } from "@/components/PixelCloud";
import { CursorProvider } from "@/components/Cursor";
import { useMysteryTracker } from "@/lib/mystery";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { StickyBookBar } from "@/components/StickyBookBar";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Intro } from "@/components/Intro";
import { SocialDock } from "@/components/SocialDock";

const Landing = lazy(() => import("../legacy-pages/Home"));
const About = lazy(() => import("../legacy-pages/About"));
const Artists = lazy(() => import("../legacy-pages/Artists"));
const Portfolio = lazy(() => import("../legacy-pages/Portfolio"));
const Gallery = lazy(() => import("../legacy-pages/Gallery"));
const Academy = lazy(() => import("../legacy-pages/Academy"));
const Blog = lazy(() => import("../legacy-pages/Blog"));
const BlogPost = lazy(() => import("../legacy-pages/BlogPost"));
const Careers = lazy(() => import("../legacy-pages/Careers"));
const Contact = lazy(() => import("../legacy-pages/Contact"));
const Book = lazy(() => import("../legacy-pages/Book"));
const ConceptLab = lazy(() => import("../legacy-pages/ConceptLab"));
const NotFound = lazy(() => import("../legacy-pages/NotFound"));

function RouteSyncer() {
  useMysteryTracker();
  const location = useLocation();

  useEffect(() => {
    if (window.parent !== window) {
      window.parent.postMessage({ type: "iframe-route-change", path: location.pathname }, "*");
    }
  }, [location.pathname]);

  return null;
}

function RouteLoading() {
  return <div className="flex min-h-screen items-center justify-center bg-ink font-display text-xs uppercase tracking-[0.3em] text-bone/40">Loading…</div>;
}

function SiteLayout() {
  return (
    <CursorProvider>
      <ScrollToTop />
      <Intro />
      <BlockHitLayer />
      <PixelCloud />
      <Navbar />
      <div id="main">
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:artistId" element={<Portfolio />} />
            <Route path="/artists/:artistId/portfolio" element={<Portfolio />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/book" element={<Book />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/concept" element={<ConceptLab />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
      <StickyBookBar />
      <SocialDock />
    </CursorProvider>
  );
}

export default function LegacySite({ routePath = "/" }: { routePath?: string }) {
  return (
    <>
      <MemoryRouter initialEntries={[routePath]}>
        <RouteSyncer />
        <SiteLayout />
      </MemoryRouter>
      <Toaster />
      <SpeedInsights />
    </>
  );
}
