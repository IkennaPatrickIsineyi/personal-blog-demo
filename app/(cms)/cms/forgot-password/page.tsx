
import { Metadata } from "next";
import ForgotPassword from "../../../../components/CMS/ForgotPassword";
import React from "react";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "Forgot your password?",
};

export default function Home() {
  return <ForgotPassword />;
}
