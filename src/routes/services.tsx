import { createFileRoute } from "@tanstack/react-router";
import { ServicesPage } from "@/components/site/pages/ServicesPage";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Eye Care Services | Dr. Md. Afzal Mahfuzullah" },
      { name: "description", content: "Cataract phaco surgery, retina management, glaucoma treatment, pediatric eye care, dry eye & comprehensive eye checkups in Dhaka." },
      { property: "og:title", content: "Eye Care Services | Dr. Md. Afzal Mahfuzullah" },
      { property: "og:description", content: "Comprehensive specialist eye care treatments at Vision Eye Hospital, Green Road, Dhaka." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});