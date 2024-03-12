import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import { Metadata } from "next";
import '@mdxeditor/editor/style.css'
import EditSubscriber from "@/components/CMS/Subscribers/DataEdit";

export const metadata: Metadata = {
    title: "Create Subscriber | Wickrose CMS",
    description: "This is Wickrose CMS create subscriber section",
};


export default function Page() {
    return <DataLayout pageName="Create Subscriber" id="subscriber">
        <EditSubscriber />
    </DataLayout>
}