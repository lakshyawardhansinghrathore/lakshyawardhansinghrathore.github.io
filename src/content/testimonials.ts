/**
 * TESTIMONIALS — shown in a carousel on the home page.
 * TODO: replace with real quotes from professors, mentors or teammates.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Lakshyawardhan rebuilt our entire club management workflow in six weeks. What impressed me most wasn't the code — it was that he kept showing up with questions about how we actually work before writing any of it.",
    name: "Prof. Meera Iyer", // TODO: replace
    role: "Faculty Advisor, Student Technical Council",
  },
  {
    quote:
      "He treats intern projects like products, not assignments. The reconciliation dashboard he built is still the first tool our ops team opens every morning.",
    name: "Rahul Verma", // TODO: replace
    role: "Engineering Manager, FinEdge Labs",
  },
  {
    quote:
      "We built DeployPilot as a team of three, and Lakshyawardhan was the one who kept us honest — about scope, about testing, about what we actually needed versus what looked cool on a resume.",
    name: "Sneha Kulkarni", // TODO: replace
    role: "Project Teammate, DeployPilot",
  },
];
