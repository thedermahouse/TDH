import db from "@/lib/db";
import getBlob from "@/lib/functions/getBlob";
import md5 from "md5";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
  // Uncomment and implement session check if needed
  // const session = await getServerSession(req, res, authOptions);
  // if (!session) {
  //   return res
  //     .status(403)
  //     .json({ success: false, message: "Forbidden: Admins only" });
  // }

  if (req.method === "GET") {
    const { page } = req.query;
    const pageNumber = parseInt(page) || 1;
    const pageSize = 10;
    const skip = (pageNumber - 1) * pageSize;

    try {
      const media = await db.Files.findMany({
        skip,
        take: pageSize,
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          filename: true,
          createdAt: true,
        },
      });
      return res.status(200).json(media);
    } catch (error) {
      // console.error(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
  if (req.method === "PUT") {
    const { file } = req.body;

    if (!file || !file.data || !file.name) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    const product_image_blob = await getBlob(file.data);
    let md5sum = md5(product_image_blob);

    const media = await db.Files.findFirst({
      where: { md5: md5sum },
      select: {
        id: true,
      },
    });

    if (media === null) {
      try {
        const newMedia = await db.Files.create({
          data: {
            md5: md5sum.trim(),
            filename: file.name.trim(),
            content: product_image_blob,
          },
        });
        return res.status(201).json({ success: true, id: newMedia.id });
      } catch (error) {
        // console.error(error);
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    } else {
      return res.status(200).json({
        success: true,
        message: "Already exists",
        id: media.id,
      });
    }
  }

  return res.status(405).json({
    success: false,
    message: "Method not allowed",
  });
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb",
    },
  },
};
