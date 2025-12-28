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
  title: "Energia Electrica Chile | NewCooltura Informada",
  description: "Buscador de distribuidoras electricas, tarifas, calculadora de consumo y subsidios de energia en Chile",
  keywords: ["energia Chile", "tarifas electricas", "calculadora consumo", "subsidio electricidad", "cortes luz"],
  openGraph: {
    title: "Energia Electrica Chile - NewCooltura Informada",
    description: "Tarifas, consumo y subsidios electricos",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
