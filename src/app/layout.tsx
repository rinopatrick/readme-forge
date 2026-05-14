import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "README Forge — GitHub Profile README Generator",
  description:
    "Generate stunning GitHub profile READMEs with live preview. Choose templates, customize components, and export in seconds. Free and open source.",
  keywords: [
    "github",
    "readme",
    "profile",
    "generator",
    "developer",
    "markdown",
    "readme generator",
    "github profile",
    "github readme",
  ],
  openGraph: {
    title: "README Forge — GitHub Profile README Generator",
    description:
      "Generate stunning GitHub profile READMEs with live preview. Free and open source.",
    type: "website",
    siteName: "README Forge",
  },
  twitter: {
    card: "summary_large_image",
    title: "README Forge — GitHub Profile README Generator",
    description:
      "Generate stunning GitHub profile READMEs with live preview. Free and open source.",
  },
  icons: {
    icon: "/favicon.svg",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full overflow-hidden bg-zinc-950 text-white font-sans">
        {children}
      </body>
    </html>
  );
}
