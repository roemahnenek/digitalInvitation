# Database Wedding Invitation Guide

## Overview

Aplikasi undangan pernikahan ini sekarang menggunakan **database MongoDB** untuk menyimpan semua data undangan. Setiap pasangan memiliki data tersendiri yang bisa diakses melalui slug unik.

## Database Schema

Model `Invitation` di `models/Invitation.js` memiliki field-field berikut:

### Basic Info
- `slug` - URL slug unik untuk undangan (contoh: `john-jane-wedding`)
- `brideFullName` - Nama lengkap pengantin wanita
- `groomFullName` - Nama lengkap pengantin pria
- `brideNickname` - Nama panggilan pengantin wanita (opsional)
- `groomNickname` - Nama panggilan pengantin pria (opsional)

### Hero Section
- `heroTitle` - Judul hero (default: "Together with their families")
- `heroSubtitle` - Subjudul hero
- `heroBackground` - URL gambar background hero

### Event Info
- `weddingDate` - Tanggal pernikahan (Date object)
- `weddingDateDisplay` - Tampilan tanggal yang lebih readable
- `venueLocation` - Nama lokasi venue

### Couple Info
- `bridePhoto` - URL foto pengantin wanita
- `brideBio` - Biografi pengantin wanita
- `groomPhoto` - URL foto pengantin pria
- `groomBio` - Biografi pengantin pria
- `coupleStory` - Cerita pertemuan pasangan

### Love Story Timeline
- `loveStory` - Array of objects:
  - `year` - Tahun
  - `title` - Judul moment
  - `description` - Deskripsi moment
  - `image` - URL gambar

### Event Details
- `events` - Array of objects:
  - `icon` - Nama icon (Clock, MapPin, Heart)
  - `title` - Judul event
  - `time` - Waktu
  - `description` - Deskripsi

### Location
- `locationMapUrl` - URL untuk Google Maps directions
- `locationMapEmbed` - URL embed Google Maps
- `locationAddress` - Alamat lengkap venue

### Gallery
- `gallery` - Array of objects:
  - `url` - URL foto
  - `caption` - Caption foto

### Additional Info
- `additionalInfo` - Array of objects:
  - `text` - Informasi tambahan

### Other
- `reminderMessage` - Pesan reminder untuk calendar
- `template_code` - Kode template yang digunakan (default: 'wedding-01')

## Cara Menggunakan

### 1. Menambahkan Data Sample

Jalankan script seed untuk menambahkan data contoh:

```bash
node scripts/seedWedding.js
```

Script ini akan membuat undangan dengan slug `john-jane-wedding`.

### 2. Mengakses Undangan

Buka browser dan akses:

```
http://localhost:3000/john-jane-wedding
```

Atau dengan nama tamu:

```
http://localhost:3000/john-jane-wedding?to=Nama%20Tamu
```

### 3. Membuat Undangan Baru

Ada dua cara:

#### A. Via API (Manual)

Gunakan API POST ke `/api/invitations` dengan data JSON lengkap:

```javascript
const data = {
  slug: 'budi-siti-wedding',
  brideFullName: 'Siti Nurhaliza',
  groomFullName: 'Budi Santoso',
  weddingDate: '2025-09-20',
  venueLocation: 'Gedung Pernikahan Jakarta',
  // ... field lainnya
};

fetch('/api/invitations', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

#### B. Via Seed Script (Recommended)

1. Copy file `scripts/seedWedding.js`
2. Ubah `sampleData` dengan data pasangan baru
3. Ganti slug dengan yang unik
4. Run: `node scripts/seedWedding.js`

### 4. Mengupdate Data Existing

Edit data di `scripts/seedWedding.js` dan run lagi. Script akan otomatis update jika slug sudah ada.

## Struktur Component yang Sudah Terintegrasi

Semua component di `components/wedding/` sudah menerima props `data` dari database:

- ✅ **Hero** - Nama pasangan, hero title, subtitle, background
- ✅ **CoupleInfo** - Foto, bio, dan cerita pasangan
- ✅ **LoveStory** - Timeline love story
- ✅ **EventDetails** - Detail acara dan informasi tambahan
- ✅ **LocationMap** - Map embed dan alamat
- ✅ **Gallery** - Foto-foto galeri
- ✅ **Reminder** - Add to calendar dengan data dinamis
- ✅ **Footer** - Nama pasangan dinamis

## Default Values

Setiap field memiliki default value sebagai fallback. Jika data tidak ada di database, akan menggunakan data default (Sarah & Michael).

## Tips

1. **Slug harus unik** - Setiap undangan harus punya slug yang berbeda
2. **Upload foto ke Cloudinary** - Gunakan Cloudinary untuk host foto, lalu simpan URL-nya
3. **Format tanggal** - Gunakan format ISO untuk `weddingDate`
4. **Icon names** - Untuk events, gunakan: 'Clock', 'MapPin', atau 'Heart'
5. **Google Maps Embed** - Dapatkan embed URL dari Google Maps

## Contoh Data Lengkap

Lihat file `scripts/seedWedding.js` untuk contoh data lengkap yang bisa di-customize.

## Troubleshooting

### Data tidak muncul
- Cek koneksi MongoDB di `.env.local`
- Pastikan slug di URL benar
- Cek browser console untuk error

### Gambar tidak muncul
- Pastikan URL gambar valid
- Gunakan absolute URL atau upload ke Cloudinary

### Database error
- Pastikan MongoDB URI benar
- Check MongoDB connection di Atlas atau local

## Next Steps

Untuk production:
1. Upload semua foto ke Cloudinary
2. Buat admin panel untuk manage data (opsional)
3. Set template_code ke 'wedding-01' untuk menggunakan Wedding01 template
4. Deploy ke Vercel atau hosting lain
