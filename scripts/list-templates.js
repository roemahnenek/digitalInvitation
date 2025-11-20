// Script untuk melihat semua template di database
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

async function listTemplates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB\n');

    const templates = await Template.find({}).sort({ createdAt: -1 });
    
    console.log(`📋 Total templates: ${templates.length}\n`);
    
    templates.forEach((t, index) => {
      console.log(`${index + 1}. ${t.name}`);
      console.log(`   Slug: ${t.slug}`);
      console.log(`   Status: ${t.isActive ? '✅ Active' : '❌ Inactive'}`);
      console.log(`   Created: ${t.createdAt.toLocaleString('id-ID')}`);
      console.log('');
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.connection.close();
  }
}

listTemplates();
