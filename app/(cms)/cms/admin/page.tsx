import Admin from "@/components/CMS/Admin/DataView";
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin | Wickrose CMS",
    description: "This is Wickrose CMS admin section",
};

export default function Page() {
    return <DataLayout pageName="Admin" id="admin">
        <Admin />
    </DataLayout>
}