import type { Metadata } from 'next';
import { Roboto, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Header from '../components/Header';

const robotoSans = Roboto({
  variable: '--font-roboto-sans',
  subsets: ['latin'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jera Capital UI',
  description: 'UI project to simulate investments',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`flex flex-col h-dvh ${robotoSans.variable} ${robotoMono.variable} antialiased`}>
        <div className="flex flex-1 justify-center bg-zinc-50 font-sans text-stone-800">
          <main className="flex flex-1 w-full max-w-8xl flex-col items-center justify-start pt-26 px-6 bg-white">
            <Header />

            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
