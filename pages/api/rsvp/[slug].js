import dbConnect from '../../../lib/dbConnect';
import RSVP from '../../../models/RSVP';
import Invitation from '../../../models/Invitation';

export default async function handler(req, res) {
  const {
    query: { slug },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const invitation = await Invitation.findOne({ slug });
        if (!invitation) {
          return res.status(404).json({ success: false, error: 'Invitation not found' });
        }

        const rsvps = await RSVP.find({ invitationSlug: slug }).sort({ createdAt: -1 });
        
        // Calculate statistics
        const stats = {
          total: rsvps.length,
          hadir: rsvps.filter(r => r.attendance === 'hadir').length,
          tidakHadir: rsvps.filter(r => r.attendance === 'tidak-hadir').length,
          ragu: rsvps.filter(r => r.attendance === 'ragu').length,
          totalGuests: rsvps.reduce((sum, r) => sum + (r.attendance === 'hadir' ? r.guestCount : 0), 0)
        };

        res.status(200).json({ success: true, data: rsvps, stats });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const { name, attendance, guestCount, message } = req.body;

        if (!name || !attendance) {
          return res.status(400).json({ 
            success: false, 
            error: 'Name and attendance are required' 
          });
        }

        const invitation = await Invitation.findOne({ slug });
        if (!invitation) {
          return res.status(404).json({ success: false, error: 'Invitation not found' });
        }

        const rsvp = await RSVP.create({
          invitationSlug: slug,
          name,
          attendance,
          guestCount: guestCount || 1,
          message: message || ''
        });

        res.status(201).json({ 
          success: true, 
          data: rsvp,
          message: 'RSVP berhasil dikirim! Terima kasih atas konfirmasinya.' 
        });
      } catch (error) {
        if (error.name === 'ValidationError') {
          const messages = Object.values(error.errors).map(val => val.message);
          return res.status(400).json({ success: false, error: messages.join(', ') });
        }
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.status(400).json({ success: false, error: 'Method not allowed' });
      break;
  }
}
