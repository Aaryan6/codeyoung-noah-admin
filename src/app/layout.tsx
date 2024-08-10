import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Providers from "@/lib/providers/providers";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "CodeYoung Noah - Admin Dashboard",
  description: "Admin dashboard for QuizApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={outfit.className}>
        <Providers>
          <main className="flex flex-col h-full">
            <Navbar />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
