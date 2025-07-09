import db from "@/lib/db";
import mime from "mime";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID is required" });
    }

    if (req.headers["if-none-match"] === id) {
      return res.status(304).end();
    }

    try {
      const media = await db.Files.findUnique({
        where: { id: +id },
        select: {
          id: true,
          filename: true,
          createdAt: true,
          content: true,
        },
      });

      if (!media) {
        return res
          .status(404)
          .json({ success: false, message: "File not found" });
      }

      const { content, filename, createdAt } = media;
      const extension = filename.split(".").pop();
      const mimeType = mime.getType(extension) || "application/octet-stream";

      // res.setHeader("Cache-Control", `public, max-age=2592000`);
      res.setHeader("ETag", id);
      // res.setHeader("Last-Modified", createdAt.toUTCString());

      // Set content headers
      res.setHeader("Content-Type", mimeType);
      const fn = encodeURIComponent(filename);
      res.setHeader("Content-Disposition", `attachment; filename="${fn}"`);

      res.end(content);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }
}
