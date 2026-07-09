import type { ReactNode } from "react";
import { BackgroundGrid } from "@/components/layout/BackgroundGrid";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <BackgroundGrid />
      <Navbar />
      <main className="min-h-screen pt-16">{children}</main>
      <Footer />
    </>
  );
}
