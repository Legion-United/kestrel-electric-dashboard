import Link from "next/link";
import { Bolt, ArrowRight, Phone, Doc, Cash, Field, Check } from "@/components/icons";

const PILLARS = [
  { t: "Command", d: "One workspace for calls, quotes, jobs, invoices and planning. Stop opening five apps a day." },
  { t: "Intelligence", d: "A private AI bench that reads the regs, drafts the emails and answers the technical question on site." },
  { t: "Vault", d: "Every drawing, cert, manual and client history, searchable in seconds. The knowledge stays with you." },
  { t: "Connect", d: "Keeps your existing tools. LEGION removes the friction between them, it does not replace them." },
];

const SPECIALISTS = [
  { i: Phone, t: "The Receptionist", d: "Answers every call, WhatsApp and web enquiry so no job reaches a competitor first." },
  { i: Doc, t: "The Estimator", d: "Turns a site visit into a sent quote, then chases it until you get an answer." },
  { i: Field, t: "The Field Companion", d: "History, drawings and manuals ready before you knock on the door." },
  { i: Cash, t: "The Collector", d: "Watches every invoice and sends the reminders so you get paid on time." },
];

export default function Landing() {
  return (
    <div className="landing">
      {/* top bar */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "20px 26px", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, display: "grid", placeItems: "center", background: "linear-gradient(135deg,var(--cobalt),#6a8bff)", color: "#fff" }}><Bolt width={18} height={18} /></div>
          <div>
            <b style={{ letterSpacing: "0.14em", fontSize: 15 }}>KESTREL</b>
            <span style={{ color: "var(--muted)", fontSize: 12, marginLeft: 8 }}>Electric</span>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <Link href="/today" className="btn primary">Enter the OS <ArrowRight /></Link>
          </div>
        </div>
      </div>

      {/* hero */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div className="hero-glow" />
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "64px 26px 40px", position: "relative", zIndex: 2 }}>
          <span className="pill v" style={{ marginBottom: 18 }}><Bolt width={13} height={13} /> Powered by LEGION OS</span>
          <h1 style={{ fontSize: 56, lineHeight: 1.02, letterSpacing: "-0.035em", maxWidth: 820, marginTop: 14 }}>
            You are the whole company.<br />This is the office you never had.
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted)", maxWidth: 620, marginTop: 20, lineHeight: 1.6 }}>
            Kestrel Electric is a one-person firm. The calls still get answered, the quotes still get chased,
            the invoices still get paid, only now none of it needs you at a desk. A digital workforce runs the
            office while you stay on the tools.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 30, flexWrap: "wrap" }}>
            <Link href="/today" className="btn primary" style={{ padding: "12px 20px", fontSize: 14 }}>Open the dashboard <ArrowRight /></Link>
            <Link href="/pipeline" className="btn" style={{ padding: "12px 20px", fontSize: 14 }}>See a project journey</Link>
          </div>
          <div style={{ display: "flex", gap: 26, marginTop: 34, flexWrap: "wrap", color: "var(--muted)", fontSize: 13 }}>
            <span className="row" style={{ gap: 7 }}><Check width={15} height={15} /> 0 missed enquiries this month</span>
            <span className="row" style={{ gap: 7 }}><Check width={15} height={15} /> 34 admin hours handed back</span>
            <span className="row" style={{ gap: 7 }}><Check width={15} height={15} /> 62% quote win rate</span>
          </div>
        </div>
      </section>

      {/* pillars */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "20px 26px 10px" }}>
        <div className="grid g-4">
          {PILLARS.map((p) => (
            <div className="card pad" key={p.t}>
              <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--cobalt)", fontWeight: 700 }}>{p.t}</div>
              <p style={{ marginTop: 9, fontSize: 13, color: "var(--muted)", lineHeight: 1.55 }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* specialists */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "36px 26px 20px" }}>
        <h2 style={{ fontSize: 24 }}>Your digital workforce</h2>
        <p style={{ color: "var(--muted)", marginTop: 8, maxWidth: 560, fontSize: 14 }}>Specialists built for electrical work. Not to replace you, to remove the work that never needed an electrician.</p>
        <div className="grid g-4" style={{ marginTop: 20 }}>
          {SPECIALISTS.map((s) => {
            const Icon = s.i;
            return (
              <div className="card pad" key={s.t}>
                <div style={{ width: 42, height: 42, borderRadius: 11, display: "grid", placeItems: "center", background: "var(--cobalt-soft)", color: "var(--cobalt-ink)" }}><Icon width={21} height={21} /></div>
                <div style={{ fontWeight: 680, marginTop: 13, fontSize: 14.5 }}>{s.t}</div>
                <p style={{ marginTop: 6, fontSize: 12.5, color: "var(--muted)", lineHeight: 1.55 }}>{s.d}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* cta */}
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "30px 26px 70px" }}>
        <div className="card" style={{ padding: 40, background: "linear-gradient(135deg,var(--ink),#1a2350)", color: "#fff", border: "none", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: -60, top: -60, width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle,#d6ff3d33,transparent 60%)" }} />
          <h2 style={{ fontSize: 28, maxWidth: 520, position: "relative" }}>Arrive tomorrow to a business that already started without you.</h2>
          <p style={{ color: "#c5cbf0", maxWidth: 520, marginTop: 12, position: "relative" }}>Appointments confirmed. Invoices chased. The day's priorities already waiting. The business simply starts.</p>
          <Link href="/today" className="btn volt" style={{ marginTop: 22, position: "relative" }}>Enter the operating system <ArrowRight /></Link>
        </div>
        <p style={{ textAlign: "center", color: "var(--faint)", fontSize: 12, marginTop: 24 }}>A LEGION UNITED demonstration environment · Sample data · www.legion-united.com</p>
      </section>
    </div>
  );
}
