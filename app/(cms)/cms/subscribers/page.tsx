
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";
import Subscribers from "@/components/CMS/Subscribers/DataView";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Subscribers | Wickrose CMS",
    description: "This is Wickrose CMS subscribers section",
};

export default function Page() {
    return <DataLayout pageName="Subscribers" id="subscribers">
        <Subscribers />
    </DataLayout>
}