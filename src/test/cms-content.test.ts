import { describe, expect, it } from "vitest";
import { applyContent, defaults, usernameToEmail } from "@/lib/cms";
import { achievements, doctor, services } from "@/lib/site";
import { pageTexts } from "@/lib/editable";

describe("CMS content merging and auth username mapping", () => {
  it("maps short admin username to admin email while preserving full emails", () => {
    expect(usernameToEmail("admin")).toBe("admin@drafzal-app.com");
    expect(usernameToEmail("doctor@visioneyebd.org")).toBe("doctor@visioneyebd.org");
  });

  it("applies saved overrides and cleanly resets to defaults when empty", () => {
    applyContent({
      doctor: { phone: "01700000000" },
      texts: { "home.hero.badge": "Senior Retina Surgeon" },
    });
    expect(doctor.phone).toBe("01700000000");
    expect(pageTexts["home.hero.badge"]).toBe("Senior Retina Surgeon");

    applyContent(null);
    expect(doctor.phone).toBe(defaults.doctor.phone);
    expect(pageTexts["home.hero.badge"]).toBeUndefined();
    expect(services.length).toBe(defaults.services.length);
  });

  it("lets the admin add, edit and remove achievements, including removing all", () => {
    const first = defaults.achievements[0]!;
    applyContent({ achievements: [{ ...first, title: "Edited award" }, { ...first, id: "ach-new", title: "New award" }] });
    expect(achievements.map((a) => a.title)).toEqual(["Edited award", "New award"]);

    applyContent({ achievements: [] });
    expect(achievements).toHaveLength(0);

    applyContent({});
    expect(achievements).toHaveLength(defaults.achievements.length);
  });
});
