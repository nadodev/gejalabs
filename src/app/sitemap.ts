import type { MetadataRoute } from "next";
import { experiments } from "@/data/experiments";

const siteUrl = "https://geja-lab-forge.lovable.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/experiments", "/knowledge", "/about"].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
  }));

  const experimentRoutes = experiments.map((experiment) => ({
    url: `${siteUrl}/experiments/${experiment.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...experimentRoutes];
}
