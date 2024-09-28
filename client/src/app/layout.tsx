import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../feature/header";

export const metadata: Metadata = {
  title: "BrealApps",
  description: "some application by Breal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow mt-[84px]">
          {children}
        </main>
      </body>
    </html>
  );
}