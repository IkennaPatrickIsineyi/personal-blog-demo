
import React from "react";
import Projects from "../../components/Projects";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Projects",
    description: "Relevant projects that Ikenna has undertaken",
};

export default function Page() {
    return <Projects />
}