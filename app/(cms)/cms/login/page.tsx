
import Login from "@/components/CMS/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login page of the CMS",
};

export default function Home() {
  return <Login />;
}
