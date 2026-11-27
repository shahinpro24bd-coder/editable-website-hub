import { createFileRoute } from "@tanstack/react-router";
import { HomePage } from "@/components/site/pages/HomePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Md. Afzal Mahfuzullah | Vitreo-Retina Specialist & Phaco Surgeon" },
      {
        name: "description",
        content:
          "Dr. Md. Afzal Mahfuzullah — Vitreo-Retina Specialist & Phaco Surgeon at Vision Eye Hospital, 299 Green Road, Dhaka. Cataract, retina, glaucoma & comprehensive eye care.",
      },
      { property: "og:title", content: "Dr. Md. Afzal Mahfuzullah | Vitreo-Retina Specialist & Phaco Surgeon" },
      { property: "og:description", content: "Expert vitreo-retina & cataract surgery at Vision Eye Hospital, Green Road, Dhaka." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});
