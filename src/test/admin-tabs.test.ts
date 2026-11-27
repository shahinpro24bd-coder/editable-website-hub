import { describe, expect, it } from "vitest";

import { adminTabs } from "@/lib/admin-tabs";

// The doctor asked for appointment requests and website content only: no patient
// directory, no care plans, no surgical-visit records in the admin panel.
describe("Admin panel sections", () => {
  const keys = adminTabs.map((t) => t.key);
  const labels = adminTabs.map((t) => t.label.toLowerCase());

  it("lists the sections the doctor wants", () => {
    expect(keys).toEqual([
      "dashboard",
      "appointments",
      "doctor",
      "services",
      "publications",
      "videos",
      "gallery",
      "achievements",
      "account",
    ]);
  });

  it("has no patient, care plan or surgical visit section", () => {
    for (const banned of ["patients", "care_plans", "procedures"]) {
      expect(keys).not.toContain(banned);
    }
    for (const label of labels) {
      expect(label).not.toMatch(/patient|care plan|surger|surgical|visit/);
    }
  });
});
