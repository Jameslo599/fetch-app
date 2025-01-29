import type { Metadata } from 'next';
import { EB_Garamond } from 'next/font/google';
import './globals.css';

const ebGaramond = EB_Garamond({
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Fetch App',
  description: 'Fetch Rewards take home project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.className} antialiased`}>{children}</body>
    </html>
  );
}
