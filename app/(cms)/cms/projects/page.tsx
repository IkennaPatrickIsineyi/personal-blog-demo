import Project from "@/components/CMS/Projects/DataView";
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Project | Wickrose CMS",
    description: "This is Wickrose CMS project section",
};


export default function Page() {
    return <DataLayout pageName="Project" id="project">
        <Project />
    </DataLayout>
}