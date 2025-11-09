import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gradient Collection - Beautiful CSS Gradients",
  description: "A handpicked collection of beautiful color gradients for designers and developers. Explore beautiful gradients for your projects or create your own gradient with the Gradient Maker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}