import Link from "next/link";
import { Badge, Card } from "@careops/ui";

const agents = [
  { name: "Intake & Registration", desc: "Collect demographics, insurance, consent with validation.", tone: "info" },
  { name: "Eligibility & Benefits", desc: "Verify coverage, summarize copays and prior auth risk.", tone: "success" },
  { name: "Coding Assistant", desc: "Suggest CPT/ICD with audit-ready rationale.", tone: "warning" },
  { name: "Claims Prep", desc: "Package clean claims with payer rule checks.", tone: "success" },
  { name: "Denials & Appeals", desc: "Classify denial reasons and draft appeals.", tone: "danger" },
  { name: "Fax Intake", desc: "OCR, classify, and map documents to FHIR.", tone: "info" },
];

export default function MarketingPage() {
  return (
    <main>
      <section className="section-shell">
        <div className="glow-card p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl space-y-5">
              <Badge tone="info">HIPAA-aligned AI agents</Badge>
              <h1 className="font-display text-4xl font-semibold text-slate-900 sm:text-5xl">AI agents for EHR + RCM</h1>
              <p className="text-lg text-slate-700">
                Reduce admin time, speed reimbursement, and cut denials with auditable, human-in-the-loop AI. Built for clinics that need trust and control.
              </p>
              <div className="flex gap-3">
                <Link href="/console" className="rounded-lg bg-brand-700 px-4 py-2 text-white shadow-lg shadow-brand-500/20">Book a demo</Link>
                <Link href="/console" className="rounded-lg border border-slate-200 px-4 py-2 text-slate-800">See console</Link>
              </div>
            </div>
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
              <p className="text-sm font-semibold text-slate-700">Agent control center</p>
              <div className="mt-3 space-y-2">
                {agents.slice(0, 4).map((agent) => (
                  <div key={agent.name} className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2">
                    <div>
                      <div className="text-sm font-medium text-slate-800">{agent.name}</div>
                      <div className="text-xs text-slate-500">Risk-aware, human approval built-in</div>
                    </div>
                    <Badge tone="info">Safe</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell grid gap-6 lg:grid-cols-2">
        <Card title="Benefits" footer="Designed for billing, clinical ops, and compliance teams.">
          <ul className="space-y-2 text-slate-700">
            <li>• 60% reduction in manual intake and eligibility checks</li>
            <li>• Faster reimbursements with clean claims and payer rules</li>
            <li>• Lower denial rates through proactive documentation</li>
            <li>• Human-in-the-loop controls and full audit trails</li>
          </ul>
        </Card>
        <Card title="Security & Trust" footer="Supports HIPAA alignment and SOC 2 readiness.">
          <ul className="space-y-2 text-slate-700">
            <li>• PHI redaction for non-essential model calls</li>
            <li>• Role-based access with tenant isolation</li>
            <li>• Signed URLs for documents and immutable audit logs</li>
            <li>• Break-glass and approval policies configurable per tenant</li>
          </ul>
        </Card>
      </section>

      <section className="section-shell">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <Card key={agent.name} title={agent.name} footer={<Badge tone="info">{agent.tone}</Badge>}>
              {agent.desc}
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
