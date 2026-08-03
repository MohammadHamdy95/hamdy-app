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
  title: "Mohammad Hamdy — Backend Engineer",
  description:
    "Backend engineer with 4 years of experience building Java, Spring, AWS, and distributed systems at Amazon and JPMorgan Chase.",
  metadataBase: new URL("https://hamdy.app"),
  alternates: { canonical: "https://hamdy.app" },
  openGraph: {
    title: "Mohammad Hamdy — Backend Engineer",
    description:
      "Backend engineer with 4 years of experience building Java, Spring, AWS, and distributed systems at Amazon and JPMorgan Chase.",
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
