"use client";

import { SkillSignal } from "../skill-signal";
import { useState } from "react";
import { skillGroups } from "@/content/portfolio";

export function Skills({visual=false}: {visual?: boolean} = {}) {
  const [category, setCategory] = useState("All");
  const categories = ["All", ...skillGroups.map(group => group.category)];
  return <section className="portfolio-section" id="skills" aria-labelledby="skills-title">
    <header className="toolkit-title"><p className="eyebrow">Toolkit</p><h2 id="skills-title">Technical skills</h2>{visual && <SkillSignal category={category}/>}</header>
    <label className="skill-select">Skill category
      <select value={category} onChange={event => setCategory(event.target.value)}>
        {categories.map(name => <option key={name} value={name}>{name}</option>)}
      </select>
    </label>
    <div className="skill-filters" aria-label="Filter skills">{categories.map(name =>
      <button type="button" key={name} aria-pressed={name===category} onClick={()=>setCategory(name)}>{name}</button>
    )}</div>
    <div className="skills-grid">{skillGroups.map(group=>
      <article key={group.category} data-filtered={category !== "All" && category !== group.category}>
        <h3>{group.category}</h3><ul className="tag-list">{group.skills.map(skill=><li key={skill}>{skill}</li>)}</ul>
      </article>)}</div>
  </section>;
}
