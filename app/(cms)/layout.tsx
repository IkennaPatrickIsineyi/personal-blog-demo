import type { Metadata } from "next";
import Layout from "@/components/Layout";
import AuthLayout from "@/components/CMS/CMSLayout/AuthLayout";
import { Box } from "@mui/material";
import { useEffect } from "react";
import { connectDb } from "@/utils/connectDb";

export const metadata: Metadata = {
  title: "Wickrose CMS",
  description: "This is Wickrose CMS",
};

export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {

  connectDb();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body style={{ padding: 0, margin: 0 }}>
        <div> {children}</div>
      </body>
    </html>
  );
}
