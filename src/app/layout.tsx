import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { DataProvider } from '@/context/DataContext';

export const metadata: Metadata = {
  title: 'Volta Motor | Resmi Satış, Dönüşüm Servisi & Yedek Parça',
  description: 'Türkiye’nin lider elektrikli mobilite markası Volta Motor. Elektrikli motosiklet, moped ve bisiklet modelleri, 2 yıl fabrika garantisi ve 81 ilde yetkili servis ağı.',
  icons: {
    icon: '/volta-service-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className="antialiased selection:bg-red-600 selection:text-white">
        <AuthProvider>
          <DataProvider>
            {children}
          </DataProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
