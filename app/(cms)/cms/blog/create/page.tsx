import EditBlog from "@/components/CMS/Blog/DataEdit";
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import { Metadata } from "next";
import '@mdxeditor/editor/style.css'

export const metadata: Metadata = {
    title: "Create Blog | Wickrose CMS",
    description: "This is Wickrose CMS create blog section",
};


export default function Page() {
    return <DataLayout pageName="Create Blog" id="blog">
        <EditBlog />
    </DataLayout>
}