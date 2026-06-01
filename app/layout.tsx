import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/app/components/Sidebar";
import LoadingScreen from "@/app/components/LoadingScreen";
import { TransitionProvider } from "@/app/contexts/TransitionContext";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "GTG Studios — Film & Video Production",
  description:
    "GTG Studios is a full-service film and video production company crafting compelling content for ambitious brands and global audiences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <TransitionProvider>
          <LoadingScreen />
          <Sidebar />
          <div className="page-offset">{children}</div>
        </TransitionProvider>
      </body>
    </html>
  );
}
