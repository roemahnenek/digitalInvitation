import dbConnect from '../../lib/dbConnect';
import mongoose from 'mongoose';

// Schema untuk Template
const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  thumbnail: String,
  description: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Template = mongoose.models.Template || mongoose.model('Template', templateSchema);

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      // Fetch only active templates
      const templates = await Template.find({ isActive: true }).sort({ createdAt: -1 });
      
      return res.status(200).json({
        success: true,
        templates
      });
    } catch (error) {
      console.error('Error fetching templates:', error);
      return res.status(500).json({
        success: false,
        message: 'Error fetching templates'
      });
    }
  } else {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  }
}
