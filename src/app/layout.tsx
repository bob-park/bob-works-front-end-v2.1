import Providers from '@/redux/Providers';
import './globals.css';

import type { Metadata } from 'next';
import DefaultNavBar from './DefaultNavBar';

export const metadata: Metadata = {
  title: 'Bob Works',
  description: 'Bob 의 만든 통합 사내 결재',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>
          <DefaultNavBar>{children}</DefaultNavBar>
        </Providers>
      </body>
    </html>
  );
}
