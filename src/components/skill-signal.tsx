import { skillGroups } from "@/content/portfolio";

// Each strand terminates at one tool in the corresponding skill category.
export function SkillSignal({category}: {category: string}) {
  const visible = skillGroups.filter(group => category === "All" || category === group.category);
  const count = visible.reduce((sum, group) => sum + group.skills.length, 0);
  return <figure className="signal-figure"><svg className="skill-signal" viewBox="0 0 560 330" aria-hidden="true">
    {skillGroups.map((group, index) => {
      const center = 42 + index * 49;
      const active = category === "All" || category === group.category;
      return <g key={group.category} data-selected={active}>
        {group.skills.map((skill, k) => {
          const spread = k - (group.skills.length - 1) / 2;
          const left = 157 + spread * 2.5 + index * 1.3;
          const right = center + spread * 3.5;
          const end = 454 + Math.cos(k * .55) * 24;
          return <g key={skill}><path d={`M 18 ${left} C 145 ${left}, 172 ${320-center}, 255 ${172+spread*2} S 355 ${right}, ${end} ${right}`}/><circle cx={end} cy={right} r="1.5"/></g>;
        })}
        <text x="507" y={center+4}>{group.skills.length}</text>
      </g>;
    })}
  </svg><figcaption>{count} skills · {category === "All" ? "all categories" : category}</figcaption></figure>;
}
