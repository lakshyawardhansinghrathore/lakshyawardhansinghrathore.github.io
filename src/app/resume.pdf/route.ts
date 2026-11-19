import { PDFDocument, PDFString, StandardFonts, PageSizes, rgb } from "pdf-lib";
import { site, timeline, projects, skillGroups, certifications, activities, codingProfiles } from "@/content/portfolio";

export const dynamic = "force-static";

export async function GET() {
  const doc = await PDFDocument.create();
  doc.setAuthor(site.name);
  doc.setTitle(site.name + " | Résumé");
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  let page = doc.addPage(PageSizes.A4);
  let y = page.getHeight() - 44;
  const margin = 40;
  const width = page.getWidth() - margin * 2;
  const ink = rgb(.10,.14,.21);
  const blue = rgb(.19,.28,.50);
  function paragraph(value: string, size = 9.5, font = regular, color = ink) {
    const text = value.replaceAll("→", "to");
    const lines: string[] = [];
    let line = "";
    for (const word of text.split(/\s+/)) {
      const candidate = line ? line + " " + word : word;
      if (line && font.widthOfTextAtSize(candidate, size) > width) {
        lines.push(line);
        line = word;
      } else line = candidate;
    }
    lines.push(line);
    for (const item of lines) {
      if (y < margin) { page = doc.addPage(PageSizes.A4); y = page.getHeight() - margin; }
      page.drawText(item, {x: margin, y, font, size, color});
      y -= size * 1.30;
    }
    y -= 2;
  }
  function heading(text: string) { y -= 6; paragraph(text, 11.5, bold, blue); }
  paragraph(site.name, 23, bold);
  paragraph(site.role, 11, bold);
  paragraph(site.email + "   |   " + site.siteUrl);
  let x = margin;
  for (const { label, url } of codingProfiles) {
    const size = 9.5;
    const right = x + regular.widthOfTextAtSize(label, size);
    page.drawText(label, { x, y, size, font: regular, color: blue });
    page.drawLine({ start: { x, y: y - 1 }, end: { x: right, y: y - 1 }, thickness: .4, color: blue });
    const link = doc.context.obj({
      Type: "Annot", Subtype: "Link", Rect: [x, y - 2, right, y + size],
      Border: [0, 0, 0], A: { S: "URI", URI: PDFString.of(url) },
    });
    page.node.addAnnot(doc.context.register(link));
    x = right + 16;
  }
  y -= 15;
  paragraph(site.tagline);
  heading("Education");
  paragraph(site.education.school + "   |   " + site.education.period, 10, bold);
  paragraph(site.education.degree + "   |   " + site.education.detail);
  heading("Selected projects");
  for (const p of projects) {
    paragraph(p.title + "   |   " + p.category, 10, bold);
    paragraph(p.tagline + " " + p.highlights.join(" "));
    if (p.slug === "attendo") paragraph(p.outcome + " " + p.outcomeLabel);
  }
  heading("Experience");
  for (const job of timeline.filter(item => item.type === "internship")) {
    paragraph(job.title + "   |   " + job.org + "   |   " + job.date, 10, bold);
    paragraph(job.points.join(" "));
  }
  heading("Technical skills");
  for (const g of skillGroups) paragraph(g.category + "  —  " + g.skills.join(", "), 9);
  heading("Certifications");
  for (const c of certifications) paragraph(c.name + (c.exam ? " (" + c.exam + ")" : ""));
  heading("Campus involvement");
  for (const a of activities) paragraph(a.role + "  —  " + a.detail, 9);
  return new Response(Buffer.from(await doc.save()), { headers: { "Content-Type": "application/pdf", "Content-Disposition": 'attachment; filename="Lakshyawardhan-Singh-Rathore-Resume.pdf"' } });
}
