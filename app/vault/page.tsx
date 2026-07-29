"use client";
import { PageHead, Card, Stat, Pill } from "@/components/ui";
import { vaultStats, vaultRecent, vaultAsk } from "@/lib/data";
import { Vault, Search, File, Shield, Camera, Doc, Bolt, ArrowRight, Send } from "@/components/icons";

const catIcon: Record<string, React.ReactNode> = {
  Regulations: <Shield width={16} height={16} />, Customer: <Doc width={16} height={16} />,
  Manuals: <File width={16} height={16} />, Templates: <Doc width={16} height={16} />, Drawings: <Camera width={16} height={16} />,
};

const CATS = [
  { n: "Regulations & codes", c: 92, i: <Shield width={18} height={18} /> },
  { n: "Client histories", c: vaultStats.clients, i: <Doc width={18} height={18} /> },
  { n: "Drawings & as-builts", c: vaultStats.drawings, i: <Camera width={18} height={18} /> },
  { n: "Certificates", c: vaultStats.certs, i: <Shield width={18} height={18} /> },
  { n: "Manuals & datasheets", c: 431, i: <File width={18} height={18} /> },
  { n: "Templates", c: 24, i: <Doc width={18} height={18} /> },
];

export default function VaultPage() {
  return (
    <>
      <PageHead eyebrow="The Vault" title="Everything, findable" sub="Every drawing, certificate, manual and client history the business has ever produced. The knowledge stays with you, not in someone's head.">
        <span className="pill line">{vaultStats.docs.toLocaleString()} documents</span>
        <button className="btn primary"><File /> Upload</button>
      </PageHead>

      <div className="card pad" style={{ marginBottom: 16, background: "linear-gradient(135deg,var(--ink),#1a2350)", color: "#fff", border: "none" }}>
        <div className="row" style={{ gap: 10, marginBottom: 14 }}>
          <span className="pill v" style={{ fontSize: 10.5 }}><Bolt width={12} height={12} /> Ask in plain English</span>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <div className="searchbox" style={{ flex: 1, minWidth: 0, background: "#ffffff12", border: "1px solid #ffffff22", color: "#c5cbf0" }}>
            <Search width={16} height={16} />
            <span>What was the last fault I found at the Old Bakery Café?</span>
          </div>
          <button className="btn volt"><Send width={15} height={15} /> Search</button>
        </div>
        <div className="row wrap" style={{ gap: 8, marginTop: 14 }}>
          {vaultAsk.map((q, i) => (
            <span key={i} className="pill" style={{ background: "#ffffff12", color: "#cfd4f0", cursor: "pointer" }}>{q}</span>
          ))}
        </div>
      </div>

      <div className="grid g-4" style={{ marginBottom: 16 }}>
        <Stat label="Documents" value={vaultStats.docs.toLocaleString()} icon={<File />} variant="accent" />
        <Stat label="Client histories" value={vaultStats.clients} icon={<Doc />} />
        <Stat label="Drawings" value={vaultStats.drawings} icon={<Camera />} />
        <Stat label="Certificates" value={vaultStats.certs} icon={<Shield />} />
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1.4fr 1fr", alignItems: "start" }}>
        <Card title="Browse the vault" icon={<Vault width={17} height={17} />}>
          <div className="grid g-3">
            {CATS.map((c) => (
              <div key={c.n} style={{ padding: 15, border: "1px solid var(--line)", borderRadius: 12, background: "var(--surface-2)" }}>
                <div className="spread">
                  <span className="avatar sm" style={{ background: "var(--cobalt-soft)", color: "var(--cobalt-ink)", borderColor: "transparent" }}>{c.i}</span>
                  <ArrowRight width={15} height={15} color="var(--faint)" />
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 640, marginTop: 11 }}>{c.n}</div>
                <div className="tiny muted">{c.c.toLocaleString()} items</div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Recently opened" icon={<File width={17} height={17} />}>
          <div className="stack" style={{ gap: 0 }}>
            {vaultRecent.map((r, i) => (
              <div key={i} className="row" style={{ gap: 11, padding: "11px 0", borderBottom: i < vaultRecent.length - 1 ? "1px dashed var(--line)" : "none" }}>
                <span className="avatar sm" style={{ background: "var(--surface-3)", color: "var(--ink-2)", borderColor: "transparent" }}>{catIcon[r.cat]}</span>
                <div className="grow">
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{r.n}</div>
                  <div className="tiny muted">{r.cat}</div>
                </div>
                <span className="tiny muted" style={{ whiteSpace: "nowrap" }}>{r.when}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
