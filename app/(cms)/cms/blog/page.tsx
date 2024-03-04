import Blog from "@/components/CMS/Blog";
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";

export default function Page() {
    return <DataLayout pageName="Blog" id="blog">
        <Blog />
    </DataLayout>
}