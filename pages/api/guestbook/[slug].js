import dbConnect from '../../../lib/dbConnect';
import GuestbookEntry from '../../../models/GuestbookEntry';
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

        const guestbookEntries = await GuestbookEntry.find({ invitationSlug: slug }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: guestbookEntries });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const { name, message } = req.body;

        if (!name || !message) {
          return res.status(400).json({ success: false, error: 'Name and message are required' });
        }

        const invitation = await Invitation.findOne({ slug });
        if (!invitation) {
          return res.status(404).json({ success: false, error: 'Invitation not found' });
        }

        const guestbookEntry = await GuestbookEntry.create({
          invitationSlug: slug,
          name,
          message,
        });

        res.status(201).json({ success: true, data: guestbookEntry });
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
