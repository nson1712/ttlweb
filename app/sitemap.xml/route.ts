import { NextResponse } from "next/server";
import { fetchStories } from "../lib/fetch-data";

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "")
  const { data: { data: stories = [] } = {} } = await fetchStories({
    page: 0,
    pageSize: 10000,
  });
  const now = new Date().toISOString();

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${stories
  .map(
    (story) => `
  <sitemap>
    <loc>${baseUrl}/${story.slug}-sitemap.xml</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

  return new NextResponse(sitemapXml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
