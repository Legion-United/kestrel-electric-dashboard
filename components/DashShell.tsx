"use client";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { brand } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";
import {
  Bolt, Home, Pipeline, Inbox, Doc, Field, Cash, Vault, Workforce, Brain,
  Search, Bell, Menu, Layers,
} from "./icons";

const NAV = [
  { group: "Command", items: [
    { href: "/today", label: "Today", icon: Home, tag: "Live", live: true },
    { href: "/pipeline", label: "Pipeline", icon: Pipeline, tag: "11" },
  ]},
  { group: "Win the work", items: [
    { href: "/inbox", label: "Inbox", icon: Inbox, tag: "5", hot: true },
    { href: "/quotes", label: "Quotes", icon: Doc, tag: "9" },
  ]},
  { group: "On the tools", items: [
    { href: "/field", label: "Field Companion", icon: Field },
    { href: "/vault", label: "Vault", icon: Vault },
  ]},
  { group: "Get paid", items: [
    { href: "/money", label: "Money", icon: Cash, tag: "£7.4k" },
  ]},
  { group: "The engine", items: [
    { href: "/workforce", label: "Digital Workforce", icon: Workforce, tag: "7" },
    { href: "/intelligence", label: "Intelligence", icon: Brain },
  ]},
];

const CRUMBS: Record<string, string> = {
  "/today": "Today", "/pipeline": "Pipeline", "/inbox": "Inbox", "/quotes": "Quotes",
  "/field": "Field Companion", "/vault": "Vault", "/money": "Money",
  "/workforce": "Digital Workforce", "/intelligence": "Intelligence",
};

function useClock() {
  const [t, setT] = React.useState("");
  React.useEffect(() => {
    const f = () => setT(new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }));
    f(); const id = setInterval(f, 30000); return () => clearInterval(id);
  }, []);
  return t;
}

export default function DashShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = React.useState(false);
  const clock = useClock();

  if (path === "/") return <>{children}</>;

  return (
    <div className="shell">
      <div className={`scrim ${open ? "show" : ""}`} onClick={() => setOpen(false)} />
      <aside className={`rail ${open ? "open" : ""}`}>
        <div className="rail-brand">
          <div className="rail-mark"><Bolt width={19} height={19} /></div>
          <div className="rail-word">
            <b>{brand.name}</b>
            <span>{brand.tagline}</span>
          </div>
        </div>

        {NAV.map((g) => (
          <div className="nav-group" key={g.group}>
            <p>{g.group}</p>
            {g.items.map((it) => {
              const active = path.startsWith(it.href);
              const Icon = it.icon;
              return (
                <Link key={it.href} href={it.href} className={`nav-item ${active ? "active" : ""}`} onClick={() => setOpen(false)}>
                  <Icon />
                  <span>{it.label}</span>
                  {it.tag ? <span className={`tag ${(it as { live?: boolean }).live ? "live" : ""} ${(it as { hot?: boolean }).hot ? "hot" : ""}`}>{it.tag}</span> : null}
                </Link>
              );
            })}
          </div>
        ))}

        <div className="rail-foot">
          <div className="row" style={{ gap: 10 }}>
            <div className="avatar" style={{ background: "#ffffff16", color: "#fff", borderColor: "#ffffff22" }}>{brand.owner.initials}</div>
            <div className="stack" style={{ gap: 1 }}>
              <b style={{ fontSize: 12.5 }}>{brand.owner.name}</b>
              <span style={{ fontSize: 11, color: "var(--side-muted)" }}>{brand.owner.role}</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <button className="iconbtn railtoggle" onClick={() => setOpen(true)} aria-label="Menu"><Menu /></button>
          <div className="crumb">
            <span>Kestrel Electric</span>
            <span className="sep">/</span>
            <b>{CRUMBS[path] || (path.startsWith("/pipeline") ? "Pipeline" : "")}</b>
          </div>
          <div className="searchbox">
            <Search />
            <span>Search jobs, clients, docs…</span>
            <kbd>⌘K</kbd>
          </div>
          <div className="top-right">
            <span className="pill line tiny" style={{ gap: 6 }}><span className="dot g pulse" /> LEGION OS online</span>
            <span className="tiny muted mono" style={{ minWidth: 40 }}>{clock}</span>
            <button className="iconbtn dot-badge" aria-label="Notifications"><Bell /></button>
            <ThemeToggle />
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
