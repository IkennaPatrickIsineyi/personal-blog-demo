
import React from "react";
import About from "../../../components/About";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Ikenna",
    description: "All you need to know about Ikenna professionally",
};

export default function Page() {
    return <About />
}