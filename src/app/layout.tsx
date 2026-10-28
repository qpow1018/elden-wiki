import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const pretendard = localFont({
  src: "./assets/fonts/PretendardVariable.woff2",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  title: "엘든링 위키",
  description: "엘든링 게임 정보 사이트",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>{children}</body>
    </html>
  );
}
