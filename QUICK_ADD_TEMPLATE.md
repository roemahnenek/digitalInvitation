# Quick Guide: Menambah Template Baru

## 🚀 Langkah Cepat (5 Menit)

### 1. Buat File Template
```bash
# Buat file baru di folder templates/
templates/NamaTemplateBaru.jsx
```

### 2. Copy Template Structure
```jsx
export default function NamaTemplateBaru({ data, guestName }) {
  return (
    <div>
      {/* Hero Section */}
      <div className="min-h-screen">
        <h1>{data.bride} & {data.groom}</h1>
        <p>{new Date(data.date).toLocaleDateString('id-ID')}</p>
      </div>
      
      {/* Couple Info */}
      <div>
        <img src={data.bride_photo_url} alt={data.bride} />
        <img src={data.groom_photo_url} alt={data.groom} />
      </div>
      
      {/* RSVP */}
      <a href="#rsvp">RSVP</a>
    </div>
  );
}
```

### 3. Update TemplateRenderer.jsx
```jsx
// Import
import NamaTemplateBaru from "../templates/NamaTemplateBaru";

// Mapping (line ~44)
} else if (template_code === "nama-template-baru") {
  TemplateComponent = NamaTemplateBaru;
}
```

### 4. Tambah ke Database
Edit `scripts/add-template.js`:
```javascript
const newTemplate = {
  name: "Nama Template Baru",
  slug: "nama-template-baru", // HARUS sama dengan template_code
  thumbnail: "/thumbnails/nama-template-baru.jpg",
  description: "Deskripsi template",
  isActive: true
};
```

Jalankan:
```bash
node scripts/add-template.js
```

### 5. Test
```
http://localhost:3000/[slug-undangan]
```

## 📝 Checklist

- [ ] File template dibuat di `templates/`
- [ ] Import template di `TemplateRenderer.jsx`
- [ ] Tambah mapping `template_code` di `TemplateRenderer.jsx`
- [ ] Edit `scripts/add-template.js` dengan data template
- [ ] Jalankan `node scripts/add-template.js`
- [ ] (Optional) Tambah thumbnail di `public/thumbnails/`
- [ ] Test di browser

## 🎨 Props yang Tersedia

```javascript
data.bride           // Nama mempelai wanita
data.groom           // Nama mempelai pria
data.date            // Tanggal acara
data.location        // Lokasi acara
data.cover           // URL foto cover
data.bride_photo_url // URL foto mempelai wanita
data.groom_photo_url // URL foto mempelai pria
data.slug            // URL slug
guestName            // Nama tamu (dari ?to=)
```

## 💡 Tips
- Copy dari template yang sudah ada (Classic01, ElegantFloral)
- Gunakan Tailwind CSS untuk styling
- Buat responsive dengan `sm:`, `md:`, `lg:`
- Test dengan data yang lengkap dan kosong

Lihat `TEMPLATE_GUIDE.md` untuk dokumentasi lengkap!
