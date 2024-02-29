
import React from "react";
import { Metadata } from "next";
import NewsletterPage from "../../components/NewsletterPage";

export const metadata: Metadata = {
    title: "Newsletter",
    description: "Subscribe to get notified of any new update",
};

export default function Page() {
    return <NewsletterPage />
}