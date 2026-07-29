"use client";
import * as React from "react";
import { PageHead, Pill } from "@/components/ui";
import { eur } from "@/components/ui";
import { stages } from "@/lib/data";
import type { Job } from "@/lib/data";
import { Plus, Bolt } from "@/components/icons";
import { useToast, Modal, Drawer } from "@/components/interactive";

const flagTone: Record<string, "r" | "y" | "b"> = { hot: "r", wait: "y", risk: "r" };
const flagText: Record<string, string> = { hot: "Hot", wait: "Waiting", risk: "At risk" };

export default function PipelinePage() {
  const toast = useToast();
  const [newOpen, setNewOpen] = React.useState(false);
  const [job, setJob] = React.useState<{ job: Job; stage: string } | null>(null);

  const total = stages.reduce((a, s) => a + s.jobs.reduce((b, j) => b + j.value, 0), 0);
  const count = stages.reduce((a, s) => a + s.jobs.length, 0);
  const jobStageIdx = job ? stages.findIndex((s) => s.name === job.stage) : -1;

  return (
    <>
      <PageHead eyebrow="Every project, one journey" title="Pipeline" sub="Eight stages, from the first call to the final payment. Nothing depends on you remembering what comes next.">
        <span className="pill line">{count} live jobs · {eur(total)}</span>
        <button className="btn primary" onClick={() => setNewOpen(true)}><Plus /> New job</button>
      </PageHead>

      <div className="card pad" style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 6, overflowX: "auto" }}>
        {stages.map((s, i) => (
          <div key={s.key} className="row" style={{ gap: 6, flex: "none" }}>
            <div className="stack clickable" onClick={() => toast(`${s.name} — ${s.jobs.length} ${s.jobs.length === 1 ? "job" : "jobs"}`)} style={{ alignItems: "center", gap: 6, minWidth: 92 }}>
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
                  <div className="jobcard clickable" key={j.id} onClick={() => setJob({ job: j, stage: s.name })}>
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
        <button className="btn sm" style={{ marginLeft: "auto" }} onClick={() => toast("2 waiting jobs flagged for review", "y")}>Review 2 waiting</button>
      </div>

      {/* New job modal */}
      <Modal
        open={newOpen}
        onClose={() => setNewOpen(false)}
        title="New job"
        sub="Add a project to the pipeline"
        wide
        footer={
          <>
            <button className="btn ghost" onClick={() => setNewOpen(false)}>Cancel</button>
            <button className="btn primary" onClick={() => { toast("Created new job in Customer contact", "g"); setNewOpen(false); }}>Create job</button>
          </>
        }
      >
        <div className="stack" style={{ gap: 14 }}>
          <label className="stack" style={{ gap: 6 }}>
            <span className="tiny muted">Job title</span>
            <input className="field-in" placeholder="e.g. Garden office wiring" />
          </label>
          <label className="stack" style={{ gap: 6 }}>
            <span className="tiny muted">Client</span>
            <input className="field-in" placeholder="e.g. M. Sørensen" />
          </label>
          <div className="row" style={{ gap: 12 }}>
            <label className="stack grow" style={{ gap: 6 }}>
              <span className="tiny muted">Estimated value (£)</span>
              <input className="field-in" type="number" placeholder="2400" />
            </label>
            <label className="stack grow" style={{ gap: 6 }}>
              <span className="tiny muted">Stage</span>
              <select className="field-in" defaultValue="Customer contact">
                {stages.map((s) => <option key={s.key}>{s.name}</option>)}
              </select>
            </label>
          </div>
        </div>
      </Modal>

      {/* Job detail drawer */}
      <Drawer
        open={!!job}
        onClose={() => setJob(null)}
        title={job?.job.title}
        sub={job ? `${job.job.id} · ${job.stage}` : undefined}
        footer={job ? (
          <>
            <button className="btn primary" onClick={() => { toast(`${job.job.id} advanced a stage`, "g"); setJob(null); }}>Advance stage</button>
            <button className="btn ghost" onClick={() => { toast(`Message sent to ${job.job.client}`, "b"); setJob(null); }}>Message client</button>
          </>
        ) : null}
      >
        {job ? (
          <div className="stack" style={{ gap: 12 }}>
            <div className="kv"><span className="k">Client</span><span className="v">{job.job.client}</span></div>
            <div className="kv"><span className="k">Location</span><span className="v">{job.job.place}</span></div>
            <div className="kv"><span className="k">Value</span><span className="v">{eur(job.job.value)}</span></div>
            <div className="kv"><span className="k">Age</span><span className="v">{job.job.age}</span></div>
            {job.job.flag ? <div className="kv"><span className="k">Flag</span><span className="v">{flagText[job.job.flag]}</span></div> : null}
            <div>
              <div className="tiny muted" style={{ margin: "6px 0 10px" }}>Stage progress · {job.job.progress}%</div>
              <div className="timeline">
                {stages.map((s, i) => (
                  <div key={s.key} className={`tl-item ${i < jobStageIdx ? "done" : i === jobStageIdx ? "now" : ""}`}>
                    <div className="tt" style={{ fontSize: 12.5 }}>{s.idx}. {s.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Drawer>
    </>
  );
}
