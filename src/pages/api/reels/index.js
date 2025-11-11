import db from "@/lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const reels = await db.reel.findMany({
        orderBy: { createdAt: "desc" },
      });
      return res.status(200).json({ data: reels });
    }

    if (req.method === "POST") {
      const { videoUrl, link } = req.body;
      if (!videoUrl || !link)
        return res
          .status(400)
          .json({ error: "Both videoUrl and link are required." });

      const newReel = await db.reel.create({
        data: { videoUrl, link },
      });

      return res.status(201).json({ data: newReel });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error("API Error (Reels):", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
