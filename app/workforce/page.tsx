"use client";
import * as React from "react";
import { PageHead, Card, Pill } from "@/components/ui";
import { workforce as workforceData } from "@/lib/data";
import type { Agent } from "@/lib/data";
import { Phone, Doc, Field, Cash, Vault, Chat, Mic, Chart, Bolt, Check, Workforce as WF } from "@/components/icons";
import { useToast, Modal, Drawer } from "@/components/interactive";

const AI: Record<string, React.ReactNode> = {
  phone: <Phone width={20} height={20} />, doc: <Doc width={20} height={20} />, field: <Field width={20} height={20} />,
  cash: <Cash width={20} height={20} />, vault: <Vault width={20} height={20} />, chat: <Chat width={20} height={20} />,
  mic: <Mic width={20} height={20} />, chart: <Chart width={20} height={20} />,
};

const RECENT: Record<string, string[]> = {
  receptionist: ["Booked K. Doyle emergency slot 08:00", "Qualified M. Sørensen garden office enquiry", "Logged G. Hollis solar referral"],
  estimator: ["Drafted Q-340 surgery lighting refit", "Sent 2nd follow-up on Q-338", "Flagged Q-341 as warm — viewed twice"],
  field: ["Prepped site pack for J-190 Clifton", "Pulled Hager datasheet on request", "Transcribed 2 on-site voice notes"],
  collector: ["Sent 3rd reminder to Belmore Lettings", "Collected £2.4k across 2 invoices", "Escalated INV-0912 for a call"],
  knowledge: ["Answered max Zs lookup (32A Type B)", "Retrieved RCD spec from Clifton jobs", "9 technical lookups today"],
  journey: ["Sent review request to D. Emerson", "Confirmed Thursday survey with caller", "6 client updates dispatched"],
  recorder: ["Standby — no meetings recorded", "Ready to transcribe on demand"],
  analyst: ["Compiled 06:30 morning briefing", "Flagged 2 decisions for your call", "Summarised month vs last month"],
};

export default function WorkforcePage() {
  const toast = useToast();
  const [agents, setAgents] = React.useState<Agent[]>(workforceData);
  const [addOpen, setAddOpen] = React.useState(false);
  const [agent, setAgent] = React.useState<Agent | null>(null);

  const on = agents.filter((a) => a.on).length;

  const toggle = (key: string) => {
    setAgents((prev) => prev.map((a) => {
      if (a.key !== key) return a;
      const next = !a.on;
      toast(`${a.name} turned ${next ? "on" : "off"}`, next ? "g" : "y");
      return { ...a, on: next };
    }));
  };

  // keep the open drawer's agent in sync with toggled state
  const current = agent ? agents.find((a) => a.key === agent.key) || agent : null;

  return (
    <>
      <PageHead eyebrow="The engine" title="Digital Workforce" sub="Your staff, without the payroll. Each specialist removes a job that never needed an electrician, so the whole company can be one person.">
        <span className="pill g"><span className="dot g pulse" /> {on} of {agents.length} active</span>
        <button className="btn primary" onClick={() => setAddOpen(true)}><Bolt /> Add specialist</button>
      </PageHead>

      <div className="card pad" style={{ marginBottom: 16, display: "flex", gap: 18, flexWrap: "wrap", alignItems: "center" }}>
        {[
          { k: "Hours handed back", v: "34", u: "this month" },
          { k: "Enquiries never missed", v: "100%", u: "24/7" },
          { k: "Invoices chased", v: "£11k", u: "collected" },
          { k: "Messages sent for you", v: "146", u: "this month" },
        ].map((s) => (
          <div key={s.k} style={{ flex: 1, minWidth: 150 }}>
            <div className="tiny muted">{s.k}</div>
            <div style={{ fontSize: 24, fontWeight: 720, letterSpacing: "-0.03em" }} className="tnum">{s.v} <span style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600 }}>{s.u}</span></div>
          </div>
        ))}
      </div>

      <div className="grid g-2">
        {agents.map((a) => (
          <div key={a.key} className={`agent clickable ${a.on ? "on" : ""}`} onClick={() => setAgent(a)} style={{ opacity: a.on ? 1 : 0.6 }}>
            <span className="ic">{AI[a.icon]}</span>
            <div className="grow">
              <div className="spread">
                <div className="nm">{a.name}</div>
                <button
                  onClick={(e) => { e.stopPropagation(); toggle(a.key); }}
                  aria-label={`Turn ${a.name} ${a.on ? "off" : "on"}`}
                  style={{
                    width: 38, height: 22, borderRadius: 999, border: "none", cursor: "pointer", padding: 2, flex: "none",
                    background: a.on ? "var(--cobalt)" : "var(--surface-3)", transition: "background .15s",
                    display: "flex", justifyContent: a.on ? "flex-end" : "flex-start", alignItems: "center",
                  }}
                >
                  <span style={{ width: 18, height: 18, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 2px rgba(0,0,0,.25)" }} />
                </button>
              </div>
              <div className="rl">{a.role}</div>
              <div className="row" style={{ gap: 8, marginTop: 9 }}>
                <span className="tiny muted">{a.today}</span>
                <span className="pill v" style={{ marginLeft: "auto", fontSize: 10.5 }}>{a.metric}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card pad" style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <span className="avatar" style={{ background: "var(--lime-soft)", color: "var(--lime-ink)", borderColor: "transparent" }}><WF width={18} height={18} /></span>
        <div>
          <b style={{ fontSize: 13.5 }}>Grow the workforce as the business grows</b>
          <div className="tiny muted" style={{ marginTop: 2 }}>These specialists are a starting point, not a limit. Turn the Recorder on when you start running more meetings, or add a Procurement Assistant once you carry stock.</div>
        </div>
        <button className="btn sm" style={{ marginLeft: "auto" }} onClick={() => toast("Showing all 10 specialists")}>See all 10</button>
      </div>

      {/* Add specialist modal */}
      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add a specialist"
        sub="Bring another role into your digital workforce"
        wide
        footer={
          <>
            <button className="btn ghost" onClick={() => setAddOpen(false)}>Cancel</button>
            <button className="btn primary" onClick={() => { toast("Specialist added to your workforce", "g"); setAddOpen(false); }}>Add specialist</button>
          </>
        }
      >
        <div className="stack" style={{ gap: 14 }}>
          <label className="stack" style={{ gap: 6 }}>
            <span className="tiny muted">Specialist</span>
            <select className="field-in" defaultValue="The Procurement Assistant">
              <option>The Procurement Assistant</option>
              <option>The Scheduler</option>
              <option>The Recorder</option>
              <option>The Marketer</option>
            </select>
          </label>
          <label className="stack" style={{ gap: 6 }}>
            <span className="tiny muted">What should it handle?</span>
            <textarea className="field-in" placeholder="e.g. Track stock levels and reorder materials before jobs" />
          </label>
        </div>
      </Modal>

      {/* Agent detail drawer */}
      <Drawer
        open={!!agent}
        onClose={() => setAgent(null)}
        title={current?.name}
        sub={current?.role}
        footer={current ? (
          <>
            <button className="btn primary" onClick={() => { toast(`Opening ${current.name}'s activity log`); setAgent(null); }}>View log</button>
            <button className="btn ghost" onClick={() => toggle(current.key)}>{current.on ? "Turn off" : "Turn on"}</button>
          </>
        ) : null}
      >
        {current ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">Status</span><span className="v">{current.on ? <Pill tone="g"><span className="dot g" /> Active</Pill> : <Pill tone="line">Standby</Pill>}</span></div>
            <div className="kv"><span className="k">Role</span><span className="v" style={{ textAlign: "right", maxWidth: 240 }}>{current.role}</span></div>
            <div className="kv"><span className="k">Today</span><span className="v" style={{ textAlign: "right", maxWidth: 240 }}>{current.today}</span></div>
            <div className="kv"><span className="k">Key metric</span><span className="v">{current.metric}</span></div>
            <div>
              <div className="tiny muted" style={{ margin: "8px 0 10px" }}>Recent actions</div>
              <div className="timeline">
                {(RECENT[current.key] || ["No recent activity"]).map((t, i) => (
                  <div key={i} className={`tl-item ${i === 0 ? "now" : "done"}`}><div className="tt" style={{ fontSize: 12.5 }}>{t}</div></div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
