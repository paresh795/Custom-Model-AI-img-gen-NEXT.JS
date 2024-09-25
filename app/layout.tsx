import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Space_Grotesk } from 'next/font/google';
import "../styles/globals.css";

const inter = Inter({ subsets: ['latin'] });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Mukul Image Gen",
  description: "Create stunning AI-generated images with Mukul Image Gen",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={spaceGrotesk.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}