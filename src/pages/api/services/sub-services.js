import db from "@/lib/db";

export default async function handler(req, res) {
  const ss = await db.SubServices.findMany({});
  return res.status(200).json(ss);
}
