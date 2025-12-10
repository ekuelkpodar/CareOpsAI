import { Sidebar, Card, Badge } from "@careops/ui";

const sidebarItems = [
  { label: "Overview", href: "/console" },
  { label: "Agent Inbox", href: "/console/inbox" },
  { label: "Workflows", href: "/console/workflows" },
  { label: "Patients", href: "/console/patients" },
  { label: "Claims", href: "/console/claims" },
  { label: "Denials", href: "/console/denials" },
  { label: "Documents", href: "/console/documents" },
  { label: "Integrations", href: "/console/integrations" },
  { label: "Compliance & Audit", href: "/console/compliance" },
  { label: "Settings", href: "/console/settings" },
];

const inboxItems = [
  {
    id: "wi-1001",
    agent: "Eligibility & Benefits",
    status: "Needs approval",
    risk: "medium",
    summary: "Confirm MRI prior auth and attach payer requirements",
  },
  {
    id: "wi-1002",
    agent: "Coding Assistant",
    status: "Suggestion",
    risk: "low",
    summary: "Suggested CPT 99213 for follow-up visit with ICD Z00.00",
  },
];

export default function ConsolePage() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar items={sidebarItems} footer={<span>Audit-ready</span>} />
      <main className="flex-1 space-y-6 p-8">
        <header className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Dashboard</p>
            <h2 className="text-2xl font-semibold text-slate-900">Agent Inbox</h2>
          </div>
          <div className="flex items-center gap-3">
            <Badge tone="success">All systems healthy</Badge>
            <button className="rounded-lg bg-brand-700 px-4 py-2 text-sm text-white shadow-sm">New work item</button>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-3">
          <Card title="Open work items" footer="Human-in-the-loop required">24</Card>
          <Card title="Claims ready" footer="Awaiting handoff">12</Card>
          <Card title="Denials triaged" footer="Last 7 days">18</Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-3">
            {inboxItems.map((item) => (
              <Card key={item.id} title={`${item.agent} • ${item.id}`} footer={`Risk: ${item.risk}`}>
                <div className="flex items-center justify-between">
                  <p>{item.summary}</p>
                  <Badge tone="warning">{item.status}</Badge>
                </div>
              </Card>
            ))}
          </div>
          <Card title="Write-back policy">
            <ul className="space-y-2 text-sm">
              <li>• Clinical or billing impacting changes require approval</li>
              <li>• Confidence below 0.80 triggers human review</li>
              <li>• Payer rule mismatches are blocked</li>
              <li>• Audit log is immutable and exportable per tenant</li>
            </ul>
          </Card>
        </section>
      </main>
    </div>
  );
}
