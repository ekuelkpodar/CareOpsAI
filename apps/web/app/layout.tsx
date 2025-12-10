import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CareOps AI | EHR + RCM Agents",
  description: "AI agents that reduce admin burden and speed reimbursement with HIPAA-aligned guardrails.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
