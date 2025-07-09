import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession as gss } from "next-auth";

export default async function getServerSession(req, res) {
  return await gss(req, res, authOptions);
}
