import crypto from "crypto";

const CLOUD_NAME = process.env.CLOUDINARY_NAME;
const API_KEY = process.env.CLOUDINARY_KEY;
const API_SECRET = process.env.CLOUDINARY_SECRET;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metodo non autorizzato" });
  }

  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ message: "Nome Foto Necessario" });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = crypto
    .createHash("sha1")
    .update(`public_id=${public_id}&timestamp=${timestamp}${API_SECRET}`)
    .digest("hex");

  const formData = new URLSearchParams();
  formData.append("public_id", public_id);
  formData.append("signature", signature);
  formData.append("api_key", API_KEY);
  formData.append("timestamp", timestamp);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/destroy`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      res.json({ message: "Foto Eliminata" });
    } else {
      res.status(500).json({
        message: "Errore Cloudinary /api/delete_image" + { error: data },
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Errore /api/delete_image" + error });
  }
}
