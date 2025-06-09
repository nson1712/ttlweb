
import { NextResponse } from "next/server";
import { fetchStories } from "../lib/fetch-data";

export async function GET() {
  const pageSize = 1000; // set a large number to fetch all stories
  const allStories = await fetchStories({ page: 0, pageSize });

  const baseUrl = "https://yourdomain.com"; // replace with your domain

  const urls = allStories.data.data.map((story) => {
    return `
      <url>
        <loc>${baseUrl}/novel/${story.slug}</loc>
        <lastmod>${new Date(story.updatedAt).toISOString()}</lastmod>
      </url>
    `;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xhtml="http://www.w3.org/1999/xhtml"
  >
    ${urls.join("")}
  </urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}