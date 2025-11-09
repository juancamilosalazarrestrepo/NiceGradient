import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nice Gradient - Beautiful CSS Gradients Collection",
  description: "A handpicked collection of beautiful color gradients for designers and developers. Explore stunning gradients with poetic descriptions or create your own with our Gradient Maker.",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '192x192', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
  },
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