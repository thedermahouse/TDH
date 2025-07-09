import db from "@/lib/db";
export default function getPart(p) {
  return db.PartContents.findUnique({
    where: { key: p },
  });
}
