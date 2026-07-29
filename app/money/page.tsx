"use client";
import { PageHead, Card, Stat, Pill, AreaChart, Meter } from "@/components/ui";
import { eur } from "@/components/ui";
import { invoices, cashflow, cashLabels } from "@/lib/data";
import { Cash, Warn, Check, Send, Bolt, ArrowRight, Clock } from "@/components/icons";

const statusTone: Record<string, "g" | "b" | "y" | "r"> = { Paid: "g", Sent: "b", "Due soon": "y", Overdue: "r" };

export default function MoneyPage() {
  const overdue = invoices.filter((i) => i.status === "Overdue");
  const overdueVal = overdue.reduce((a, i) => a + i.amount, 0);
  const outstanding = invoices.filter((i) => i.status !== "Paid").reduce((a, i) => a + i.amount, 0);
  return (
    <>
      <PageHead eyebrow="The Collector" title="Money" sub="Every invoice watched, every reminder sent on time. You get paid without becoming a debt collector.">
        <span className="pill r"><Warn width={13} height={13} /> {eur(overdueVal)} overdue</span>
        <button className="btn primary"><Send /> New invoice</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Collected this month" value={eur(11020)} delta="+18% vs last" deltaDir="up" icon={<Check />} variant="accent" />
        <Stat label="Outstanding" value={eur(outstanding)} delta={`${invoices.filter((i) => i.status !== "Paid").length} open`} deltaDir="flat" icon={<Cash />} />
        <Stat label="Overdue" value={eur(overdueVal)} delta={`${overdue.length} invoices`} deltaDir="down" icon={<Warn />} />
        <Stat label="Avg. days to pay" value={19} unit="days" delta="was 31" deltaDir="up" icon={<Clock />} variant="volt" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start", marginBottom: 16 }}>
        <Card title="Cash flow" sub="Rolling 10 weeks · £ thousands" icon={<Cash width={17} height={17} />} right={<Pill tone="g">Healthy</Pill>}>
          <AreaChart data={cashflow} labels={cashLabels} h={196} color="var(--cobalt)" />
        </Card>
        <Card title="Chase ladder" sub="Automatic, escalating politely" icon={<Bolt width={17} height={17} />}>
          <div className="timeline">
            {[
              { t: "Day 0 — invoice sent + payment link", tone: "done" },
              { t: "Day 7 — friendly reminder", tone: "done" },
              { t: "Day 14 — second reminder + statement", tone: "done" },
              { t: "Day 21 — final notice, flag for a call", tone: "now" },
              { t: "Escalate to you — only if judgement needed", tone: "" },
            ].map((s, i) => (
              <div key={i} className={`tl-item ${s.tone}`}><div className="tt" style={{ fontSize: 12.5 }}>{s.t}</div></div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Invoices" icon={<Cash width={17} height={17} />} pad={false} right={<button className="btn sm ghost">Export</button>}>
        <div className="scrollx">
          <table className="table">
            <thead><tr><th>Invoice</th><th>Client</th><th className="num">Amount</th><th>Due</th><th>Status</th><th className="num">Reminders</th><th></th></tr></thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="mono tiny muted">{inv.id}</td>
                  <td style={{ fontWeight: 620 }}>{inv.client}</td>
                  <td className="num" style={{ fontWeight: 700 }}>{eur(inv.amount)}</td>
                  <td className="tiny muted">{inv.due}{inv.status === "Overdue" ? <span style={{ color: "var(--danger)", fontWeight: 600 }}> · {inv.days}d late</span> : null}</td>
                  <td><Pill tone={statusTone[inv.status]}>{inv.status}</Pill></td>
                  <td className="num tiny muted">{inv.reminders}×</td>
                  <td className="num">{inv.status === "Overdue" ? <button className="btn sm">Chase <ArrowRight width={13} height={13} /></button> : inv.status === "Paid" ? <span className="tiny" style={{ color: "var(--ok)" }}>Settled</span> : <span className="tiny muted">Scheduled</span>}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="card pad" style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center", background: "var(--warn-soft)", border: "none" }}>
        <span className="avatar" style={{ background: "#fff", color: "var(--warn)", borderColor: "transparent" }}><Warn width={18} height={18} /></span>
        <div>
          <b style={{ fontSize: 13.5, color: "#8a5a12" }}>Belmore Lettings is the only account slipping</b>
          <div className="tiny" style={{ marginTop: 2, color: "#8a5a12" }}>£380, 33 days late, 3 reminders ignored. Everything else is on schedule. The Collector recommends a short call before the next job for them.</div>
        </div>
        <button className="btn sm primary" style={{ marginLeft: "auto" }}>Book the call</button>
      </div>
    </>
  );
}
