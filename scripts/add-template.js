// Script untuk menambah template baru ke database
// Usage: node scripts/add-template.js

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      // Remove quotes if present
      value = value.replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  });
}

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

async function addTemplate() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Data template baru - EDIT SESUAI KEBUTUHAN
    const newTemplate = {
      name: "Elegant Floral",
      slug: "elegant-floral",
      thumbnail: "/thumbnails/elegant-floral.jpg",
      description: "Template elegan dengan dekorasi floral untuk pernikahan yang romantic",
      isActive: true
    };

    // Cek apakah template sudah ada
    const existing = await Template.findOne({ slug: newTemplate.slug });
    if (existing) {
      console.log(`❌ Template dengan slug "${newTemplate.slug}" sudah ada!`);
      console.log('Existing template:', existing);
      return;
    }

    // Insert template baru
    const result = await Template.create(newTemplate);
    console.log('✅ Template berhasil ditambahkan!');
    console.log(result);

    // Tampilkan semua template
    const allTemplates = await Template.find({});
    console.log('\n📋 Semua template yang tersedia:');
    allTemplates.forEach(t => {
      console.log(`  - ${t.name} (${t.slug}) - ${t.isActive ? '✅ Active' : '❌ Inactive'}`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
  }
}

// Jalankan script
addTemplate();
