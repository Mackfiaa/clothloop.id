import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { Navbar } from '@/components/navigation/Navbar';
import { Footer } from '@/components/navigation/Footer';
import { MobileNav } from '@/components/navigation/MobileNav';
import { CartDrawer } from '@/components/navigation/CartDrawer';
import { ToastNotification } from '@/components/ui/ToastNotification';

export const metadata: Metadata = {
  title: 'ClothLoop.id — Circular Fashion Platform Indonesia',
  description:
    'Berikan nafas kedua pada pakaianmu. Donasi, preloved terkurasi, dan rework artisan lokal — satu ekosistem sirkular fashion berkelanjutan.',
  keywords: ['preloved', 'upcycling fashion', 'sustainable fashion indonesia', 'daur ulang pakaian', 'thrift curated'],
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
