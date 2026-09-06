import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MobileNav } from '@/components/navigation/MobileNav';
import { CartDrawer } from '@/components/navigation/CartDrawer';
import { ToastNotification } from '@/components/ui/ToastNotification';

export const metadata: Metadata = {
  title: 'ClothLoop.id — Platform Pengelolaan & Jual Beli Pakaian Bekas',
  description:
    'Donasikan pakaian tak terpakai, belanja produk preloved terkurasi, dan dukung karya upcycling perajin lokal Indonesia.',
  keywords: ['preloved', 'upcycling fashion', 'daur ulang pakaian indonesia', 'donasi pakaian', 'thrift curated'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col pb-16 md:pb-0">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileNav />
          <CartDrawer />
          <ToastNotification />
        </AppProvider>
      </body>
    </html>
  );
}
