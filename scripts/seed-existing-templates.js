// Script untuk menambahkan template yang sudah ada ke database
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      value = value.replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  });
}

const templateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  thumbnail: String,
  description: String,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const Template = mongoose.models.Template || mongoose.model('Template', templateSchema);

async function seedTemplates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    // Template yang sudah ada di kode
    const existingTemplates = [
      {
        name: "Classic 01",
        slug: "classic-01",
        thumbnail: "/thumbnails/classic-01.jpg",
        description: "Template klasik sederhana dengan desain elegan dan profesional",
        isActive: true
      },
      {
        name: "Wedding 01",
        slug: "wedding-01",
        thumbnail: "/thumbnails/wedding-01.jpg",
        description: "Template modern dengan animasi dan komponen lengkap",
        isActive: true
      },
      {
        name: "Elegant Floral",
        slug: "elegant-floral",
        thumbnail: "/thumbnails/elegant-floral.jpg",
        description: "Template elegan dengan sentuhan floral yang indah",
        isActive: true
      },
      {
        name: "Elegant 02",
        slug: "elegant-02",
        thumbnail: "/thumbnails/elegant-02.jpg",
        description: "Template mewah dengan musik, lace border, dan animasi smooth scroll",
        isActive: true
      }
    ];

    console.log('Adding existing templates to database...\n');

    for (const templateData of existingTemplates) {
      const existing = await Template.findOne({ slug: templateData.slug });
      
      if (existing) {
        console.log(`⚠️  Template "${templateData.name}" sudah ada di database`);
      } else {
        const newTemplate = await Template.create(templateData);
        console.log(`✅ Added: ${newTemplate.name} (${newTemplate.slug})`);
      }
    }

    // Show all templates
    console.log('\n📋 Semua template yang tersedia:');
    const allTemplates = await Template.find({ isActive: true }).sort({ createdAt: 1 });
    allTemplates.forEach((t, index) => {
      console.log(`  ${index + 1}. ${t.name} (${t.slug})`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

seedTemplates();
