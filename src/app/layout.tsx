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
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${spaceGrotesk.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('unhandledrejection', function(event) {
                  var reason = event.reason;
                  var stack = (reason && reason.stack) || '';
                  var message = (reason && reason.message) || String(reason || '');
                  if (
                    stack.indexOf('chrome-extension://') !== -1 ||
                    stack.indexOf('moz-extension://') !== -1 ||
                    message.indexOf('M_ID') !== -1
                  ) {
                    event.preventDefault();
                    event.stopImmediatePropagation();
                  }
                }, true);

                // Filter out hydration warnings caused by extensions modifying the DOM (e.g. Bitdefender's bis_skin_checked)
                var origError = console.error;
                console.error = function() {
                  var args = Array.prototype.slice.call(arguments);
                  var str = args.map(function(a) { return String(a); }).join(' ');
                  if (str.indexOf('bis_skin_checked') !== -1) {
                    return;
                  }
                  origError.apply(console, args);
                };
              }
            `,
          }}
        />
      </head>
      <body
        className="min-h-screen bg-paper text-ink font-sans selection:bg-accent-soft selection:text-accent antialiased overflow-x-hidden flex flex-col"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
