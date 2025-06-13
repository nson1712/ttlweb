import { NextResponse, NextRequest } from "next/server";
import { fetchStories } from "@/app/lib/fetch-data";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") ?? "0", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") ?? "20", 10);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
  const storyRes = await fetchStories({ page, pageSize });
  const stories = storyRes?.data?.data || [];

  const urls = stories
    .filter((s) => s.slug)
    .map((s, idx) => {
      const loc = `${baseUrl}truyen/${s.slug}`;
      const lastmod = new Date(s.updatedAt || Date.now()).toISOString();
      const ageInDays =
        (Date.now() - new Date(s.updatedAt || Date.now()).getTime()) /
        (1000 * 60 * 60 * 24);
      const changefreq = ageInDays < 7 ? "daily" : "weekly";
      const priority = (idx === 0 ? 1 : 0.9).toFixed(1);

      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
