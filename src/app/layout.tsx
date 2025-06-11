import './globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ClientCartProvider from '@/components/ClientCartProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'The Comb Overs',
  description: 'Rocking the Dome',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="landscape-message hidden md:block text-center p-4 text-white bg-black">
          Please rotate your device to portrait mode for the best experience!
        </div>
        <Header />
        <ClientCartProvider>{children}</ClientCartProvider>
        <Footer />
      </body>
    </html>
  );
}