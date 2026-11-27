import { createFileRoute } from "@tanstack/react-router";
import { PublicationsPage } from "@/components/site/pages/PublicationsPage";

export const Route = createFileRoute("/publications")({
  head: () => ({
    meta: [
      { title: "Publications & Research | Dr. Md. Afzal Mahfuzullah" },
      { name: "description", content: "Peer-reviewed ophthalmology publications, case reports and research awards of Dr. Md. Afzal Mahfuzullah." },
      { property: "og:title", content: "Publications & Research | Dr. Md. Afzal Mahfuzullah" },
      { property: "og:description", content: "23+ peer-reviewed papers and research honors in retina, glaucoma and ophthalmology." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PublicationsPage,
});