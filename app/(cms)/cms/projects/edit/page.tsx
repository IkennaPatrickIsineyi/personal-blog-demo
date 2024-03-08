import EditProject from "@/components/CMS/Projects/DataEdit";
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import { Metadata } from "next";
import '@mdxeditor/editor/style.css'

export const metadata: Metadata = {
    title: "Edit Project | Wickrose CMS",
    description: "This is Wickrose CMS edit project section",
};


export default function Page() {
    return <DataLayout pageName="Edit Project" id="project">
        <EditProject />
    </DataLayout>
}