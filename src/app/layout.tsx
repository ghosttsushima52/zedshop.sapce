import type { Metadata } from 'next';
import './globals.css';
import { ThemeInit } from '@/core/theme';

export const metadata: Metadata = {
  title: 'Avenox Çoklu Site Vitrini',
  description: 'Avenox Web Stüdyosu için statik olarak dışa aktarılabilir çoklu site vitrini.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body><ThemeInit />{children}</body>
    </html>
  );
}
