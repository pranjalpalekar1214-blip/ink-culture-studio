import '@vly-ai/integrations';
import { Toaster } from "@/components/ui/sonner";
import { VlyToolbar } from "../vly-toolbar-readonly.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import React, { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";

// Site chrome
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

// Lazy load route components for better code splitting
const Landing = lazy(() => import("./pages/Home.tsx"));
const About = lazy(() => import("./pages/About.tsx"));
const Artists = lazy(() => import("./pages/Artists.tsx"));
const ArtistDetail = lazy(() => import("./pages/ArtistDetail.tsx"));
const Gallery = lazy(() => import("./pages/Gallery.tsx"));
const Academy = lazy(() => import("./pages/Academy.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const Book = lazy(() => import("./pages/Book.tsx"));
const Redeem = lazy(() => import("./pages/Redeem.tsx"));
const Careers = lazy(() => import("./pages/Careers.tsx"));
const ContactPage = lazy(() => import("./pages/Contact.tsx"));
const ConceptLab = lazy(() => import("./pages/ConceptLab.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <div className="animate-pulse font-display text-xs uppercase tracking-[0.3em] text-bone/40">
        Loading…
      </div>
    </div>
  );
}

/** Silent error boundary — if VlyToolbar crashes it renders nothing instead of
 *  crashing the whole app (e.g. hook errors in the browser runtime). */
class ToolbarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.warn("[VlyToolbar] Caught error, toolbar disabled:", err.message);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/** Hard guard so runtime errors never leave the preview as a blank page. */
class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string; stack: string }
> {
  state = { hasError: false, message: "", stack: "" };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error.message || "Unknown runtime error",
      stack: error.stack || "",
    };
  }
  componentDidCatch(err: Error) {
    console.error("[Preview] Root crash:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-6">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold">Preview runtime error</p>
            <p className="mt-2 text-xs text-muted-foreground break-words">
              {this.state.message}
            </p>
            {this.state.stack && (
              <pre className="mt-3 text-left text-[10px] leading-4 text-muted-foreground/80 max-h-40 overflow-auto rounded border border-border/60 p-2">
                {this.state.stack}
              </pre>
            )}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
const convex = convexUrl ? new ConvexReactClient(convexUrl) : null;

function RouteSyncer() {
  useMysteryTracker();
  const location = useLocation();
  useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: location.pathname },
      "*",
    );
  }, [location.pathname]);

  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

/** Marketing-site shell: cursor + chrome around every public page. */
function ConvexUnavailable() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-ink px-6 py-24 text-center">
      <div>
        <p className="font-display text-xs uppercase tracking-[0.3em] text-bone/50">
          Studio services unavailable
        </p>
        <p className="mt-3 max-w-md text-sm text-bone/70">
          This preview is running without its Convex backend. The rest of the studio remains available.
        </p>
      </div>
    </main>
  );
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
            <Route path="/artists/:artistId" element={<ArtistDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/book" element={convex ? <Book /> : <ConvexUnavailable />} />
            {/* Staff-only counter terminal: validate + burn mystery codes. Unlinked. */}
            <Route path="/redeem" element={convex ? <Redeem /> : <ConvexUnavailable />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/concept" element={convex ? <ConceptLab /> : <ConvexUnavailable />} />
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

function AppProviders() {
  const content = (
    <>
      <BrowserRouter>
        <RouteSyncer />
        <SiteLayout />
      </BrowserRouter>
      <Toaster />
    </>
  );

  return convex ? (
    <ConvexAuthProvider client={convex}>{content}</ConvexAuthProvider>
  ) : (
    content
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <ToolbarErrorBoundary>
        <VlyToolbar />
      </ToolbarErrorBoundary>
      <AppProviders />
    </RootErrorBoundary>
  </StrictMode>,
);
