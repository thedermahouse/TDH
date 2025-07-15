import db from "@/lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const enquiries = await db.ContactUs.findMany({
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    return res.status(200).json(enquiries);
  }
  if (req.method === "PUT") {
    const {
  firstName,
  lastName,
  email,
  phone,
  message,
  enquiry_from,
  utm_source,
  utm_medium,
  utm_campaign,
  utm_term,
  utm_content,
} = req.body;


    console.log(firstName, lastName, email, phone, message, enquiry_from);

    if (!firstName || !lastName || !email || !phone || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const newContact = await db.ContactUs.create({
        data: {
  firstName,
  lastName,
  email,
  phone,
  message,
  enquiry_from,
  utm_source,
  utm_medium,
  utm_campaign,
  utm_term,
  utm_content,
},
      });

      return res
        .status(200)
        .json({ message: "Enquiry created", contact: newContact });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error creating enquiry" });
    }
  }

  if (req.method === "DELETE") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID is required" });
    }

    try {
      await db.ContactUs.delete({
        where: { id: +id },
      });

      return res.status(200).json({ message: "Enquiry deleted" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error deleting enquiry" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
