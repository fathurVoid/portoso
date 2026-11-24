# fathurVoid — Portfolio

Portfolio pribadi berbasis single-page application dengan tema gelap, aksen merah gelap, dan tipografi monospace berorientasi terminal. Halaman ini memuat profil, jadwal mata kuliah semester saat ini, serta tautan kontak.

## Teknologi

- React 19 + Vite 8 (JavaScript / JSX)
- Motion untuk animasi teks
- OGL untuk efek WebGL pada `ElectricLogo`
- vgpu / WebGPU untuk latar `ShapeWaves`
- Three.js untuk komponen eksperimen opsional
- ESLint 10 + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`
- Font Awesome melalui CDN untuk ikon kontak

Komponen React Bits yang digunakan: `DecryptedText`, `ElectricLogo`, `ShapeWaves`, dan `TechText`.

## Persyaratan

- Node.js 20.19+, 22.12+, atau 24 (sesuai persyaratan Vite 8)
- npm

## Menjalankan proyek

```bash
# Instal dependencies
npm install

# Development server
npm run dev

# Menjalankan ESLint
npm run lint

# Production build (output: dist/)
npm run build

# Meninjau hasil build secara lokal
npm run preview
```

## Struktur direktori utama

```text
portoso/
├── public/
│   └── favicon.png
├── src/
│   ├── assets/images/          # Foto profil
│   ├── components/
│   │   ├── DecryptedText/      # Teks dekripsi bertahap
│   │   ├── ElectricLogo/       # Logo interaktif berbasis WebGL (OGL)
│   │   ├── ShapeWaves/         # Latar partikel WebGPU (vgpu)
│   │   ├── TechText/           # Teks outline kanvas
│   │   └── optional/           # Eksperimen: CRTWarp, MoltenMetal (tidak aktif)
│   ├── styles/                 # CSS global dan stylesheet halaman
│   ├── App.jsx                 # Halaman utama dan state loading
│   └── main.jsx                # Entry point React
├── eslint.config.js
├── vite.config.js
└── index.html
```

## Catatan pengembangan

- Aplikasi tidak menggunakan router; navigasi memakai anchor hash menuju `#profil`, `#jadwal`, dan `#contact`.
- Folder `src/components/optional/` sengaja dipertahankan sebagai ruang eksperimen dan tidak di-import oleh aplikasi utama.
- Jika WebGPU tidak tersedia, `ShapeWaves` gagal dengan aman dan menampilkan fallback gradien gelap tanpa mengganggu halaman.
- Variabel lingkungan lokal sebaiknya disimpan di file `.env` yang sudah diabaikan Git. Jangan menyimpan credential di file yang ikut ter-commit.
