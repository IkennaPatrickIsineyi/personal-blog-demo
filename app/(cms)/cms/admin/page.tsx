import Admin from "@/components/CMS/Admin/DataView";
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";

export default function Page() {
    return <DataLayout pageName="Admin" id="admin">
        <Admin />
    </DataLayout>
}