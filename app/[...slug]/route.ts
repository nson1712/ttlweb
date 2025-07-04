import { NextResponse } from "next/server";
import { fetchChapters, fetchStoryDetails } from "@/app/lib/fetch-data";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: { slug: string[] } }
) {
  const path = params.slug.join("/");

  if (!path.endsWith("-sitemap.xml")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const slug = path.replace(/-sitemap\.xml$/, "");
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!.replace(/\/$/, "");

  const storyRes = await fetchStoryDetails({ slug });
  const storyId = Number(storyRes?.data?.data?.id);
  if (!storyId) {
    return new NextResponse("Story not found", { status: 404 });
  }

  const { data: { data: chapters = [] } = {} } = await fetchChapters({
    storyId,
    page: 0,
    pageSize: 10000,
  });

  const urlsXml = chapters.map((c) => {
  const loc = `${baseUrl}/truyen/${slug}/${c.slug}`;
  const lastUpdated = c.updatedAt ? new Date(c.updatedAt) : new Date();
  const lastmod = lastUpdated.toISOString();
  const ageInDays = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);

  const changefreq = ageInDays < 7 ? "daily" : "weekly";
  const priority = ageInDays < 2 ? 1.0 : ageInDays < 7 ? 0.8 : 0.5;

  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
}).join("\n");


  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
                      http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
>
${urlsXml}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
