import path from "path";
import fs from "fs";
const db = require("@/lib/db");

const uploadDir = path.join(process.cwd(), "public/schoolImages");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

export async function POST(req) {
  try {
    const formData = await req.formData();

    const fields = {};
    formData.forEach((value, key) => {
      if (key !== "image") {
        fields[key] = value;
      }
    });

    const file = formData.get("image");
    if (!file || !file.name) {
      return new Response(
        JSON.stringify({ success: false, error: "No file uploaded." }),
        { status: 400 }
      );
    }

    const fileName = `${Date.now()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    const fileBuffer = await file.arrayBuffer();
    fs.writeFileSync(filePath, Buffer.from(fileBuffer));

    const imageFilePath = `/schoolImages/${fileName}`;

    const query = `
      INSERT INTO schools (name, address, city, state, contact, image, email_id)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      fields.name,
      fields.address,
      fields.city,
      fields.state,
      fields.contact,
      imageFilePath,
      fields.email_id,
    ];

    await db.query(query, values);

    return new Response(
      JSON.stringify({ success: true, imagePath: imageFilePath }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/schools:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Internal server error." }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const [rows] = await db.query(
      "SELECT id, name, address, city, image FROM schools"
    );
    return new Response(JSON.stringify({ success: true, schools: rows }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching schools:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
