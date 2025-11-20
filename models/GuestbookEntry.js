import mongoose from 'mongoose';

const GuestbookEntrySchema = new mongoose.Schema({
  invitationSlug: {
    type: String,
    required: [true, 'Please provide an invitation slug for the guestbook entry.'],
    index: true, // Untuk pencarian yang lebih cepat berdasarkan slug
  },
  name: {
    type: String,
    required: [true, 'Please provide your name.'],
    maxlength: [50, 'Name cannot be more than 50 characters.'],
  },
  message: {
    type: String,
    required: [true, 'Please provide a message.'],
    maxlength: [500, 'Message cannot be more than 500 characters.'],
  },
  likes: {
    type: Number,
    default: 0,
  },
}, { timestamps: true }); // Menambahkan `timestamps` untuk createdAt dan updatedAt

export default mongoose.models.GuestbookEntry || mongoose.model('GuestbookEntry', GuestbookEntrySchema);
