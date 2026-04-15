import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { UserProvider } from "@/context/UserContext";
import { TourProvider } from "@/context/TourContext";
import { TournamentProvider } from "@/context/TournamentContext";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

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
      <body className={`${playfair.variable} ${dmSans.variable} font-sans min-h-full flex flex-col antialiased`}>
        <UserProvider>
          <TourProvider>
            <TournamentProvider>
              {children}
            </TournamentProvider>
          </TourProvider>
        </UserProvider>
      </body>
    </html>
  );
}
