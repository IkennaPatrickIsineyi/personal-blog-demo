import About from "@/components/CMS/About/DataView";
import DataLayout from "@/components/CMS/CMSLayout/DataLayout";

export default function Page() {
    return <DataLayout pageName="About" id="about">
        <About />
    </DataLayout>
}