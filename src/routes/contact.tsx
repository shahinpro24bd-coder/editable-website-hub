import { createFileRoute } from "@tanstack/react-router";
import { ContactPage } from "@/components/site/pages/ContactPage";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Appointment | Dr. Md. Afzal Mahfuzullah" },
      { name: "description", content: "Book an appointment with Dr. Md. Afzal Mahfuzullah at Vision Eye Hospital, 299 Green Road, Dhaka. Call 09610244123 or submit an online request." },
      { property: "og:title", content: "Contact & Appointment | Dr. Md. Afzal Mahfuzullah" },
      { property: "og:description", content: "Chamber schedule, phone hotline, WhatsApp and online appointment request form." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});