import EditProject from "@/components/CMS/Projects/DataEdit";
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import { Metadata } from "next";
import '@mdxeditor/editor/style.css'

export const metadata: Metadata = {
    title: "Create Project | Wickrose CMS",
    description: "This is Wickrose CMS create project section",
};


export default function Page() {
    return <DataLayout pageName="Create Project" id="project">
        <EditProject />
    </DataLayout>
}