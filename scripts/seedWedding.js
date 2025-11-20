// Script untuk menambahkan sample wedding data ke database
// Run: node scripts/seedWedding.js

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Manually load .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envFile = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envFile.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length) {
    envVars[key.trim()] = valueParts.join('=').trim().replace(/^"|"$/g, '');
  }
});

const MONGODB_URI = envVars.MONGODB_URI;

const InvitationSchema = new mongoose.Schema({
  slug: String,
  brideFullName: String,
  groomFullName: String,
  heroTitle: String,
  heroSubtitle: String,
  heroBackground: String,
  weddingDate: Date,
  weddingDateDisplay: String,
  venueLocation: String,
  bridePhoto: String,
  brideNickname: String,
  brideBio: String,
  groomPhoto: String,
  groomNickname: String,
  groomBio: String,
  coupleStory: String,
  loveStory: [{
    year: String,
    title: String,
    description: String,
    image: String,
  }],
  events: [{
    icon: String,
    title: String,
    time: String,
    description: String,
  }],
  locationMapUrl: String,
  locationMapEmbed: String,
  locationAddress: String,
  gallery: [{
    url: String,
    caption: String,
  }],
  additionalInfo: [{
    text: String,
  }],
  reminderMessage: String,
  template_code: String,
}, { timestamps: true });

const Invitation = mongoose.models.Invitation || mongoose.model('Invitation', InvitationSchema);

const sampleData = {
  slug: 'john-jane-wedding',
  brideFullName: 'Jane Doe',
  groomFullName: 'John Smith',
  brideNickname: 'Jane',
  groomNickname: 'John',
  heroTitle: 'Together with their families',
  heroSubtitle: 'request the honour of your presence at the celebration of their marriage',
  heroBackground: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=1080&fit=crop',
  weddingDate: new Date('2025-08-15'),
  weddingDateDisplay: 'Saturday, August 15th, 2025',
  venueLocation: 'Grand Ballroom, Riverside Hotel',
  bridePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  brideBio: 'A passionate photographer and nature lover who believes in capturing life\'s beautiful moments. Known for her creativity and warm smile.',
  groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  groomBio: 'An architect with a passion for design and sustainable living. He brings thoughtfulness and dedication to everything he does.',
  coupleStory: 'Jane and John met at a coffee shop in Portland while they were both waiting for the perfect latte. What started as a conversation about art and architecture blossomed into a beautiful love story. Today, they\'re excited to share this special moment with everyone they love.',
  
  loveStory: [
    {
      year: '2020',
      title: 'First Meeting',
      description: 'Jane and John met at a cozy coffee shop in Portland. A chance conversation about art and architecture sparked an instant connection.',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop'
    },
    {
      year: '2021',
      title: 'First Adventure',
      description: 'They took their first road trip to the coast, watching the sunset and dreaming about their future together.',
      image: 'https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800&h=600&fit=crop'
    },
    {
      year: '2023',
      title: 'The Proposal',
      description: 'John proposed under the stars at their favorite hiking spot. Jane said YES! The adventure continues...',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=600&fit=crop'
    }
  ],
  
  events: [
    {
      icon: 'Clock',
      title: 'Ceremony',
      time: '10:00 AM, August 15, 2025',
      description: 'The vows and celebration begins at the Grand Ballroom, Riverside Hotel.'
    },
    {
      icon: 'MapPin',
      title: 'Location',
      time: 'Riverside Hotel',
      description: 'Grand Ballroom, Riverside Hotel, 123 River Road'
    },
    {
      icon: 'Clock',
      title: 'Reception',
      time: '6:00 PM, August 15, 2025',
      description: 'Dinner, dancing & celebration to follow at the same venue.'
    }
  ],
  
  locationMapUrl: 'https://www.google.com/maps/dir/?api=1&destination=Golden+Gate+Park+Pavilion',
  locationMapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.8904266820436!2d-122.41941542346896!3d37.77492977175749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808580e3b8e3e9ab%3A0x5c5c3d3e3e3e3e3e!2sGolden%20Gate%20Park!5e0!3m2!1sen!2sus&hl=en&output=embed" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  locationAddress: 'Grand Ballroom, Riverside Hotel, 123 River Road',
  
  gallery: [
    { url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop', caption: 'Our first date' },
    { url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=400&fit=crop', caption: 'Sunset at the beach' },
    { url: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d2c39?w=400&h=400&fit=crop', caption: 'Hiking adventure' },
    { url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=400&fit=crop', caption: 'The proposal moment' },
    { url: 'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=400&h=400&fit=crop', caption: 'Celebrating together' },
    { url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop', caption: 'Our journey continues' },
  ],
  
  additionalInfo: [
    { text: 'Parking is available on-site for all guests' },
    { text: 'Reception will include vegetarian and vegan options' },
    { text: 'Please RSVP by August 1st for seating arrangements' },
  ],
  
  reminderMessage: 'We can\'t wait to celebrate with you!',
  template_code: 'wedding-01',
};

async function seedDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if data already exists
    const existing = await Invitation.findOne({ slug: sampleData.slug });
    
    if (existing) {
      console.log('Sample data already exists. Updating...');
      await Invitation.updateOne({ slug: sampleData.slug }, sampleData);
      console.log('Sample data updated successfully!');
    } else {
      console.log('Creating new sample data...');
      await Invitation.create(sampleData);
      console.log('Sample data created successfully!');
    }

    console.log('\nYou can access the wedding invitation at:');
    console.log(`http://localhost:3000/${sampleData.slug}`);
    console.log(`or with guest name: http://localhost:3000/${sampleData.slug}?to=John%20Doe`);

  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

seedDatabase();
