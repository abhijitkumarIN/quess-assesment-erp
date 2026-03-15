import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quess SignIn Page | Quess - Quess Dashboard Template",
  description: "This is Quess Signin Page Quess Dashboard Template",
};

export default function SignIn() {
  return <SignInForm />;
}
