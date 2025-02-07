import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { NextResponse } from 'next/server';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for memory storage
const upload = multer({ storage: multer.memoryStorage() });

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Convert file to Base64
    const buffer = await file.arrayBuffer();
    const base64String = Buffer.from(buffer).toString('base64');

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64String}`, {
      folder: 'profile_pictures',
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export const config = { api: { bodyParser: false } };
