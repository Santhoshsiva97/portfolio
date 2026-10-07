import { renderToBuffer } from "@react-pdf/renderer";
import { cacheLife } from "next/cache";
import { getProjects, getResume } from "@/lib/content";
import { ResumeDocument } from "@/lib/resume-pdf/ResumeDocument";

// /resume.pdf is generated from content/resume.json (+ project frontmatter), so the PDF can never drift
// from the website. Content only changes with a deploy, so the bytes are cached for the life of the build.
export async function GET() {
  const pdf = await renderResumePdf();
  const filename = `${getResume().basics.name.replace(/\s+/g, "_")}_Resume.pdf`;

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${filename}"`,
    },
  });
}

// react-pdf stamps a creation date (non-deterministic), which would make the route render per request;
// "use cache" lets Next prerender it once instead.
async function renderResumePdf(): Promise<Uint8Array<ArrayBuffer>> {
  "use cache";
  cacheLife("max");

  const resume = getResume();
  const projects = getProjects({ status: ["in-progress", "completed"] });
  // Called as a function (no hooks inside) so renderToBuffer receives the <Document> element it expects.
  const buffer = await renderToBuffer(ResumeDocument({ resume, projects }));
  return new Uint8Array(buffer);
}
