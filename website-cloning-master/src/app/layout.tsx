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
  title: "Holmes – Autonomous Desktop",
  description:
    "Holmes is an autonomous AI agent for macOS that reads your screen and acts before you ask. Join the waitlist.",
  icons: {
    icon: "/seo/favicon.jpg",
  },
  openGraph: {
    title: "Holmes – Autonomous Desktop",
    description:
      "Holmes is an autonomous AI agent for macOS that reads your screen and acts before you ask. Join the waitlist.",
    images: [{ url: "https://www.try-holmes.com/preview.jpg" }],
    siteName: "Holmes",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tryholmesai",
    title: "Holmes – Autonomous Desktop",
    description:
      "Holmes is an autonomous AI agent for macOS that reads your screen and acts before you ask. Join the waitlist.",
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
