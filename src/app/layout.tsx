import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "gitfyi",
  description: "Showcase your github stuff",
};


const font = ''

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
