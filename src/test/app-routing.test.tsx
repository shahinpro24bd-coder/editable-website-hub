import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches all public and admin routes", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    const paths = ["/", "/about", "/services", "/videos", "/publications", "/contact", "/auth", "/admin", "/admin/pages/home"];
    for (const p of paths) {
      const matches = router.matchRoutes(p);
      expect(matches.at(-1)?.routeId, `Route failed to match ${p}`).not.toBe(rootRouteId);
    }
  });
});
