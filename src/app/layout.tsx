import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ReactQueryProvider from "@/components/providers/tanstack-query-provider";
import "driver.js/dist/driver.css";
import "./globals.css";
import GitHub from "@/components/icons";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FP - Frontend Task",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <main className="relative">
            {children}

            <div className="fixed bottom-4 right-4 z-50" id="github-link">
              <Link href="https://github.com/shboul1/FB-task" target="_blank">
                <GitHub />
              </Link>
            </div>
          </main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
