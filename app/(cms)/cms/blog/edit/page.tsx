import EditBlog from "@/components/CMS/Blog/DataEdit";
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import { Metadata } from "next";
import '@mdxeditor/editor/style.css'

export const metadata: Metadata = {
    title: "Edit Blog Post | Wickrose CMS",
    description: "This is Wickrose CMS edit blog post section",
};


export default function Page() {
    return <DataLayout pageName="Edit Blog" id="blog">
        <EditBlog />
    </DataLayout>
}