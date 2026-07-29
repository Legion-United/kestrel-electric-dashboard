"use client";
import * as React from "react";
import { PageHead, Card, Stat, Pill, Dot } from "@/components/ui";
import { leads } from "@/lib/data";
import { Phone, Chat, Inbox as InboxIcon, Check, ArrowRight, Bolt, Mic } from "@/components/icons";
import { useToast } from "@/components/interactive";

const chanIcon: Record<string, React.ReactNode> = {
  "Call": <Phone width={14} height={14} />, "Missed call": <Phone width={14} height={14} />,
  "WhatsApp": <Chat width={14} height={14} />, "Web": <InboxIcon width={14} height={14} />,
};

export default function InboxPage() {
  const toast = useToast();
  const [sel, setSel] = React.useState(leads[0].id);
  const lead = leads.find((l) => l.id === sel) || leads[0];
  return (
    <>
      <PageHead eyebrow="The Receptionist" title="Inbox" sub="Every call, WhatsApp and web enquiry, captured and qualified before it can reach a competitor.">
        <span className="pill g"><Check width={13} height={13} /> 0 missed today</span>
        <button className="btn primary" onClick={() => toast("Opening call log — 5 calls today")}><Phone /> Call log</button>
      </PageHead>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Enquiries today" value={5} delta="+2 vs avg" deltaDir="up" icon={<InboxIcon />} />
        <Stat label="Auto-qualified" value={4} unit="/ 5" icon={<Check />} variant="accent" />
        <Stat label="Booked in" value={2} delta="1 emergency" deltaDir="flat" icon={<Phone />} />
        <Stat label="Response time" value="14" unit="sec avg" delta="day or night" deltaDir="up" icon={<Bolt />} variant="volt" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1.1fr", alignItems: "start" }}>
        <Card title="Incoming" sub="Newest first" icon={<InboxIcon width={17} height={17} />} pad={false}>
          <div className="stack">
            {leads.map((l) => (
              <button key={l.id} onClick={() => setSel(l.id)} style={{ textAlign: "left", background: l.id === sel ? "var(--surface-2)" : "transparent", border: "none", borderBottom: "1px solid var(--line)", borderLeft: l.id === sel ? "3px solid var(--cobalt)" : "3px solid transparent", padding: "13px 16px", display: "flex", gap: 11, alignItems: "flex-start" }}>
                <Dot tone={l.urgency === "hot" ? "r" : l.urgency === "warm" ? "y" : "b"} pulse={l.urgency === "hot"} />
                <div className="grow">
                  <div className="spread">
                    <b style={{ fontSize: 13 }}>{l.name}</b>
                    <span className="tiny muted">{l.when}</span>
                  </div>
                  <div className="tiny muted" style={{ marginTop: 3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{l.summary}</div>
                  <div className="row" style={{ gap: 6, marginTop: 7 }}>
                    <Pill tone="line">{chanIcon[l.channel]} {l.channel}</Pill>
                    {l.qualified ? <Pill tone="g">Qualified</Pill> : <Pill tone="line">Logged</Pill>}
                    {l.value ? <span className="tiny" style={{ marginLeft: "auto", fontWeight: 700 }}>{l.value}</span> : null}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </Card>

        <div className="stack" style={{ gap: 16 }}>
          <Card title={lead.name} sub={`${lead.channel} · ${lead.when}`} icon={<span className="avatar sm" style={{ background: "var(--cobalt-soft)", color: "var(--cobalt-ink)", borderColor: "transparent" }}>{chanIcon[lead.channel]}</span>} right={lead.value ? <Pill tone="v">{lead.value}</Pill> : <Pill tone="line">No value yet</Pill>}>
            <div className="notice b" style={{ marginBottom: 14 }}>
              <Bolt />
              <div><b>Receptionist summary</b><div className="tiny" style={{ marginTop: 3 }}>{lead.summary}</div></div>
            </div>
            <div className="kv"><span className="k">Status</span><span className="v">{lead.qualified ? "Qualified & ready to book" : "Logged for follow-up"}</span></div>
            <div className="kv"><span className="k">Suggested next step</span><span className="v">{lead.urgency === "hot" ? "Book a site visit" : "Send a quote link"}</span></div>
            <div className="kv"><span className="k">Assigned specialist</span><span className="v">Estimator</span></div>
            <div className="row" style={{ gap: 9, marginTop: 16 }}>
              <button className="btn primary" onClick={() => toast(`Site visit booked with ${lead.name}`, "g")}>Book site visit <ArrowRight /></button>
              <button className="btn" onClick={() => toast("Quote draft started", "b")}>Draft quote</button>
              <button className="btn ghost" onClick={() => toast(`${lead.name} archived`, "y")}>Archive</button>
            </div>
          </Card>

          <Card title="Transcript" sub="Auto-recorded & summarised" icon={<Mic width={17} height={17} />}>
            <div className="stack" style={{ gap: 10 }}>
              {[
                { who: "Caller", t: "Hi, is that the electrician? I've got a garden office going up and need power out to it." },
                { who: "Receptionist", t: "Yes, Kestrel Electric. I can help with that. Roughly how far from the house, and do you need lighting and sockets or just a supply?" },
                { who: "Caller", t: "About 12 metres. Lighting, a couple of double sockets, and I work from there so it needs to be solid." },
                { who: "Receptionist", t: "Understood. I'll book Sam for a survey and prepare a quote for a dedicated circuit with RCD protection. Does Thursday morning suit?" },
              ].map((m, i) => (
                <div key={i} className="row" style={{ gap: 10, alignItems: "flex-start" }}>
                  <span className="tiny" style={{ fontWeight: 700, color: m.who === "Receptionist" ? "var(--cobalt)" : "var(--muted)", minWidth: 78 }}>{m.who}</span>
                  <span style={{ fontSize: 12.5 }}>{m.t}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
