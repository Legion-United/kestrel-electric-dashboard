"use client";
import * as React from "react";
import { PageHead, Card, Pill } from "@/components/ui";
import { intelPrompts } from "@/lib/data";
import { Brain, Doc, Vault, Chart, Mail, Send, Bolt, Shield, Check } from "@/components/icons";
import { useToast } from "@/components/interactive";

const PI: Record<string, React.ReactNode> = {
  doc: <Doc width={16} height={16} />, vault: <Vault width={16} height={16} />,
  chart: <Chart width={16} height={16} />, mail: <Mail width={16} height={16} />,
};

export default function IntelligencePage() {
  const toast = useToast();
  const [msg, setMsg] = React.useState("");
  const send = () => { if (!msg.trim()) { toast("Type something to ask first", "y"); return; } toast("Sent to your workspace", "b"); setMsg(""); };
  return (
    <>
      <PageHead eyebrow="Intelligence" title="Your private AI bench" sub="Not a public chatbot. A secure workspace that knows your jobs, your clients and the regs, and keeps it all to itself.">
        <span className="pill g"><Shield width={13} height={13} /> Private & GDPR-safe</span>
      </PageHead>

      <div className="grid" style={{ gridTemplateColumns: "1.5fr 1fr", alignItems: "start" }}>
        <Card title="Workspace" sub="Ask anything about the business" icon={<Brain width={17} height={17} />}>
          <div className="stack" style={{ gap: 12 }}>
            <div className="row" style={{ gap: 10, alignItems: "flex-start", justifyContent: "flex-end" }}>
              <div style={{ background: "var(--cobalt)", color: "#fff", padding: "10px 13px", borderRadius: "12px 12px 3px 12px", fontSize: 13, maxWidth: "78%" }}>
                Draft a follow-up email for the Nawaz rewire quote. Friendly, offer an August start.
              </div>
            </div>
            <div className="row" style={{ gap: 10, alignItems: "flex-start" }}>
              <span className="avatar sm" style={{ background: "linear-gradient(135deg,var(--cobalt),#6a8bff)", color: "#fff", borderColor: "transparent" }}><Bolt width={15} height={15} /></span>
              <div style={{ background: "var(--surface-2)", border: "1px solid var(--line)", padding: "12px 14px", borderRadius: "12px 12px 12px 3px", fontSize: 13, maxWidth: "82%" }}>
                <p style={{ marginBottom: 8 }}>Here's a draft you can send as-is:</p>
                <p style={{ color: "var(--muted)", lineHeight: 1.6 }}>Hi Aliyah and Paul, thanks again for having me round to look at the rewire. I've held a slot in the first week of August so we could have the house sorted before autumn. The quote of £6,800 covers the full rewire, a new 10-way board with SPD, and all certification. Happy to walk through anything, just say the word.</p>
                <div className="row" style={{ gap: 8, marginTop: 12 }}>
                  <button className="btn primary sm" onClick={() => toast("Email sent to A. & P. Nawaz", "g")}><Send width={13} height={13} /> Send</button>
                  <button className="btn ghost sm" onClick={() => toast("Opening draft to edit…")}>Edit</button>
                  <Pill tone="v" >Drawn from Q-341</Pill>
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={{ gap: 8, marginTop: 18 }}>
            <div className="searchbox" style={{ flex: 1, minWidth: 0 }}>
              <Brain width={15} height={15} />
              <input
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") send(); }}
                placeholder="Ask, draft, calculate or research…"
                style={{ border: "none", background: "transparent", outline: "none", width: "100%", color: "inherit", font: "inherit" }}
              />
            </div>
            <button className="btn primary" onClick={send}><Send width={15} height={15} /></button>
          </div>
        </Card>

        <div className="stack" style={{ gap: 16 }}>
          <Card title="Quick starts" icon={<Bolt width={17} height={17} />}>
            <div className="stack" style={{ gap: 9 }}>
              {intelPrompts.map((p, i) => (
                <button key={i} onClick={() => { setMsg(p.t); toast("Added to workspace", "b"); }} className="row" style={{ gap: 11, padding: "11px 12px", border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface-2)", textAlign: "left", width: "100%", cursor: "pointer" }}>
                  <span className="avatar sm" style={{ background: "var(--cobalt-soft)", color: "var(--cobalt-ink)", borderColor: "transparent" }}>{PI[p.icon]}</span>
                  <span style={{ fontSize: 12.5, fontWeight: 550 }}>{p.t}</span>
                </button>
              ))}
            </div>
          </Card>

          <Card title="What it can reach" sub="Grounded in your own data" icon={<Shield width={17} height={17} />}>
            <div className="stack" style={{ gap: 8 }}>
              {["Your jobs, quotes and invoices", "The Vault: drawings, certs, manuals", "BS 7671 and current regulations", "Client histories and notes"].map((t, i) => (
                <div key={i} className="row" style={{ gap: 9, fontSize: 12.5 }}><Check width={15} height={15} color="var(--ok)" /> {t}</div>
              ))}
            </div>
            <div className="notice g" style={{ marginTop: 12 }}><Shield /><div className="tiny">Nothing leaves your workspace. As better models arrive, the intelligence updates automatically.</div></div>
          </Card>
        </div>
      </div>
    </>
  );
}
