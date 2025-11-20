import mongoose from 'mongoose';

const RSVPSchema = new mongoose.Schema({
  invitationSlug: {
    type: String,
    required: true,
    index: true
  },
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  attendance: {
    type: String,
    required: [true, 'Attendance status is required'],
    enum: ['hadir', 'tidak-hadir', 'ragu']
  },
  guestCount: {
    type: Number,
    default: 1,
    min: 1
  },
  message: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.models.RSVP || mongoose.model('RSVP', RSVPSchema);
