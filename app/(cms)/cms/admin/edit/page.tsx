
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import { Metadata } from "next";
import '@mdxeditor/editor/style.css'
import EditAdmin from "@/components/CMS/Admin/DataEdit";

export const metadata: Metadata = {
    title: "Edit Admin | Wickrose CMS",
    description: "This is Wickrose CMS edit admin section",
};


export default function Page() {
    return <DataLayout pageName="Edit Admin" id="admin">
        <EditAdmin />
    </DataLayout>
}