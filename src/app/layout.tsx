import type { Metadata } from 'next';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import ToastProvider from '@/components/toast/ToastProvider';

import DefaultNavBar from './DefaultNavBar';
import RQProvider from './_component/RQProvider';
import './globals.css';

const CLIENT_SERVICE_PATH = process.env.CLIENT_SERVICE_PATH;

export const metadata: Metadata = {
  title: 'Bob Works',
  description: 'Bob 의 만든 통합 사내 결재',
  icons: ['/favicon.ico'],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();

  const apiResponse = await fetch(CLIENT_SERVICE_PATH + '/user', {
    method: 'get',
    headers: {
      Cookie: `JSESSIONID=${cookieStore.get('JSESSIONID')?.value || ''}`,
    },
  });

  if (!apiResponse.ok) {
    redirect('/api/oauth2/authorization/bob-works');
  }

  const user = await apiResponse.json();

  return (
    <html lang="ko">
      <head>
        {process.env.NODE_ENV !== 'production' && <script src="https://unpkg.com/react-scan/dist/auto.global.js" />}
      </head>
      <body>
        <ToastProvider limit={5} timeout={5}>
          <RQProvider>
            <DefaultNavBar user={user}>{children}</DefaultNavBar>
          </RQProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
