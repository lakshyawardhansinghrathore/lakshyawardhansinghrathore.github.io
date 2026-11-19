import { CornerDownRight } from "lucide-react";
import type { Project } from "@/content/portfolio";

type Stage = Project["pipeline"][number];

export function StageTrace({ stage }: { stage: Stage }) {
  return (
    <dl className="stage-trace">
      <div><dt>Input</dt><dd>{stage.input}</dd></div>
      <div className="trace-operation"><dt>Operation</dt><dd>{stage.operation}</dd></div>
      <div><dt><CornerDownRight size={14} aria-hidden="true" />Output</dt><dd>{stage.output}</dd></div>
    </dl>
  );
}
