"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import dollar_sign from "../../public/dollar_sign.gif";
import xIcon from "../../public/x.svg";
import telegramIcon from "../../public/telegram.svg";
import questionIcon from "../../public/question-mark.svg";
import ClientModalWrapper from "../components/ClientModalWrapper";
import { WalletProvider } from "../providers/WalletProvider";
import ClientLayout from "../components/ClientLayout";
import { ReduxProvider } from "../providers/ReduxProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "../providers/AppProvider";
import { Toaster } from "sonner";
import { CoreumProvider } from "../providers/CoreumProvider";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contractQueryClient = new QueryClient();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]`}
      >
        <ReduxProvider>
          <Analytics />
          <QueryClientProvider client={contractQueryClient}>
            <WalletProvider>
              <AppProvider>
                <CoreumProvider>
                  <ClientLayout
                    dollarSignSrc={dollar_sign.src}
                    xIconSrc={xIcon.src}
                    telegramIconSrc={telegramIcon.src}
                    questionIconSrc={questionIcon.src}
                  >
                    {children}
                  </ClientLayout>
                </CoreumProvider>
              </AppProvider>
            </WalletProvider>
          </QueryClientProvider>
        </ReduxProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
