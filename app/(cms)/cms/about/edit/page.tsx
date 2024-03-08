import Edit from "@/components/CMS/About/DataEdit";
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import { Metadata } from "next";
import '@mdxeditor/editor/style.css'

export const metadata: Metadata = {
    title: "Edit About | Wickrose CMS",
    description: "This is Wickrose CMS edit about section",
};


export default function Page() {
    return <DataLayout pageName="Edit About" id="about">
        <Edit edit={true} />
    </DataLayout>
}