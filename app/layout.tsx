import type { Metadata } from "next";
import { Providers } from "./components/Providers";
import { Header } from "./components/Header";
import { Navigation } from "./components/Navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeFi Agent Hub",
  description: "Orchestrate cross-chain DeFi strategies & build reputation on Base + Solana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main className="pt-20 pb-24 min-h-screen">
            {children}
          </main>
          <Navigation />
        </Providers>
      </body>
    </html>
  );
}
