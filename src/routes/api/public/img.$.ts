import { createFileRoute } from "@tanstack/react-router";

const MIME_BY_EXT: Record<string, string> = {
  webp: "image/webp",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  avif: "image/avif",
};

// Serves uploaded site images from private storage through the site's own address.
export const Route = createFileRoute("/api/public/img/$")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const path = params._splat ?? "";
        if (!/^[\w.-]+$/.test(path) || path.includes("..")) return new Response("Not found", { status: 404 });
        let data: Blob | null = null;
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const res = await supabaseAdmin.storage.from("site-images").download(path);
          data = res.data;
        } catch {
          return new Response("Not found", { status: 404 });
        }
        if (!data) return new Response("Not found", { status: 404 });
        const ext = path.split(".").pop()?.toLowerCase() ?? "";
        const contentType =
          data.type && data.type !== "application/octet-stream"
            ? data.type
            : MIME_BY_EXT[ext] ?? "image/webp";
        return new Response(data, {
          headers: {
            "content-type": contentType,
            "cache-control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});