import type { Metadata } from "next";
import EnterpriseClientPage from "./EnterpriseClientPage";

export const metadata: Metadata = {
  title: "Nooes | Enterprise solutions for your organisation",
  description: "Contact Nooes for enterprise solutions",
};

export default function EnterprisePage() {
  return <EnterpriseClientPage />;
}

