import fs from "fs";
import { NextApiRequest, NextApiResponse } from "next";
import IncomingForm from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

const CLOUD_NAME = process.env.CLOUDINARY_NAME;

interface FormFields {
  public_id: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodo non autorizzato" });
  }

  const formidable = require("formidable");
  const form = new formidable.IncomingForm();

  form.parse(req, async (err: Error, fields: FormFields, files: any) => {
    if (err) {
      return res.status(400).json({ message: "Errore Parse Form" + err });
    }

    const file = files.file[0];
    const { public_id } = fields;

    if (!file || !public_id) {
      return res.status(400).json({ message: "File e Nome  Necessari" });
    }
    const fileBuffer = fs.readFileSync(file.filepath);

    const formData = new URLSearchParams();

    formData.append(
      "file",
      `data:${file.mimetype};base64,${fileBuffer.toString("base64")}`
    );
    formData.append("upload_preset", "ml_default");
    formData.append("public_id", public_id);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: "Errore /api/upload_image " + error });
    }
  });
}
