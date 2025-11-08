import type { Metadata } from "next";
import { Providers } from "./components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "DeFi Agent Hub",
  description: "Orchestrate cross-chain DeFi strategies & build reputation on Base + Solana via Farcaster",
  openGraph: {
    title: "DeFi Agent Hub",
    description: "Orchestrate cross-chain DeFi strategies & build reputation on Base + Solana",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
