import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import { TourProvider } from "@/context/TourContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Golden Point",
  description: "Padel Tournament Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-full flex flex-col antialiased`}>
        <UserProvider>
          <TourProvider>
            {children}
          </TourProvider>
        </UserProvider>
      </body>
    </html>
  );
}
