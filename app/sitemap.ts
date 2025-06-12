import type { MetadataRoute } from "next";
import { fetchStories } from "@/app/lib/fetch-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!.replace(/\/$/, "") + "/";

  const { data: { data: stories = [] } = {} } =
    await fetchStories({ page: 0, pageSize: 1000 });

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1.0,
      lastModified: new Date(),
    },
    {
      url: baseUrl + "novels/",
      changeFrequency: "hourly",
      priority: 0.9,
      lastModified: new Date(),
    },
  ];

  const dynamicPages: MetadataRoute.Sitemap = stories
    .filter((s) => Boolean(s.slug))
    .map((s) => ({
      url: `${baseUrl}novels/${s.slug}`, 
      lastModified: new Date(s.updatedAt),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticPages, ...dynamicPages];
}