"use client";
import { PageHead, Pill } from "@/components/ui";
import { eur } from "@/components/ui";
import { stages } from "@/lib/data";
import { Plus, Bolt } from "@/components/icons";

const flagTone: Record<string, "r" | "y" | "b"> = { hot: "r", wait: "y", risk: "r" };
const flagText: Record<string, string> = { hot: "Hot", wait: "Waiting", risk: "At risk" };

export default function PipelinePage() {
  const total = stages.reduce((a, s) => a + s.jobs.reduce((b, j) => b + j.value, 0), 0);
  const count = stages.reduce((a, s) => a + s.jobs.length, 0);
  return (
    <>
      <PageHead eyebrow="Every project, one journey" title="Pipeline" sub="Eight stages, from the first call to the final payment. Nothing depends on you remembering what comes next.">
        <span className="pill line">{count} live jobs · {eur(total)}</span>
        <button className="btn primary"><Plus /> New job</button>
      </PageHead>

      <div className="card pad" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 6, overflowX: "auto" }}>
        {stages.map((s, i) => (
          <div key={s.key} className="row" style={{ gap: 6, flex: "none" }}>
            <div className="stack" style={{ alignItems: "center", gap: 6, minWidth: 92 }}>
              <span className="col-h" style={{ padding: 0, border: "none" }}>
                <span className="idx">{s.idx}</span>
              </span>
              <span className="tiny" style={{ fontWeight: 620, textAlign: "center" }}>{s.name}</span>
              <span className="tiny muted">{s.jobs.length}</span>
            </div>
            {i < stages.length - 1 ? <span className={`wire ${i < 5 ? "live" : ""}`} style={{ minWidth: 26 }} /> : null}
          </div>
        ))}
      </div>

      <div className="board">
        {stages.map((s) => {
          const val = s.jobs.reduce((a, j) => a + j.value, 0);
          return (
            <div className="col" key={s.key}>
              <div className="col-h">
                <span className="idx">{s.idx}</span>
                <span className="n">{s.name}</span>
                <span className="k">{s.jobs.length}</span>
              </div>
              <div className="col-body">
                {s.jobs.map((j) => (
                  <div className="jobcard" key={j.id}>
                    <div className="spread" style={{ alignItems: "flex-start" }}>
                      <span className="mono tiny muted">{j.id}</span>
                      {j.flag ? <Pill tone={flagTone[j.flag]}>{flagText[j.flag]}</Pill> : null}
                    </div>
                    <div className="t" style={{ marginTop: 4 }}>{j.title}</div>
                    <div className="m">{j.client} · {j.place}</div>
                    <div className="bar"><span style={{ width: `${j.progress}%` }} /></div>
                    <div className="foot">
                      <span className="tiny muted">{j.age}</span>
                      <span className="amt">{eur(j.value)}</span>
                    </div>
                  </div>
                ))}
                {s.jobs.length === 0 ? <div className="tiny muted" style={{ padding: "12px 4px", textAlign: "center" }}>Clear</div> : null}
                <div className="tiny muted" style={{ padding: "4px 2px", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{eur(val)}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card pad" style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <span className="avatar" style={{ background: "var(--cobalt-soft)", color: "var(--cobalt-ink)", borderColor: "transparent" }}><Bolt width={18} height={18} /></span>
        <div>
          <b style={{ fontSize: 13.5 }}>The Coordinator keeps this board moving</b>
          <div className="tiny muted" style={{ marginTop: 2 }}>It nudges stalled jobs, reminds you before a cert is due, and updates clients at each stage. Two jobs are waiting on you: the Nawaz quote and the Braithwaite completion cert.</div>
        </div>
        <button className="btn sm" style={{ marginLeft: "auto" }}>Review 2 waiting</button>
      </div>
    </>
  );
}
