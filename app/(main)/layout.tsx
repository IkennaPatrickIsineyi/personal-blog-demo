import type { Metadata } from "next";
import "../globals.css";
import Layout from "@/components/Layout";

export const metadata: Metadata = {
  title: "Wickrose",
  description: "This is Wickrose",
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ padding: 0, margin: 0 }}>
        <Layout> {children}</Layout>
      </body>
    </html>
  );
}
