import EditBlog from "@/components/CMS/Blog/DataEdit";
import Blog from "@/components/CMS/Blog/DataView";
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Create Blog | Wickrose CMS",
    description: "This is Wickrose CMS create blog section",
};


export default function Page() {
    return <DataLayout pageName="Create Blog" id="blog">
        <EditBlog />
    </DataLayout>
}