"use client";
import * as React from "react";
import { PageHead, Card, Stat, Pill } from "@/components/ui";
import { vaultStats, vaultRecent, vaultAsk } from "@/lib/data";
import { Vault, Search, File, Shield, Camera, Doc, Bolt, ArrowRight, Send } from "@/components/icons";
import { useToast, Modal, Drawer } from "@/components/interactive";

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

type Recent = (typeof vaultRecent)[number];

export default function VaultPage() {
  const toast = useToast();
  const [q, setQ] = React.useState("");
  const [uploadOpen, setUploadOpen] = React.useState(false);
  const [doc, setDoc] = React.useState<Recent | null>(null);

  const ql = q.trim().toLowerCase();
  const cats = CATS.filter((c) => !ql || c.n.toLowerCase().includes(ql));
  const recent = vaultRecent.filter((r) => !ql || r.n.toLowerCase().includes(ql) || r.cat.toLowerCase().includes(ql));

  return (
    <>
      <PageHead eyebrow="The Vault" title="Everything, findable" sub="Every drawing, certificate, manual and client history the business has ever produced. The knowledge stays with you, not in someone's head.">
        <span className="pill line">{vaultStats.docs.toLocaleString()} documents</span>
        <button className="btn primary" onClick={() => setUploadOpen(true)}><File /> Upload</button>
      </PageHead>

      <div className="card pad" style={{ marginBottom: 16, background: "linear-gradient(135deg,var(--ink),#1a2350)", color: "#fff", border: "none" }}>
        <div className="row" style={{ gap: 10, marginBottom: 14 }}>
          <span className="pill v" style={{ fontSize: 10.5 }}><Bolt width={12} height={12} /> Ask in plain English</span>
        </div>
        <div className="row" style={{ gap: 10 }}>
          <div className="searchbox" style={{ flex: 1, minWidth: 0, background: "#ffffff12", border: "1px solid #ffffff22", color: "#c5cbf0" }}>
            <Search width={16} height={16} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && q.trim()) toast("Searching the Vault…"); }}
              placeholder="What was the last fault I found at the Old Bakery Café?"
              style={{ border: "none", background: "transparent", outline: "none", width: "100%", color: "inherit", font: "inherit" }}
            />
          </div>
          <button className="btn volt" onClick={() => toast("Searching the Vault…")}><Send width={15} height={15} /> Search</button>
        </div>
        <div className="row wrap" style={{ gap: 8, marginTop: 14 }}>
          {vaultAsk.map((qq, i) => (
            <span key={i} className="pill" style={{ background: "#ffffff12", color: "#cfd4f0", cursor: "pointer" }} onClick={() => { setQ(qq); toast("Searching…"); }}>{qq}</span>
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
            {cats.map((c) => (
              <div key={c.n} className="clickable" onClick={() => toast(`Opening ${c.n}`)} style={{ padding: 15, border: "1px solid var(--line)", borderRadius: 12, background: "var(--surface-2)" }}>
                <div className="spread">
                  <span className="avatar sm" style={{ background: "var(--cobalt-soft)", color: "var(--cobalt-ink)", borderColor: "transparent" }}>{c.i}</span>
                  <ArrowRight width={15} height={15} color="var(--faint)" />
                </div>
                <div style={{ fontSize: 12.5, fontWeight: 640, marginTop: 11 }}>{c.n}</div>
                <div className="tiny muted">{c.c.toLocaleString()} items</div>
              </div>
            ))}
            {cats.length === 0 ? <div className="tiny muted" style={{ padding: "8px 2px" }}>No categories match “{q}”.</div> : null}
          </div>
        </Card>

        <Card title="Recently opened" icon={<File width={17} height={17} />}>
          <div className="stack" style={{ gap: 0 }}>
            {recent.map((r, i) => (
              <div key={i} className="row clickable" onClick={() => setDoc(r)} style={{ gap: 11, padding: "11px 0", borderBottom: i < recent.length - 1 ? "1px dashed var(--line)" : "none" }}>
                <span className="avatar sm" style={{ background: "var(--surface-3)", color: "var(--ink-2)", borderColor: "transparent" }}>{catIcon[r.cat]}</span>
                <div className="grow">
                  <div style={{ fontSize: 12.5, fontWeight: 600 }}>{r.n}</div>
                  <div className="tiny muted">{r.cat}</div>
                </div>
                <span className="tiny muted" style={{ whiteSpace: "nowrap" }}>{r.when}</span>
              </div>
            ))}
            {recent.length === 0 ? <div className="tiny muted" style={{ padding: "8px 2px" }}>Nothing matches “{q}”.</div> : null}
          </div>
        </Card>
      </div>

      {/* Upload modal */}
      <Modal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Upload to the Vault"
        sub="Files are indexed and made searchable instantly"
        wide
        footer={
          <>
            <button className="btn ghost" onClick={() => setUploadOpen(false)}>Cancel</button>
            <button className="btn primary" onClick={() => { toast("Uploaded & indexed to the Vault", "g"); setUploadOpen(false); }}>Upload</button>
          </>
        }
      >
        <div className="stack" style={{ gap: 14 }}>
          <label className="stack" style={{ gap: 6 }}>
            <span className="tiny muted">Document name</span>
            <input className="field-in" placeholder="e.g. Easton rewire — as-built drawings" />
          </label>
          <label className="stack" style={{ gap: 6 }}>
            <span className="tiny muted">Category</span>
            <select className="field-in" defaultValue="Regulations">
              <option>Regulations</option><option>Customer</option><option>Manuals</option><option>Templates</option><option>Drawings</option>
            </select>
          </label>
          <div className="stack" style={{ gap: 6 }}>
            <span className="tiny muted">File</span>
            <div style={{ padding: 22, border: "1.5px dashed var(--line-2)", borderRadius: 12, textAlign: "center", color: "var(--faint)", fontSize: 12.5 }}>Drop a file here, or click to browse</div>
          </div>
        </div>
      </Modal>

      {/* Document preview drawer */}
      <Drawer
        open={!!doc}
        onClose={() => setDoc(null)}
        title={doc?.n}
        sub={doc ? `${doc.cat} · ${doc.when}` : undefined}
        footer={doc ? (
          <>
            <button className="btn primary" onClick={() => { toast(`Opening ${doc.n} in full`); setDoc(null); }}>Open</button>
            <button className="btn ghost" onClick={() => { toast("Share link copied", "g"); setDoc(null); }}>Share</button>
          </>
        ) : null}
      >
        {doc ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">Category</span><span className="v">{doc.cat}</span></div>
            <div className="kv"><span className="k">Last opened</span><span className="v">{doc.when}</span></div>
            <div style={{ padding: 18, border: "1px solid var(--line)", borderRadius: 12, background: "var(--surface-2)", minHeight: 200 }}>
              <div className="tiny muted" style={{ marginBottom: 8 }}>Preview</div>
              <div style={{ fontSize: 12.5, lineHeight: 1.7, color: "var(--ink-2)" }}>
                This is a preview of <b>{doc.n}</b>. The full document lives in the Vault and is indexed for plain-English search. Open it to view every page, or share a secure link with a client or Building Control.
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
