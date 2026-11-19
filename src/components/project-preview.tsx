import { AudioLines, FileText, Database, MessagesSquare } from "lucide-react";
import type { Project } from "@/content/portfolio";

export function ProjectPreview({project}: {project: Project}) {
  return <div className={`project-figure ${project.slug}`}>

    {project.comparison?.length ? <div className="metric-plot" aria-label="Mean absolute error before and after fine-tuning">{project.comparison.map(row => <div key={row.label}>{row.label}<i style={{width: (row.value / Math.max(...project.comparison!.map(r=>r.value)) * 100) + "%"}}/><b>{row.value.toFixed(3)}</b></div>)}</div>
    : project.slug === "finsight" ? <div className="report-flow"><span><FileText/>Report</span><i/><span><Database/>Index</span><i/><span><MessagesSquare/>Q&A</span></div>
    : <div className="audio-preview" aria-hidden="true"><AudioLines/>{Array.from({length:46},(_,i)=><i key={i} style={{height: 7 + Math.abs(Math.sin(i * .32) * Math.cos(i * 1.9)) * 48}}/>)}</div>}
    <strong>{project.outcome}</strong><span>{project.outcomeLabel}</span>
  </div>;
}
