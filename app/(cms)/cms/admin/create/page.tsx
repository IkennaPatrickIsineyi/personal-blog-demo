import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import { Metadata } from "next";
import '@mdxeditor/editor/style.css'
import EditAdmin from "@/components/CMS/Admin/DataEdit";

export const metadata: Metadata = {
    title: "Create Admin | Wickrose CMS",
    description: "This is Wickrose CMS create admin section",
};


export default function Page() {
    return <DataLayout pageName="Create Admin" id="admin">
        <EditAdmin />
    </DataLayout>
}