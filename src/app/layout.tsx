import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tarô Especulativo — Design Especulativo e Pensamento de Futuros",
  description:
    "Explore cenários futuros, consequências imprevistas, vieses ocultos e dilemas éticos através de tiradas de cartas com perguntas provocativas.",
  keywords: [
    "Design Especulativo",
    "Tarô Especulativo",
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
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body
        className="min-h-screen bg-paper text-ink font-sans selection:bg-accent-soft selection:text-accent antialiased overflow-x-hidden flex flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
