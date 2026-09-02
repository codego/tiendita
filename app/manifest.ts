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
    theme_color: "#C8553D",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
