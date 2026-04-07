import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
import ScrollToTop from "../ScrollToTop";
import Navbar from "./Navbar";
import Footer from "./Footer";
import SetTitle from "@/hooks/SetTitle";
import { AnimatedGridPattern } from "../ui/animated-grid-pattern";
import { cn } from "@/lib/utils";

export default function AppLayout() {
  const location = useLocation();

  useEffect(() => {}, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* BACKGROUND */}
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "skew-y-16",
          "mask-[radial-gradient(1200px_circle_at_center,white,transparent)]",
        )}
      />

      {/* CONTENT */}
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 relative z-10">
        <SetTitle />
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
