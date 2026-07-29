"use client";
import { PageHead, Card, Pill } from "@/components/ui";
import { fieldJob } from "@/lib/data";
import { Field, Pin, Clock, File, Camera, Mic, Bolt, Vault, Check, Wrench, Send } from "@/components/icons";

const docIcon: Record<string, React.ReactNode> = {
  Photo: <Camera width={16} height={16} />, Manual: <File width={16} height={16} />,
  Cert: <Check width={16} height={16} />, Doc: <File width={16} height={16} />,
};

export default function FieldPage() {
  return (
    <>
      <PageHead eyebrow="The Field Companion" title="On site" sub="Everything about this job is already on your phone before you knock. Focus on the fault, not the filing cabinet.">
        <Pill tone="g"><span className="dot g pulse" /> Arrived {fieldJob.arrived}</Pill>
        <button className="btn primary"><Wrench /> Log work</button>
      </PageHead>

      <div className="card pad" style={{ marginBottom: 16, background: "linear-gradient(135deg,var(--ink),#1a2350)", color: "#fff", border: "none" }}>
        <div className="spread wrap" style={{ gap: 14 }}>
          <div>
            <div className="row" style={{ gap: 8 }}>
              <span className="mono tiny" style={{ color: "#9aa0c4" }}>{fieldJob.ref}</span>
              <span className="pill v" style={{ fontSize: 10.5 }}>Execution</span>
            </div>
            <h2 style={{ fontSize: 22, marginTop: 8 }}>{fieldJob.title}</h2>
            <div className="row" style={{ gap: 14, marginTop: 8, color: "#c5cbf0", fontSize: 13 }}>
              <span className="row" style={{ gap: 6 }}><Pin width={14} height={14} /> {fieldJob.address}</span>
            </div>
          </div>
          <div className="row" style={{ gap: 9 }}>
            <button className="btn volt sm"><Mic width={14} height={14} /> Voice note</button>
            <button className="btn sm" style={{ background: "#ffffff14", color: "#fff", border: "1px solid #ffffff22" }}><Camera width={14} height={14} /> Photo</button>
          </div>
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1fr 1fr", alignItems: "start" }}>
        <Card title="Client history" sub={fieldJob.client} icon={<Clock width={17} height={17} />}>
          <div className="timeline">
            {fieldJob.history.map((h, i) => (
              <div key={i} className={`tl-item ${i === 0 ? "" : "done"}`}>
                <div className="tt">{h.t}</div>
                <div className="time">{h.d}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Site pack" sub={`${fieldJob.docs.length} documents ready`} icon={<File width={17} height={17} />}>
          <div className="stack" style={{ gap: 8 }}>
            {fieldJob.docs.map((d, i) => (
              <div key={i} className="row" style={{ gap: 10, padding: "9px 10px", border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface-2)" }}>
                <span className="avatar sm" style={{ background: "var(--cobalt-soft)", color: "var(--cobalt-ink)", borderColor: "transparent" }}>{docIcon[d.t]}</span>
                <span style={{ fontSize: 12.5, fontWeight: 600 }}>{d.n}</span>
                <Pill tone="line">{d.t}</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Notes from today" sub="Voice → text, saved to the job" icon={<Mic width={17} height={17} />}>
          <div className="stack" style={{ gap: 10 }}>
            {fieldJob.notes.map((n, i) => (
              <div key={i} style={{ padding: 11, border: "1px solid var(--line)", borderRadius: 10, background: "var(--surface-2)" }}>
                <div style={{ fontSize: 12.5 }}>{n.t}</div>
                <div className="row" style={{ gap: 8, marginTop: 7 }}>
                  <Pill tone="b"><Mic width={11} height={11} /> {n.by}</Pill>
                  <span className="tiny muted" style={{ marginLeft: "auto" }}>{n.when}</span>
                </div>
              </div>
            ))}
            <button className="btn ghost sm"><Mic width={14} height={14} /> Add another</button>
          </div>
        </Card>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", marginTop: 16, alignItems: "start" }}>
        <Card title="Ask the Knowledge Expert" sub="On-site technical lookup" icon={<Vault width={17} height={17} />}>
          <div className="notice b" style={{ marginBottom: 12 }}>
            <Bolt />
            <div>
              <b className="tiny">"Max Zs for this board's 32A Type B MCB?"</b>
              <div className="tiny" style={{ marginTop: 4 }}>For a 32A Type B MCB, the maximum measured Zs at the reference temperature is 1.09 Ω (BS 7671, corrected 80% rule). Your last reading here was 0.42 Ω, well within limits.</div>
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <div className="searchbox" style={{ flex: 1, minWidth: 0 }}><Vault width={15} height={15} /><span>Ask about regs, this client, or a manual…</span></div>
            <button className="btn primary sm"><Send width={14} height={14} /></button>
          </div>
        </Card>

        <Card title="Wrap up" icon={<Check width={17} height={17} />}>
          <div className="stack" style={{ gap: 9 }}>
            {["Photos of finished board", "Circuit schedule completed", "EIC drafted from job data", "Notify Building Control"].map((t, i) => (
              <label key={i} className="row" style={{ gap: 10, cursor: "pointer" }}>
                <span className="dot" style={{ width: 16, height: 16, borderRadius: 5, border: i < 2 ? "none" : "1.5px solid var(--line-2)", background: i < 2 ? "var(--cobalt)" : "transparent", display: "grid", placeItems: "center" }}>{i < 2 ? <Check width={11} height={11} color="#fff" /> : null}</span>
                <span style={{ fontSize: 12.5, textDecoration: i < 2 ? "line-through" : "none", color: i < 2 ? "var(--muted)" : "var(--ink)" }}>{t}</span>
              </label>
            ))}
            <button className="btn volt sm" style={{ marginTop: 6 }}>Generate certificate</button>
          </div>
        </Card>
      </div>
    </>
  );
}
