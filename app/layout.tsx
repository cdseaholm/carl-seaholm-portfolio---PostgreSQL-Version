import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from '../components/nav/Navbar';
import FooterNavBar from "@/components/footer/footerNavbar";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="first">
        <SpeedInsights/>
        <Providers>
          <Navbar />
          <main className="min-h-screen backdrop-opacity-100">
          {children}
          </main>
          <FooterNavBar />
        </Providers>
        </div>
      </body>
    </html>
  );
}