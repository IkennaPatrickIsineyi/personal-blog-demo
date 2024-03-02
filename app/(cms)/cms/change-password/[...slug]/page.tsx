
import { Metadata } from "next";
import ChangePassword from "../../../../../components/CMS/ChangePassword";
import React from "react";

export const metadata: Metadata = {
  title: "Change Password",
  description: "Change your password?",
};

export default function Home() {
  return <ChangePassword />;
}
