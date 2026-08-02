import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
// Active theme stylesheet — swap for ../themes/terminal/terminal.css to
// bring the terminal look back (see src/themes/terminal/README.md).
import "../themes/serif/serif.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammad Hamdy — backend engineer",
  description:
    "Backend engineer at JPMorgan Chase, ex-Amazon. Distributed systems, Java, Spring, AWS — and the home of tiny.hamdy.app and paste.hamdy.app.",
  metadataBase: new URL("https://hamdy.app"),
  openGraph: {
    title: "Mohammad Hamdy — backend engineer",
    description:
      "Backend engineer at JPMorgan Chase, ex-Amazon. Home of the hamdy.app app family.",
    url: "https://hamdy.app",
    siteName: "hamdy.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body>{children}</body>
    </html>
  );
}
