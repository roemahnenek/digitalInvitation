import formidable from 'formidable';
import cloudinary from '../../lib/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadToCloudinary = async (file) => {
  if (!file) return null;
  try {
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: 'wedding-invitations',
      resource_type: 'auto',
    });
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const form = formidable({
    maxFiles: 1,
    maxFileSize: 5 * 1024 * 1024, // 5MB
  });

  try {
    const [fields, files] = await form.parse(req);
    
    const fileKey = Object.keys(files)[0];
    const file = files[fileKey]?.[0];

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const url = await uploadToCloudinary(file);
    
    res.status(200).json({ 
      success: true, 
      url,
      message: 'File uploaded successfully' 
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message || 'Upload failed' 
    });
  }
}
