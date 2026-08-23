import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cottorway = localFont({
  src: [
    { path: "./fonts/cottorway-regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/cottorway-bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-cottorway",
  display: "swap",
});

const dazzle = localFont({
  src: "./fonts/dazzle-bold.otf",
  variable: "--font-dazzle",
  display: "swap",
});

const inter = localFont({
  src: "./fonts/inter-latin.woff2",
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin.woff2",
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const caveat = localFont({
  src: "./fonts/caveat-latin.woff2",
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madie — Pastelería de Madeleines Francesas en Chamberí, Madrid",
  description:
    "Madeleines francesas recién horneadas y cafés de especialidad en Chamberí, Madrid.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${cottorway.variable} ${dazzle.variable} ${inter.variable} ${jetbrainsMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#102F35]">
        {children}
      </body>
    </html>
  );
}
