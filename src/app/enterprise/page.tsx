import type { Metadata } from "next";
import EnterpriseClientPage from "./EnterpriseClientPage";

export const metadata: Metadata = {
  title: "Enterprise | Nooes",
  description: "Nooes for teams.",
};

export default function EnterprisePage() {
  return <EnterpriseClientPage />;
}

