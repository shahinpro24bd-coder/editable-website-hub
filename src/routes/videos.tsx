import { createFileRoute } from "@tanstack/react-router";
import { VideosPage } from "@/components/site/pages/VideosPage";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title: "TV & Eye Care Videos | Dr. Md. Afzal Mahfuzullah" },
      { name: "description", content: "Watch Dr. Md. Afzal Mahfuzullah on DBC News, NTV, Rtv, Boishakhi TV and Nexus TV discussing cataract, diabetic retinopathy and eye care." },
      { property: "og:title", content: "TV & Eye Care Videos | Dr. Md. Afzal Mahfuzullah" },
      { property: "og:description", content: "Television health talks and patient education videos on retina & cataract care." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VideosPage,
});