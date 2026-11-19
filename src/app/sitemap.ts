import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.siteUrl}/` },
    { url: `${site.siteUrl}/resume/` },
    ...projects.map(({ slug }) => ({ url: `${site.siteUrl}/projects/${slug}/` })),
  ];
}
