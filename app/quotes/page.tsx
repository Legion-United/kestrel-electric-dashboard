"use client";
import * as React from "react";
import { PageHead, Card, Stat, Pill, Meter } from "@/components/ui";
import { eur } from "@/components/ui";
import { quotes, estimatorLine } from "@/lib/data";
import type { Quote } from "@/lib/data";
import { Doc, Plus, Bolt, Send, ArrowRight, Check } from "@/components/icons";
import { useToast, Modal, Drawer, Segmented } from "@/components/interactive";

const statusTone: Record<string, "line" | "b" | "g" | "y" | "r" | "v"> = {
  Draft: "line", Sent: "b", Viewed: "v", Chasing: "y", Accepted: "g", Declined: "r",
};

export default function QuotesPage() {
  const toast = useToast();
  const [newOpen, setNewOpen] = React.useState(false);
  const [quote, setQuote] = React.useState<Quote | null>(null);
  const [filter, setFilter] = React.useState("All");

  const open = quotes.filter((q) => !["Accepted", "Declined"].includes(q.status));
  const openVal = open.reduce((a, q) => a + q.value, 0);
  const lineTotal = estimatorLine.reduce((a, l) => a + l.value, 0);

  const shown = quotes.filter((q) =>
    filter === "All" ? true : filter === "Accepted" ? q.status === "Accepted" : !["Accepted", "Declined"].includes(q.status)
  );

  return (
    <>
      <PageHead eyebrow="The Estimator" title="Quotes" sub="From a site visit to a sent quote in minutes, then chased until you get an answer.">
        <span className="pill line">{open.length} open · {eur(openVal)}</span>
        <button className="btn primary" onClick={() => setNewOpen(true)}><Plus /> New quote</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Win rate" value="62" unit="%" delta="+7pts this quarter" deltaDir="up" icon={<Check />} variant="accent" />
        <Stat label="Avg. time to send" value="1.4" unit="days" delta="was 5.2" deltaDir="up" icon={<Bolt />} />
        <Stat label="Awaiting reply" value={3} delta={`${eur(11950)}`} deltaDir="flat" icon={<Send />} />
        <Stat label="Auto follow-ups sent" value={7} unit="this month" delta="0 forgotten" deltaDir="up" icon={<Doc />} variant="volt" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start" }}>
        <Card title="All quotes" icon={<Doc width={17} height={17} />} pad={false} right={<Segmented options={["All", "Open", "Accepted"]} value={filter} onChange={setFilter} />}>
          <div className="scrollx">
            <table className="table">
              <thead><tr><th>Ref</th><th>Client / job</th><th>Status</th><th className="num">Value</th><th>Sent</th><th className="num">Chased</th></tr></thead>
              <tbody>
                {shown.map((q) => (
                  <tr key={q.id} className="clickable" onClick={() => setQuote(q)}>
                    <td className="mono tiny muted">{q.id}</td>
                    <td><div style={{ fontWeight: 620 }}>{q.client}</div><div className="tiny muted">{q.title}</div></td>
                    <td><Pill tone={statusTone[q.status]}>{q.status}</Pill></td>
                    <td className="num" style={{ fontWeight: 700 }}>{eur(q.value)}</td>
                    <td className="tiny muted">{q.sent}</td>
                    <td className="num tiny muted">{q.followups}×</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="stack" style={{ gap: 16 }}>
          <Card title="Rewire — Victorian terrace" sub="Q-341 · A. & P. Nawaz" icon={<Doc width={17} height={17} />} right={<Pill tone="v">Viewed 2×</Pill>}>
            <div className="stack" style={{ gap: 0 }}>
              {estimatorLine.map((l, i) => (
                <div key={i} className="spread" style={{ padding: "9px 0", borderBottom: "1px dashed var(--line)" }}>
                  <div><div style={{ fontSize: 12.5, fontWeight: 600 }}>{l.label}</div><div className="tiny muted">{l.detail}</div></div>
                  <b className="tnum" style={{ fontSize: 12.5 }}>{eur(l.value)}</b>
                </div>
              ))}
              <div className="spread" style={{ padding: "12px 0 2px" }}>
                <span className="muted tiny">Subtotal · materials + labour</span>
                <b className="tnum">{eur(lineTotal)}</b>
              </div>
              <div className="spread"><span className="muted tiny">Margin (28%) + VAT est.</span><b className="tnum">{eur(6800 - lineTotal)}</b></div>
              <div className="divider" />
              <div className="spread"><b>Quoted</b><b style={{ fontSize: 18 }} className="tnum">{eur(6800)}</b></div>
            </div>
            <div className="row" style={{ gap: 8, marginTop: 14 }}>
              <button className="btn primary" onClick={() => toast("Follow-up sent to A. & P. Nawaz", "g")}>Send follow-up <ArrowRight /></button>
              <button className="btn ghost" onClick={() => toast("Opening Q-341 to edit…")}>Edit</button>
            </div>
          </Card>

          <Card title="Estimator suggestion" icon={<Bolt width={17} height={17} />}>
            <div className="notice b">
              <Bolt />
              <div className="tiny">This quote has been viewed twice but not answered in 2 days. A warm follow-up that offers a firm start date in August lifts acceptance by roughly 20% on jobs this size.</div>
            </div>
            <button className="btn volt sm" style={{ marginTop: 12 }} onClick={() => toast("Approved & sent to A. & P. Nawaz", "g")}><Send width={14} height={14} /> Approve & send</button>
          </Card>
        </div>
      </div>

      {/* New quote modal */}
      <Modal
        open={newOpen}
        onClose={() => setNewOpen(false)}
        title="New quote"
        sub="Draft a quote for a client"
        wide
        footer={
          <>
            <button className="btn ghost" onClick={() => setNewOpen(false)}>Cancel</button>
            <button className="btn primary" onClick={() => { toast("Created draft quote", "g"); setNewOpen(false); }}>Create quote</button>
          </>
        }
      >
        <div className="stack" style={{ gap: 14 }}>
          <label className="stack" style={{ gap: 6 }}>
            <span className="tiny muted">Client</span>
            <input className="field-in" placeholder="e.g. Riverside Dental" />
          </label>
          <label className="stack" style={{ gap: 6 }}>
            <span className="tiny muted">Job title</span>
            <input className="field-in" placeholder="e.g. Surgery lighting refit" />
          </label>
          <div className="row" style={{ gap: 12 }}>
            <label className="stack grow" style={{ gap: 6 }}>
              <span className="tiny muted">Value (£)</span>
              <input className="field-in" type="number" placeholder="5200" />
            </label>
            <label className="stack grow" style={{ gap: 6 }}>
              <span className="tiny muted">Status</span>
              <select className="field-in" defaultValue="Draft">
                <option>Draft</option><option>Sent</option><option>Viewed</option><option>Chasing</option>
              </select>
            </label>
          </div>
          <label className="stack" style={{ gap: 6 }}>
            <span className="tiny muted">Notes</span>
            <textarea className="field-in" placeholder="Scope, materials, assumptions…" />
          </label>
        </div>
      </Modal>

      {/* Quote detail drawer */}
      <Drawer
        open={!!quote}
        onClose={() => setQuote(null)}
        title={quote?.title}
        sub={quote ? `${quote.id} · ${quote.client}` : undefined}
        footer={quote ? (
          <>
            <button className="btn primary" onClick={() => { toast(`Follow-up sent for ${quote.id}`, "g"); setQuote(null); }}>Send follow-up</button>
            <button className="btn ghost" onClick={() => { toast(`Opening ${quote.id} to edit…`); setQuote(null); }}>Edit</button>
          </>
        ) : null}
      >
        {quote ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">Status</span><span className="v"><Pill tone={statusTone[quote.status]}>{quote.status}</Pill></span></div>
            <div className="kv"><span className="k">Client</span><span className="v">{quote.client}</span></div>
            <div className="kv"><span className="k">Value</span><span className="v">{eur(quote.value)}</span></div>
            <div className="kv"><span className="k">Sent</span><span className="v">{quote.sent}</span></div>
            <div className="kv"><span className="k">Follow-ups</span><span className="v">{quote.followups}×</span></div>
            <div>
              <div className="tiny muted" style={{ margin: "8px 0 8px" }}>Line items (indicative)</div>
              {estimatorLine.map((l, i) => (
                <div key={i} className="spread" style={{ padding: "8px 0", borderBottom: "1px dashed var(--line)" }}>
                  <div><div style={{ fontSize: 12.5, fontWeight: 600 }}>{l.label}</div><div className="tiny muted">{l.detail}</div></div>
                  <b className="tnum" style={{ fontSize: 12.5 }}>{eur(l.value)}</b>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
