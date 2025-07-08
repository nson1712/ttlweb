import { NextResponse } from "next/server";
import { fetchChapters, fetchStoryDetails } from "@/app/lib/fetch-data";

export const dynamic = "force-dynamic";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const path = (await params).slug.join("/");

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

  const urlsXml = chapters
    .map((c) => {
      const loc = `${baseUrl}/truyen/${slug}/${c.slug}`;
      const lastUpdated = c.updatedAt ? new Date(c.updatedAt) : new Date();
      const lastmod = lastUpdated.toISOString();
      const ageInDays =
        (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);

      const changefreq = ageInDays < 7 ? "daily" : "weekly";
      const priority = ageInDays < 2 ? 1.0 : ageInDays < 7 ? 0.8 : 0.5;

      return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority.toFixed(1)}</priority>
  </url>`;
    })
    .join("\n");

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

// import { NextResponse } from "next/server";
// import { fetchCategories, fetchStories, fetchChapters, fetchStoryDetails } from "@/app/lib/fetch-data";

// export const dynamic = "force-dynamic";

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ slug: string[] }> }
// ) {
//   const path = (await params).slug.join("/");
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!.replace(/\/$/, "");
//   const deviceId = "sitemap";

//   // CASE 1: sitemap index (sitemap.xml)
//   if (path === "sitemap.xml") {
//     const categoriesRes = await fetchCategories({ deviceId });
//     console.log("CATEGORIES RES: ", categoriesRes)
//     const categories = categoriesRes?.data?.data || [];
//     const now = new Date().toISOString();

//     interface Category {
//       slug: string;
//       // add other properties if needed
//     }
//     const sitemapsXml = categories.map((c: Category) => {
//       return `  <sitemap>
//     <loc>${baseUrl}/the-loai/${c.slug}-sitemap.xml</loc>
//     <lastmod>${now}</lastmod>
//   </sitemap>`;
//     }).join("\n");

//     const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// ${sitemapsXml}
// </sitemapindex>`;

//     return new NextResponse(xml, {
//       headers: {
//         "Content-Type": "application/xml",
//         "Cache-Control": "public, max-age=3600, s-maxage=3600",
//       },
//     });
//   }

//   // CASE 2: sitemap category (the-loai/{category}-sitemap.xml)
//   if (path.startsWith("the-loai/") && path.endsWith("-sitemap.xml")) {
//     const categorySlug = path.replace(/^the-loai\//, "").replace(/-sitemap\.xml$/, "");
//     const storiesRes = await fetchStories({
//       filter: `categories.slug|in|${categorySlug}`,
//       page: 0,
//       pageSize: 10000,
//     });
//     const stories = storiesRes?.data?.data || [];

//     interface Story {
//       slug: string;
//       updatedAt?: string;
//       // add other properties if needed
//     }

//     const urlsXml = stories.map((story: Story) => {
//       const loc = `${baseUrl}/truyen/${story.slug}`;
//       const lastUpdated = story.updatedAt ? new Date(story.updatedAt) : new Date();
//       const lastmod = lastUpdated.toISOString();
//       const ageInDays = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
//       const changefreq = ageInDays < 7 ? "daily" : "weekly";
//       const priority = ageInDays < 2 ? 0.9 : ageInDays < 7 ? 0.7 : 0.5;

//       return `  <url>
//     <loc>${loc}</loc>
//     <lastmod>${lastmod}</lastmod>
//     <changefreq>${changefreq}</changefreq>
//     <priority>${priority.toFixed(1)}</priority>
//   </url>`;
//     }).join("\n");

//     const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset
//   xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//   xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
//                       http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
// >
// ${urlsXml}
// </urlset>`;

//     return new NextResponse(xml, {
//       headers: {
//         "Content-Type": "application/xml",
//         "Cache-Control": "public, max-age=3600, s-maxage=3600",
//       },
//     });
//   }

//   // CASE 3: sitemap story (truyen/{slug}-sitemap.xml)
//   if (path.endsWith("-sitemap.xml")) {
//     const slug = path.replace(/-sitemap\.xml$/, "");
//     const storyRes = await fetchStoryDetails({ slug });
//     const storyId = Number(storyRes?.data?.data?.id);
//     if (!storyId) {
//       return new NextResponse("Story not found", { status: 404 });
//     }

//     const { data: { data: chapters = [] } = {} } = await fetchChapters({
//       storyId,
//       page: 0,
//       pageSize: 10000,
//     });

//     const urlsXml = chapters.map((c) => {
//       const loc = `${baseUrl}/truyen/${slug}/${c.slug}`;
//       const lastUpdated = c.updatedAt ? new Date(c.updatedAt) : new Date();
//       const lastmod = lastUpdated.toISOString();
//       const ageInDays = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
//       const changefreq = ageInDays < 7 ? "daily" : "weekly";
//       const priority = ageInDays < 2 ? 1.0 : ageInDays < 7 ? 0.8 : 0.5;

//       return `  <url>
//     <loc>${loc}</loc>
//     <lastmod>${lastmod}</lastmod>
//     <changefreq>${changefreq}</changefreq>
//     <priority>${priority.toFixed(1)}</priority>
//   </url>`;
//     }).join("\n");

//     const xml = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset
//   xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
//   xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
//   xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
//                       http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
// >
// ${urlsXml}
// </urlset>`;

//     return new NextResponse(xml, {
//       headers: {
//         "Content-Type": "application/xml",
//         "Cache-Control": "public, max-age=3600, s-maxage=3600",
//       },
//     });
//   }

//   return new NextResponse("Not found", { status: 404 });
// }
