import dbConnect from '../../lib/dbConnect';
import Invitation from '../../models/Invitation';
import slugify from 'slugify';
import formidable from 'formidable';
import cloudinary from '../../lib/cloudinary';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

const uploadFile = async (file) => {
  if (!file) return null;
  const result = await cloudinary.uploader.upload(file.filepath, {
    folder: 'undangan', // Optional: saves to a specific folder in Cloudinary
  });
  return result.secure_url;
};

export default async function handler(req, res) {
  const { method } = req;
  await dbConnect();

  if (method === 'GET') {
    try {
      const invitations = await Invitation.find({}).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: invitations });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
    return;
  }

  if (method === 'POST') {
    // Check if it's JSON or FormData
    const contentType = req.headers['content-type'] || '';
    
    if (contentType.includes('application/json')) {
      // Handle JSON data (from new form)
      try {
        const body = req.body;
        
        // Create slug from names
        const slug = slugify(`${body.brideFullName}-${body.groomFullName}`, {
          lower: true,
          remove: /[*+~.()'"!:@]/g,
          strict: true,
        });

        let finalSlug = slug;
        let count = 1;
        while (await Invitation.findOne({ slug: finalSlug })) {
          finalSlug = `${slug}-${count}`;
          count++;
        }

        // Prepare data for MongoDB with new schema
        const invitationData = {
          slug: finalSlug,
          brideFullName: body.brideFullName,
          groomFullName: body.groomFullName,
          brideNickname: body.brideNickname,
          groomNickname: body.groomNickname,
          weddingDate: body.weddingDate,
          weddingDateDisplay: body.weddingDateDisplay,
          venueLocation: body.venueLocation,
          heroTitle: body.heroTitle,
          heroSubtitle: body.heroSubtitle,
          heroBackground: body.heroBackground,
          bridePhoto: body.bridePhoto,
          brideBio: body.brideBio,
          groomPhoto: body.groomPhoto,
          groomBio: body.groomBio,
          coupleStory: body.coupleStory,
          locationAddress: body.locationAddress,
          locationMapUrl: body.locationMapUrl,
          locationMapEmbed: body.locationMapEmbed,
          reminderMessage: body.reminderMessage,
          loveStory: body.loveStory || [],
          events: body.events || [],
          additionalInfo: body.additionalInfo || [],
          gallery: body.gallery || [],
          template_code: body.template_code || 'wedding-01',
        };

        const invitation = await Invitation.create(invitationData);
        res.status(201).json({ success: true, slug: finalSlug, data: invitation });

      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      return;
    }
    
    // Handle FormData (old form - for backward compatibility)
    const form = formidable({});
    
    try {
      const [fields, files] = await form.parse(req);

      // Extract text fields
      const bride = fields.bride?.[0];
      const groom = fields.groom?.[0];
      const date = fields.date?.[0];
      const location = fields.location?.[0];
      const template_code = fields.template_code?.[0] || 'classic-01';

      // Upload files to Cloudinary
      const coverUrl = await uploadFile(files.cover?.[0]);
      const groomPhotoUrl = await uploadFile(files.groom_photo_url?.[0]);
      const bridePhotoUrl = await uploadFile(files.bride_photo_url?.[0]);

      // Create slug
      const slug = slugify(`${bride}-${groom}`, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
        strict: true,
      });

      let finalSlug = slug;
      let count = 1;
      while (await Invitation.findOne({ slug: finalSlug })) {
        finalSlug = `${slug}-${count}`;
        count++;
      }

      // Prepare data for MongoDB (old schema mapping)
      const invitationData = {
        brideFullName: bride,
        groomFullName: groom,
        weddingDate: date,
        venueLocation: location,
        slug: finalSlug,
        heroBackground: coverUrl,
        groomPhoto: groomPhotoUrl,
        bridePhoto: bridePhotoUrl,
        template_code,
      };

      const invitation = await Invitation.create(invitationData);
      res.status(201).json({ success: true, slug: finalSlug, data: invitation });

    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
    return;
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${method} Not Allowed`);
}

