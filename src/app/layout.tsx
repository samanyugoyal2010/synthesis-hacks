import type { Metadata } from "next";
import { DM_Sans, Host_Grotesk } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const hostGrotesk = Host_Grotesk({
  variable: "--font-host",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Boomerang - AI Agent Collaboration",
  description:
    "Boomerang is a platform for collaborative AI Agents with shared context and unique user actions, powered by Gemini.",
  icons: {
    icon: "/seo/favicon.jpg",
  },
  openGraph: {
    title: "Boomerang - AI Agent Collaboration",
    description:
      "Boomerang is a platform for collaborative AI Agents with shared context and unique user actions, powered by Gemini.",
    images: [{ url: "https://www.try-holmes.com/preview.jpg" }],
    siteName: "Boomerang",
  },
  twitter: {
    card: "summary_large_image",
    site: "@BoomerangAI",
    title: "Boomerang - AI Agent Collaboration",
    description:
      "Boomerang is a platform for collaborative AI Agents with shared context and unique user actions, powered by Gemini.",
    images: ["https://www.try-holmes.com/preview.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${hostGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] font-[family-name:var(--font-dm)] text-foreground">
        {children}
      </body>
    </html>
  );
}
