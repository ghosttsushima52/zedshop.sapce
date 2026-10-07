import type { Metadata } from 'next';
import './globals.css';
import { ThemeInit } from '@/core/theme';

export const metadata: Metadata = {
  title: 'Avenox Çoklu Site Vitrini — 12 Sektör, 12 Tasarım Sistemi',
  description: 'Avenox Web Stüdyosu için statik olarak dışa aktarılabilir, sektörlere özel editoryal ve modern çoklu site vitrini.',
};

import { AuthProvider, GateProtector } from '@/features/auth/AuthContext';
import { AnimatedEntryGate } from '@/features/auth/AnimatedEntryGate';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <AuthProvider>
          <ThemeInit />
          <AnimatedEntryGate />
          <GateProtector>
            {children}
          </GateProtector>
        </AuthProvider>
      </body>
    </html>
  );
}
