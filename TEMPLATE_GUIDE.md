# Panduan Menambah Template Undangan Baru

## Langkah-langkah Menambah Template Baru

### 1. Buat File Template Baru

Buat file React component baru di folder `templates/`, misalnya `templates/NamaTemplate.jsx`

**Struktur dasar template:**

```jsx
export default function NamaTemplate({ data, guestName }) {
  // Background style dengan fallback
  const backgroundStyle = data.cover
    ? { backgroundImage: `url(${data.cover})` }
    : { background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)' };

  return (
    <div className="font-serif-body">
      {/* Section 1: Hero/Welcome */}
      <div className="min-h-screen" style={backgroundStyle}>
        {guestName && (
          <div>
            <p>Kepada Yth.</p>
            <p>{guestName}</p>
          </div>
        )}
        <h1>{data.bride} & {data.groom}</h1>
        <p>{new Date(data.date).toLocaleDateString('id-ID', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
        <p>{data.location}</p>
      </div>

      {/* Section 2: Couple Info */}
      <div>
        {data.bride_photo_url && (
          <img src={data.bride_photo_url} alt={data.bride} />
        )}
        <h3>{data.bride}</h3>
        
        {data.groom_photo_url && (
          <img src={data.groom_photo_url} alt={data.groom} />
        )}
        <h3>{data.groom}</h3>
      </div>

      {/* Section 3: RSVP */}
      <div>
        <a href="#rsvp">RSVP</a>
      </div>
    </div>
  );
}
```

### 2. Data Props yang Tersedia

Object `data` berisi informasi undangan:
- `data.bride` - Nama mempelai wanita
- `data.groom` - Nama mempelai pria
- `data.date` - Tanggal acara (Date object)
- `data.location` - Lokasi acara
- `data.cover` - URL foto cover (optional)
- `data.bride_photo_url` - URL foto mempelai wanita (optional)
- `data.groom_photo_url` - URL foto mempelai pria (optional)
- `data.slug` - URL slug undangan
- `data.template_code` - Kode template yang digunakan

Props `guestName`:
- Nama tamu undangan (dari query param `?to=Nama`)
- Bisa null jika tidak ada

### 3. Update TemplateRenderer

Edit file `components/TemplateRenderer.jsx`:

**a. Import template baru:**
```jsx
import NamaTemplate from "../templates/NamaTemplate";
```

**b. Tambahkan di mapping template:**
```jsx
let TemplateComponent = null;

if (template_code === "classic-01") {
  TemplateComponent = Classic01;
} else if (template_code === "wedding-01") {
  TemplateComponent = Wedding01;
} else if (template_code === "nama-template") { // Template baru
  TemplateComponent = NamaTemplate;
}
```

### 4. Tambah Data Template ke Database

Gunakan MongoDB Compass atau script untuk menambah document baru di collection `templates`:

```json
{
  "name": "Nama Template",
  "slug": "nama-template",
  "thumbnail": "/thumbnails/nama-template.jpg",
  "description": "Deskripsi template",
  "isActive": true,
  "createdAt": "2025-11-20T00:00:00.000Z"
}
```

**Catatan:** `slug` harus sama dengan `template_code` yang digunakan di TemplateRenderer.

### 5. Tambah Thumbnail (Optional)

Simpan file thumbnail di folder `public/thumbnails/`:
- Ukuran rekomendasi: 400x600px
- Format: JPG/PNG
- Nama file harus sama dengan yang ada di database

### 6. Test Template

Test template dengan cara:
1. Buat undangan baru di halaman `/create`
2. Pilih template baru
3. Isi data undangan
4. Save dan lihat preview

Atau test langsung dengan URL:
```
http://localhost:3000/test-slug?to=Nama%20Tamu
```

## Contoh Template yang Sudah Ada

1. **Classic01** (`classic-01`) - Template klasik sederhana
2. **Wedding01** (`wedding-01`) - Template modern dengan animations
3. **ElegantFloral** (`elegant-floral`) - Template elegan dengan dekorasi floral

## Tips Styling

### Tailwind Classes yang Sering Digunakan:
- Font script: `font-script` (untuk nama pengantin)
- Font body: `font-serif-body`
- Animations: `animate-fade-in`
- Responsive: `sm:text-2xl md:text-4xl lg:text-6xl`

### Color Schemes:
- **Classic**: Gray tones (gray-800, gray-900)
- **Elegant**: Rose/Pink (rose-400, rose-600)
- **Modern**: Colorful gradients

### Layout Best Practices:
1. Gunakan `min-h-screen` untuk full-screen sections
2. Responsive dengan `flex-col sm:flex-row`
3. Padding konsisten: `p-4`, `py-20`
4. Max width untuk readability: `max-w-2xl mx-auto`

## Troubleshooting

### Template tidak muncul?
- Cek spelling `template_code` di database dan TemplateRenderer
- Pastikan import sudah benar
- Lihat console browser untuk error

### Styling tidak muncul?
- Pastikan Tailwind classes valid
- Cek `tailwind.config.js` untuk custom classes
- Jalankan `npm run dev` ulang

### Data tidak tampil?
- Console.log `data` untuk debug
- Cek koneksi database
- Pastikan field name sesuai schema

## Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Next.js Dynamic Imports](https://nextjs.org/docs/advanced-features/dynamic-import)
- [Framer Motion](https://www.framer.com/motion/) - untuk animasi advanced
