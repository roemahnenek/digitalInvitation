import mongoose from 'mongoose';

const InvitationSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: [true, 'Please provide a slug for the invitation.'],
    unique: true,
  },
  
  // Hero Section
  brideFullName: {
    type: String,
    required: [true, 'Please provide the bride\'s full name.'],
  },
  groomFullName: {
    type: String,
    required: [true, 'Please provide the groom\'s full name.'],
  },
  heroTitle: {
    type: String,
    default: 'Together with their families',
  },
  heroSubtitle: {
    type: String,
    default: 'request the honour of your presence at the celebration of their marriage',
  },
  heroBackground: {
    type: String,
    default: '/placeholder.svg?height=1200&width=1920',
  },
  
  // Event Date & Location
  weddingDate: {
    type: Date,
    required: [true, 'Please provide the wedding date.'],
  },
  weddingDateDisplay: {
    type: String,
    default: '',
  },
  venueLocation: {
    type: String,
    required: [true, 'Please provide the wedding location.'],
  },
  
  // Couple Info
  bridePhoto: {
    type: String,
    default: '/elegant-bride-portrait.jpg',
  },
  brideNickname: {
    type: String,
    default: '',
  },
  brideBio: {
    type: String,
    default: '',
  },
  groomPhoto: {
    type: String,
    default: '/elegant-groom-portrait.jpg',
  },
  groomNickname: {
    type: String,
    default: '',
  },
  groomBio: {
    type: String,
    default: '',
  },
  coupleStory: {
    type: String,
    default: '',
  },
  
  // Love Story Timeline
  loveStory: [{
    year: String,
    title: String,
    description: String,
    image: String,
  }],
  
  // Event Details
  events: [{
    icon: String,
    title: String,
    time: String,
    description: String,
  }],
  
  // Location Map
  locationMapUrl: {
    type: String,
    default: '',
  },
  locationMapEmbed: {
    type: String,
    default: '',
  },
  locationAddress: {
    type: String,
    default: '',
  },
  
  // Gallery Photos
  gallery: [{
    url: String,
    caption: String,
  }],
  
  // Additional Info
  additionalInfo: [{
    text: String,
  }],
  
  // Reminder
  reminderMessage: {
    type: String,
    default: 'We can\'t wait to celebrate with you!',
  },
  
  template_code: {
    type: String,
    default: 'classic-01',
  },
}, { timestamps: true });

export default mongoose.models.Invitation || mongoose.model('Invitation', InvitationSchema);
