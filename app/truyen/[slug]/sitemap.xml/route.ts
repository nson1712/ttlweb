import { NextResponse } from "next/server";
import { fetchChapters, fetchStoryDetails } from "@/app/lib/fetch-data";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;

  const storyRes = await fetchStoryDetails(slug);
  const storyId = Number(storyRes?.data?.data?.id);
  if (!storyId) {
    return new NextResponse("Story not found", { status: 404 });
  }

  const { data: { data: chapters = [] } = {} } = await fetchChapters({
    storyId,
    page: 0,
    pageSize: 10000,
  });

  const urls = chapters
    .filter((c) => c.slug)
    .map((c) => {
      const loc = `${baseUrl}truyen/${slug}/${c.slug}`;
      const lastmod = new Date(c.updatedAt || Date.now()).toISOString();
      //chapter vừa được cập nhật <7 ngày thì changefreq=daily, ưu tiên cao
      const updatedAt = c.updatedAt ? new Date(c.updatedAt) : new Date();
      const ageInDays =
        (Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24);
      const changefreq = ageInDays < 7 ? "daily" : "weekly";
      //chapter đầu tiên ưu tiên cao hơn, ví dụ 0.9, sau đó 0.8
      const index = chapters.findIndex((x) => x.slug === c.slug);
      const priority = (index === 0 ? 1 : 0.9).toFixed(1);

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
<urlset 
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  ${urls}
</urlset>`;

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
