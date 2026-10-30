import type { Metadata } from 'next';
import localFont from 'next/font/local';

import QueryProvider from '@/providers/QueryProvider';
import ToastContainer from '@/components/common/toast/ToastContainer';

import '@/assets/reset.scss';
import '@/assets/global.scss';

const pretendard = localFont({
  src: '../assets/fonts/PretendardVariable.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '엘든링 위키',
  description: '엘든링 게임 정보 사이트',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} ${pretendard.variable}`}>
        <QueryProvider>{children}</QueryProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
