import { Img } from "@/redux/reducer";
import { NextApiRequest, NextApiResponse } from "next";

const CLOUD_NAME = process.env.CLOUDINARY_NAME;
const API_KEY = process.env.CLOUDINARY_KEY;
const API_SECRET = process.env.CLOUDINARY_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("CLOUD_NAME", CLOUD_NAME);
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Metodo non Autorizzato" });
  }

  try {
    const auth = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
    let allImages: Img[] = [];
    let nextCursor = null;
    let url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/resources/image`;

    do {
      const response: Response = await fetch(
        nextCursor ? `${url}?next_cursor=${nextCursor}` : url,
        {
          headers: { Authorization: `Basic ${auth}` },
        }
      );

      if (!response.ok) {
        throw new Error("Errore nel recupero delle immagini");
      }

      const data = await response.json();
      allImages = [...allImages, ...data.resources];
      nextCursor = data.next_cursor || null;
    } while (nextCursor);

    res.json(allImages);
  } catch (error) {
    res.status(500).json({ message: "Errore /api/get_images" + error });
  }
}
