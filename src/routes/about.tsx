import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "@/components/site/pages/AboutPage";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Md. Afzal Mahfuzullah | Vitreo-Retina Specialist & Phaco Surgeon" },
      { name: "description", content: "Biography, medical qualifications, fellowship training, photo gallery and awards of Dr. Md. Afzal Mahfuzullah." },
      { property: "og:title", content: "About Dr. Md. Afzal Mahfuzullah" },
      { property: "og:description", content: "Associate Professor (Vitreo-Retina), BMU & Consultant Ophthalmologist at Vision Eye Hospital, Dhaka." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});