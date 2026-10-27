import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "엘든링 위키",
  description: "엘든링 게임 정보 사이트",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
