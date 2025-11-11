import db from "@/lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "DELETE") {
      await db.reel.delete({ where: { id: Number(id) } });
      return res.status(200).json({ success: true });
    }

    if (req.method === "PATCH") {
      const { videoUrl, link } = req.body;
      const updatedReel = await db.reel.update({
        where: { id: Number(id) },
        data: { videoUrl, link },
      });

      return res.status(200).json({ data: updatedReel });
    }

    return res.status(405).json({ error: "Method Not Allowed" });
  } catch (err) {
    console.error("API Error (Reel ID):", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
