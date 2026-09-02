import type { MetadataRoute } from "next";
import { homeCopy } from "@/lib/home";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Curadario",
    short_name: "Curadario",
    description: homeCopy.hero,
    start_url: "/",
    display: "standalone",
    background_color: "#EFE9DD",
    theme_color: "#EFE9DD",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
