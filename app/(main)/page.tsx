
import IndexPage from "@/components/IndexPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "This is the blog section",
};

export default function Home() {
  return <IndexPage />;
}
