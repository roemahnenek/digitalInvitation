# Hero Section Customization

Setiap template sekarang dapat memiliki tampilan cover/hero section yang berbeda-beda.

## Cara Kerja

1. Setiap template mendefinisikan konfigurasi `heroSection` sebagai property static
2. `TemplateRenderer` membaca konfigurasi ini dan menerapkannya pada `InvitationCover`
3. Jika template tidak memiliki konfigurasi, akan menggunakan default (rose theme)

## Struktur Konfigurasi

```javascript
TemplateComponent.heroSection = {
  // Background
  background: "gradient",
  gradientColors: "from-rose-50 via-white to-rose-100",

  // Decorative elements (icons yang melayang)
  decorativeElements: [
    {
      icon: "❀",
      position: "top-10 left-10",
      size: "text-6xl",
      color: "text-rose-200",
      delay: "0s",
    },
    {
      icon: "✿",
      position: "top-20 right-16",
      size: "text-5xl",
      color: "text-rose-200",
      delay: "0.5s",
    },
    // ...
  ],

  // Icon & warna
  topIcon: "❁",
  topIconColor: "text-rose-400",

  // Title
  title: "THE WEDDING OF",
  titleColor: "text-rose-900",

  // Nama pengantin
  nameColor: "text-rose-600",

  // Divider (pembatas antara nama)
  dividerColor: "bg-rose-300",
  dividerIcon: "❀",
  dividerIconColor: "text-rose-400",

  // Teks undangan
  invitationText: "Dengan penuh sukacita, kami mengundang Anda",
  invitationSubtext: "untuk berbagi kebahagiaan di hari istimewa kami",
  invitationTextColor: "text-gray-600",
  invitationSubtextColor: "text-gray-500",

  // Tombol
  buttonColor: "bg-rose-500 hover:bg-rose-600",
  buttonGradient: "from-rose-600 to-pink-600",

  // Card tamu
  guestCardBg: "bg-white/60",
  guestCardBorder: "border-rose-200",
  guestCardTextColor: "text-rose-800",
  guestLabelColor: "text-rose-700",

  // Bottom icon
  bottomIcon: "❁",
  bottomIconColor: "text-rose-400",
};
```

## Template yang Tersedia

### 1. Classic01

- **Theme**: Amber/Gold
- **Icon**: ✦ ✧
- **Warna**: Warm amber tones
- **Style**: Klasik elegan

### 2. ElegantFloral

- **Theme**: Rose/Pink
- **Icon**: ❀ ✿ ❁
- **Warna**: Soft rose pink
- **Style**: Floral modern

### 3. Wedding01

- **Theme**: Slate/Gray
- **Icon**: ◆ ◇
- **Warna**: Professional slate
- **Style**: Minimalis modern

## Menambahkan Template Baru

1. Buat file template baru di `templates/`
2. Definisikan konfigurasi `heroSection`
3. Attach ke component:

```javascript
function MyTemplate({ data, guestName }) {
  // ... component code
}

// Attach hero config
MyTemplate.heroSection = {
  // ... konfigurasi hero
};

export default MyTemplate;
```

4. Daftarkan di `TemplateRenderer.jsx`:

```javascript
if (template_code === "my-template") {
  TemplateComponent = MyTemplate;
}
```

## Customization Tips

- Gunakan Tailwind CSS classes untuk styling
- Icon bisa berupa emoji atau karakter Unicode
- `decorativeElements` array untuk icon yang melayang di background
- Semua field bersifat opsional, akan fallback ke default jika tidak didefinisikan
- Gunakan warna yang konsisten dengan tema template utama
