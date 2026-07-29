"use client";
import { PageHead, Card, Stat, Pill, Meter } from "@/components/ui";
import { eur } from "@/components/ui";
import { quotes, estimatorLine } from "@/lib/data";
import { Doc, Plus, Bolt, Send, ArrowRight, Check } from "@/components/icons";

const statusTone: Record<string, "line" | "b" | "g" | "y" | "r" | "v"> = {
  Draft: "line", Sent: "b", Viewed: "v", Chasing: "y", Accepted: "g", Declined: "r",
};

export default function QuotesPage() {
  const open = quotes.filter((q) => !["Accepted", "Declined"].includes(q.status));
  const openVal = open.reduce((a, q) => a + q.value, 0);
  const lineTotal = estimatorLine.reduce((a, l) => a + l.value, 0);
  return (
    <>
      <PageHead eyebrow="The Estimator" title="Quotes" sub="From a site visit to a sent quote in minutes, then chased until you get an answer.">
        <span className="pill line">{open.length} open · {eur(openVal)}</span>
        <button className="btn primary"><Plus /> New quote</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Win rate" value="62" unit="%" delta="+7pts this quarter" deltaDir="up" icon={<Check />} variant="accent" />
        <Stat label="Avg. time to send" value="1.4" unit="days" delta="was 5.2" deltaDir="up" icon={<Bolt />} />
        <Stat label="Awaiting reply" value={3} delta={`${eur(11950)}`} deltaDir="flat" icon={<Send />} />
        <Stat label="Auto follow-ups sent" value={7} unit="this month" delta="0 forgotten" deltaDir="up" icon={<Doc />} variant="volt" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start" }}>
        <Card title="All quotes" icon={<Doc width={17} height={17} />} pad={false} right={<button className="btn sm ghost">Export</button>}>
          <div className="scrollx">
            <table className="table">
              <thead><tr><th>Ref</th><th>Client / job</th><th>Status</th><th className="num">Value</th><th>Sent</th><th className="num">Chased</th></tr></thead>
              <tbody>
                {quotes.map((q) => (
                  <tr key={q.id}>
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
              <button className="btn primary">Send follow-up <ArrowRight /></button>
              <button className="btn ghost">Edit</button>
            </div>
          </Card>

          <Card title="Estimator suggestion" icon={<Bolt width={17} height={17} />}>
            <div className="notice b">
              <Bolt />
              <div className="tiny">This quote has been viewed twice but not answered in 2 days. A warm follow-up that offers a firm start date in August lifts acceptance by roughly 20% on jobs this size.</div>
            </div>
            <button className="btn volt sm" style={{ marginTop: 12 }}><Send width={14} height={14} /> Approve & send</button>
          </Card>
        </div>
      </div>
    </>
  );
}
