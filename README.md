# Portfolio Design Showcase — Zhilan

Showcase karya desain grafis, ilustrasi, dan identitas visual yang dibangun dengan gaya Neumorphism minimalis dan tipografi edgy.

## Struktur File
- `index.html` : Struktur dasar antarmuka
- `css/style.css` : Styling khusus Neumorphism broken white & soft blue
- `js/works-data.js` : Data daftar karya
- `js/main.js` : Sistem filter dan rendering interaktif

## Cara Update Karya Baru
1. Masukkan file gambar baru (`.png` / `.jpg`) ke folder `images/works/`.
2. Buka file `js/works-data.js`, tambahkan objek karya baru di dalam array:
```javascript
{
    id: 7,
    title: "Nama Karya Baru",
    category: "poster", // Pilih: projects, poster, social, illustration, logo, mascot, other
    image: "images/works/karya-baru.jpg"
}