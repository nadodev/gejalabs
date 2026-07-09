import type { Metadata } from "next";
import { BackgroundGrid } from "@/components/layout/BackgroundGrid";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "GejaLabs - Software Engineering Laboratory",
    template: "%s - GejaLabs",
  },
  description:
    "GejaLabs is a digital laboratory for software engineering: experiments in architecture, AI, backend systems and developer experience.",
  authors: [{ name: "GejaLabs" }],
  openGraph: {
    title: "GejaLabs - Software Engineering Laboratory",
    description:
      "GejaLabs is a digital laboratory for software engineering: experiments in architecture, AI, backend systems and developer experience.",
    type: "website",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f3e70dfb-f83a-4d4d-ab14-17541ebdd965/id-preview-d5e2117b--f8e1edac-0240-4721-bc3e-83b02a33b008.lovable.app-1783621278096.png",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GejaLabs - Software Engineering Laboratory",
    description:
      "GejaLabs is a digital laboratory for software engineering: experiments in architecture, AI, backend systems and developer experience.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/f3e70dfb-f83a-4d4d-ab14-17541ebdd965/id-preview-d5e2117b--f8e1edac-0240-4721-bc3e-83b02a33b008.lovable.app-1783621278096.png",
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        <BackgroundGrid />
        <Navbar />
        <main className="min-h-screen pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
