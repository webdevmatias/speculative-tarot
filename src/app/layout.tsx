import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tarot Especulativo — Ferramenta de Design Especulativo e Pensamento de Futuros",
  description:
    "Explore cenários futuros, consequências imprevistas, vieses ocultos e dilemas éticos através de tiradas de cartas com perguntas provocativas.",
  keywords: [
    "Design Especulativo",
    "Tarot Especulativo",
    "Futuros Alternativos",
    "Foresight",
    "Inovação",
    "Design Thinking",
    "Ética em Tecnologia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-paper text-ink font-sans selection:bg-accent-soft selection:text-accent antialiased overflow-x-hidden flex flex-col">
        {children}
      </body>
    </html>
  );
}
