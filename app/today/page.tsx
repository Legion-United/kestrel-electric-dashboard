"use client";
import * as React from "react";
import { PageHead, Card, Stat, Pill, Dot, Sparkline, Meter } from "@/components/ui";
import { eur } from "@/components/ui";
import { today, schedule, kpis, activity, leads, invoices } from "@/lib/data";
import { Bolt, Cash, Doc, Clock, Route, Phone, Field, Chat, Warn, ArrowRight, Check } from "@/components/icons";
import { useToast, Drawer } from "@/components/interactive";
import type { Lead } from "@/lib/data";

const ICON: Record<string, React.ReactNode> = {
  phone: <Phone />, cash: <Cash />, doc: <Doc />, chat: <Chat />, field: <Field />,
};

export default function TodayPage() {
  const toast = useToast();
  const [lead, setLead] = React.useState<Lead | null>(null);

  return (
    <>
      <PageHead eyebrow={today.date} title="Good morning, Sam" sub={today.greeting}>
        <span className="pill line"><Route width={13} height={13} /> {today.drive}</span>
        <span className="pill line">{today.weather}</span>
        <button className="btn primary" onClick={() => toast("Day started — 4 jobs on the run", "g")}><Bolt /> Start the day</button>
      </PageHead>

      {/* KPI row */}
      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Revenue this month" value={eur(kpis.revenueMonth)} delta="+18% vs last" deltaDir="up" icon={<Cash />} spark={kpis.revenueSpark} variant="accent" />
        <Stat label="Outstanding" value={eur(kpis.outstanding)} delta="2 overdue" deltaDir="down" icon={<Warn />} />
        <Stat label="Open quotes" value={kpis.quotesOpen} unit={`· ${eur(kpis.quotesOpenValue)}`} delta="62% win rate" deltaDir="flat" icon={<Doc />} />
        <Stat label="Admin hours saved" value={kpis.adminSavedHrs} unit="hrs" delta="this month" deltaDir="up" icon={<Clock />} variant="volt" />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.6fr 1fr", alignItems: "start" }}>
        {/* schedule */}
        <Card title="Today's run" sub={`${today.jobsToday} jobs · optimised route`} icon={<Route width={17} height={17} />} right={<button className="btn sm ghost" onClick={() => toast("Opening full calendar…")}>Full calendar</button>}>
          <div className="timeline">
            {schedule.map((s, i) => (
              <div key={i} className={`tl-item ${s.tone}`}>
                <div className="spread">
                  <div className="row" style={{ gap: 10 }}>
                    <span className="mono tiny" style={{ color: "var(--faint)", minWidth: 38 }}>{s.time}</span>
                    <div>
                      <div className="tt">{s.title}</div>
                      <div className="td">{s.client} · {s.place}</div>
                    </div>
                  </div>
                  <div className="stack" style={{ alignItems: "flex-end", gap: 4 }}>
                    <Pill tone={s.kind === "Execution" ? "b" : s.kind === "Site visit" ? "v" : "line"}>{s.kind}</Pill>
                    <span className="tiny muted">{s.travel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* decisions + workforce pulse */}
        <div className="stack" style={{ gap: 16 }}>
          <Card title="Needs your call" sub="2 decisions" icon={<Warn width={17} height={17} />}>
            <div className="stack" style={{ gap: 12 }}>
              <div className="notice y">
                <Warn />
                <div>
                  <b>Belmore Lettings — 33 days overdue (£380)</b>
                  <div className="tiny" style={{ marginTop: 4 }}>The Collector sent 3 reminders. Escalate to a call, or write off?</div>
                  <div className="row" style={{ gap: 8, marginTop: 9 }}>
                    <button className="btn sm primary" onClick={() => toast("Call booked with Belmore Lettings", "g")}>Book a call</button>
                    <button className="btn sm ghost" onClick={() => toast("Snoozed for 7 days", "y")}>Snooze 7d</button>
                  </div>
                </div>
              </div>
              <div className="notice b">
                <Doc />
                <div>
                  <b>Nawaz rewire quote (£6,800) viewed twice</b>
                  <div className="tiny" style={{ marginTop: 4 }}>Warm. Estimator suggests a follow-up with a start-date offer.</div>
                  <div className="row" style={{ gap: 8, marginTop: 9 }}>
                    <button className="btn sm primary" onClick={() => toast("Follow-up approved & sent to Nawaz", "g")}>Approve follow-up</button>
                    <button className="btn sm ghost" onClick={() => toast("Opening draft to edit…")}>Edit</button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Cash this week" icon={<Cash width={17} height={17} />}>
            <div className="row" style={{ gap: 14 }}>
              <Sparkline data={kpis.revenueSpark} w={120} h={44} fill color="var(--cobalt)" />
              <div className="stack" style={{ gap: 2 }}>
                <b style={{ fontSize: 20 }}>{eur(2410)}</b>
                <span className="tiny muted">collected · 2 invoices</span>
                <span className="tiny" style={{ color: "var(--warn)" }}>{eur(1800)} chasing</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* bottom: fresh leads + activity */}
      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr", marginTop: 16, alignItems: "start" }}>
        <Card title="Fresh enquiries" sub="Captured by the Receptionist" icon={<Phone width={17} height={17} />} right={<a className="tiny" style={{ color: "var(--cobalt)" }} href="/inbox">Open inbox →</a>}>
          <div className="stack" style={{ gap: 0 }}>
            {leads.slice(0, 3).map((l) => (
              <div key={l.id} className="spread clickable" onClick={() => setLead(l)} style={{ padding: "11px 0", borderBottom: "1px dashed var(--line)" }}>
                <div className="row" style={{ gap: 10 }}>
                  <Dot tone={l.urgency === "hot" ? "r" : l.urgency === "warm" ? "y" : "b"} pulse={l.urgency === "hot"} />
                  <div>
                    <div style={{ fontWeight: 620, fontSize: 13 }}>{l.name} <span className="tiny muted">· {l.channel}</span></div>
                    <div className="tiny muted" style={{ maxWidth: 340 }}>{l.summary}</div>
                  </div>
                </div>
                <div className="stack" style={{ alignItems: "flex-end", gap: 3 }}>
                  {l.value ? <b className="tiny">{l.value}</b> : null}
                  <span className="tiny muted">{l.when}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="While you were on site" sub="Handled automatically" icon={<Bolt width={17} height={17} />}>
          <div className="stack" style={{ gap: 2 }}>
            {activity.map((a, i) => (
              <div key={i} className="row" style={{ gap: 11, padding: "9px 0", borderBottom: i < activity.length - 1 ? "1px dashed var(--line)" : "none" }}>
                <span className={`avatar sm`} style={{ background: "var(--surface-3)", color: "var(--ink-2)", borderColor: "transparent" }}>{ICON[a.icon]}</span>
                <span style={{ fontSize: 12.5 }}>{a.t}</span>
                <span className="tiny muted" style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>{a.when}</span>
              </div>
            ))}
            <div className="row" style={{ gap: 7, marginTop: 10, color: "var(--ok)", fontSize: 12.5 }}><Check width={15} height={15} /> Nothing needed you to stop working.</div>
          </div>
        </Card>
      </div>

      <Drawer
        open={!!lead}
        onClose={() => setLead(null)}
        title={lead?.name}
        sub={lead ? `${lead.channel} · ${lead.when}` : undefined}
        footer={lead ? (
          <>
            <button className="btn primary" onClick={() => { toast(`Site visit booked with ${lead.name}`, "g"); setLead(null); }}>Book</button>
            <button className="btn ghost" onClick={() => { toast("Quote draft started", "b"); setLead(null); }}>Draft quote</button>
          </>
        ) : null}
      >
        {lead ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="notice b">
              <Bolt />
              <div><b>Receptionist summary</b><div className="tiny" style={{ marginTop: 3 }}>{lead.summary}</div></div>
            </div>
            <div className="kv"><span className="k">Channel</span><span className="v">{lead.channel}</span></div>
            <div className="kv"><span className="k">Status</span><span className="v">{lead.qualified ? "Qualified & ready to book" : "Logged for follow-up"}</span></div>
            <div className="kv"><span className="k">Estimated value</span><span className="v">{lead.value || "Not yet valued"}</span></div>
            <div className="kv"><span className="k">Suggested action</span><span className="v">{lead.urgency === "hot" ? "Book a site visit today" : "Send a quote link"}</span></div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
