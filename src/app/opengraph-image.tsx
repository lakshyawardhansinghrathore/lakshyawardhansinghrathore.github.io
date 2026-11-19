import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const dynamic = "force-static";
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Open Graph image rendered at build time — matches the site's brand. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#090b10",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(112,133,235,0.18) 0%, transparent 45%), radial-gradient(circle at 10% 90%, rgba(112,133,235,0.10) 0%, transparent 40%)",
          fontFamily: "sans-serif",
        }}
      >
        {/* Accent bar */}
        <div
          style={{
            display: "flex",
            width: 72,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#98b8ff",
            marginBottom: 36,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#abbaff",
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          {site.education.school.toUpperCase()} · CSE &apos;27
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 88,
            fontWeight: 700,
            color: "#fafafa",
            letterSpacing: -2,
            marginBottom: 20,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#a1a1aa",
            maxWidth: 900,
          }}
        >
          {site.role}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: "auto",
            fontSize: 22,
            color: "#98b8ff",
          }}
        >
          {site.siteUrl.replace(/^https?:\/\//, "")} · machine learning · generative AI
        </div>
      </div>
    ),
    size,
  );
}
