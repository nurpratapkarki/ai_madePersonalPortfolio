import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Portfolio | AI-First Full-Stack Developer",
  description: "Production-ready portfolio showcasing AI-driven development capabilities with modern web technologies.",
  keywords: ["portfolio", "developer", "AI", "full-stack", "web development"],
  authors: [{ name: "Portfolio Owner" }],
  openGraph: {
    title: "Portfolio | AI-First Full-Stack Developer",
    description: "Production-ready portfolio showcasing AI-driven development capabilities.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased bg-white text-gray-900">
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
