# Audit & Peta Folder Proyek `portoso`

Dibuat setelah perapian struktur folder. Dokumen ini merangkum **semua isi folder**, apa yang berjalan, apa yang tidak, serta rekomendasi: diperbaiki, dihapus, atau disimpan.

---

## 1. Ringkasan Proyek

| Item | Keterangan |
| --- | --- |
| Nama | `portoso` (portofolio pribadi "fathurVoid") |
| Stack | React 19 + Vite 8 + ESLint 10 |
| Dependensi utama | `motion`, `ogl`, `three`, `vgpu` |
| Dependensi visual | Font Awesome via CDN (di `index.html`) |
| Sumber gambar | `src/assets/images/formal.jpeg`, `public/favicon.png` |
| Status build | ✅ Berhasil (`npm run build`) |
| Status lint | ❌ Gagal (4 error, lihat bagian 4) |
| Status test | ⚠️ Tidak ada test otomatis / belum ada repo Git di folder ini |

---

## 2. Struktur Setelah Dirapikan

```text
portoso/
├── public/
│   └── favicon.png                     # ikon tab + sumber logo ElectricLogo
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── formal.jpeg             # foto profil
│   ├── components/
│   │   ├── DecryptedText/
│   │   │   └── DecryptedText.jsx       # efek teks dekripsi (dipakai loading screen)
│   │   ├── ElectricLogo/
│   │   │   ├── ElectricLogo.jsx        # logo listrik WebGL (dipakai di halaman utama)
│   │   │   └── ElectricLogo.css
│   │   ├── ShapeWaves/
│   │   │   ├── ShapeWaves.jsx          # latar partikel WebGPU (dipakai loading screen)
│   │   │   └── ShapeWaves.css
│   │   ├── TechText/
│   │   │   ├── TechText.jsx            # teks outline interaktif (dipakai loading screen)
│   │   │   └── TechText.css            # ⚠️ tidak di-import (lihat bagian 5)
│   │   └── optional/
│   │       ├── CRTWarp/
│   │       │   ├── CRTWarp.jsx         # efek CRT/Three.js (tidak dipakai)
│   │       │   └── CRTWarp.css
│   │       └── MoltenMetal/
│   │           ├── MoltenMetal.jsx     # efek logam cair/WebGL (tidak dipakai)
│   │           └── MoltenMetal.css
│   ├── styles/
│   │   ├── index.css                   # global: smooth scroll
│   │   └── App.css                     # layout halaman, tabel, header, footer
│   ├── App.jsx                         # komponen utama + state loading 3,5 detik
│   └── main.jsx                        # entry point React
├── index.html                          # HTML shell + CDN Font Awesome
├── package.json                        # scripts & dependency
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── .gitignore
├── README.md                           # ⚠️ masih template bawaan Vite
├── AUDIT_FOLDER.md                     # ← file ini
└── dist/                               # hasil build (generated, sudah di-gitignore)
```

### Perubahan perapian yang sudah dilakukan
- Memindahkan komponen dari `src/assets/components/` ke `src/components/<Nama>/`, CSS ikut bersatu dengan komponennya.
- Komponen yang tidak dipakai (`CRTWarp`, `MoltenMetal`) dipindahkan ke `src/components/optional/`, bukan dihapus.
- Foto profil dipindahkan ke `src/assets/images/formal.jpeg`.
- CSS global dipindahkan ke `src/styles/`.
- Semua import di `App.jsx` dan `main.jsx` diperbarui.
- Kode mati (komentar import dan blok JSX `CRTWarp` yang tidak aktif) dihapus dari `App.jsx`.
- Build dijalankan ulang setelah perapian: **berhasil**.

---

## 3. Apa yang Berjalan

| Fitur | Lokasi | Catatan |
| --- | --- | --- |
| Dev server | `npm run dev` | Vite menyajikan aplikasi dengan HMR |
| Build produksi | `npm run build` | ✅ 581 modul, output ~610 kB JS (warning chunk >500 kB) |
| Preview build | `npm run preview` | Menyajikan hasil `dist/` |
| Loading screen 3,5 detik | `src/App.jsx:14-21` | `setTimeout` mengubah `isLoading` menjadi `false` |
| Latar loading | `ShapeWaves` | Membutuhkan WebGPU (`vgpu`) |
| Teks "fathurVoid" beroutline | `TechText` | Canvas 2D, interaktif (hover/drag) |
| Teks terminal dekripsi | `DecryptedText` | `animateOn="view"`, tiga baris teks |
| Logo listrik respondif mouse | `ElectricLogo` | WebGL2 via `ogl`, klik memicu pulse |
| Halaman Profil / Akademik / Contact | `src/App.jsx` | Tabel 7 mata kuliah, ikon kontak, footer © 2026 |
| Smooth scrolling | `src/styles/index.css` | `html { scroll-behavior: smooth }` |

---

## 4. Apa yang Tidak Berjalan / Bermasalah

### 4.1 Lint gagal (4 error)
Perintah `npm run lint` mengembalikan error:

1. **`src/components/DecryptedText/DecryptedText.jsx:347`** — `setState` dipanggil langsung di dalam `useEffect` (`encryptInstantly()`, `setDisplayText`, `setIsDecrypted`). Berisiko menyebabkan *cascading renders*.
2. **`src/components/ElectricLogo/ElectricLogo.jsx:637`** — assignment `traced = null` di blok `catch` tidak terpakai (`no-useless-assignment`).
3. **`src/components/ShapeWaves/ShapeWaves.jsx:306`** — `settingsRef.current = {...}` ditulis saat render (`react-hooks/refs`).
4. **`src/components/ShapeWaves/ShapeWaves.jsx:333`** — `onErrorRef.current = onError` juga ditulis saat render.

### 4.2 Masalah fungsional / visual
- **Navigasi kosong** — `src/App.jsx:159-161`: `<a href="#profil"></a>`, `<a href="#jadwal"></a>`, `<a href="#contact"></a>` tidak memiliki teks/ikon, jadi tautannya tidak terlihat.
- **WebGPU belum ada fallback** — `ShapeWaves` memakai `vgpu.init()`. Jika browser tidak mendukung WebGPU, komponen gagal silently karena `onError` tidak diberikan dari `App.jsx`.
- **Kemungkinan logo utama tidak terlihat** — `src/App.jsx:132` memberi `height: 100%` pada wrapper `ElectricLogo`, sementara induknya (#root) hanya punya `min-height`, bukan `height` eksplisit. Container bisa berukuran 0 tinggi.
- **Ikon kontak bergantung CDN** — Font Awesome dimuat dari `cdnjs.cloudflare.com`; tanpa internet ikon email/Instagram/GitHub kosong.
- **Bundle besar** — chunk JS ~610 kB memicu peringatan Vite; belum ada code splitting / lazy loading.
- **Tidak ada automated test** dan folder ini **bukan repository Git** (tidak ada riwayat perubahan).
- **Environment PowerShell** — menjalankan `npm run ...` langsung gagal karena execution policy memblokir `npm.ps1`. Gunakan `cmd /c npm run ...` (seperti yang dipakai saat verifikasi) atau ubah execution policy.

---

## 5. Mana yang Harus Dibenarkan (Prioritas)

| Prioritas | File | Tindakan |
| --- | --- | --- |
| Tinggi | `src/App.jsx:159-161` | Isi label navigasi, mis. `Profil`, `Akademik`, `Kontak`, atau tambahkan ikon + `aria-label`. |
| Tinggi | `src/components/DecryptedText/DecryptedText.jsx:345-354` | Hilangkan `setState` dari effect: inisialisasi state dari prop (`animateOn`, `text`) atau pakai pola *adjust state during render* dengan perbandingan prop sebelumnya. |
| Tinggi | `src/components/ShapeWaves/ShapeWaves.jsx:306-333` | Pindahkan penulisan `settingsRef.current` dan `onErrorRef.current` ke `useEffect` tanpa dependency yang dijalankan setelah render (pastikan effect ini didefinisikan sebelum effect yang memakainya). |
| Tinggi | `src/components/ShapeWaves/ShapeWaves.jsx` + `src/App.jsx` | Teruskan `onError` dari `App.jsx` dan tampilkan fallback statis bila WebGPU tidak tersedia. |
| Sedang | `src/components/ElectricLogo/ElectricLogo.jsx:637-642` | Hilangkan assignment `traced = null` di `catch`, atau kembalikan lebih awal dari `onload`. |
| Sedang | `src/App.jsx:132` | Beri tinggi eksplisit pada wrapper `ElectricLogo` (mis. `position: fixed; inset: 0; zIndex: 0`) agar latar tidak collapses. |
| Sedang | `src/components/TechText/TechText.jsx:58,663-684` | Komponen ini tidak mengimpor `TechText.css` dan tidak memakai `className`; pilih salah satu: hapus CSS-nya atau pasang kembali `className="tech-text"` + `<canvas className="tech-text-canvas">`. |
| Sedang | `README.md` | Ganti template Vite dengan dokumentasi proyek yang sebenarnya (cara jalan, struktur, fitur). |
| Rendah | `vite.config.js` | Tambahkan code splitting/`manualChunks` atau lazy import untuk komponen WebGL berat. |
| Rendah | `index.html` | Pertimbangkan self-host Font Awesome agar tidak bergantung internet. |

---

## 6. Mana yang Harus Dihapus

| Target | Alasan | Aman dihapus sekarang? |
| --- | --- | --- |
| `dist/` | Hasil build yang di-generate ulang; sudah masuk `.gitignore`. Bisa dihapus kapan saja lalu di-build lagi. | ✅ Ya |
| `src/components/TechText/TechText.css` | Tidak di-import; `TechText.jsx` memakai inline style. | ✅ Ya (kecuali ingin memakai class CSS) |
| `src/components/optional/CRTWarp/*` | Tidak pernah dipakai; kode aktifnya sudah dihapus dari `App.jsx`. | ⚠️ Hanya jika efek CRT tidak akan dipakai |
| `src/components/optional/MoltenMetal/*` | Tidak pernah di-import sama sekali. | ⚠️ Hanya jika efek molten metal tidak akan dipakai |
| Komentar mati di `App.jsx` | Sudah dibersihkan saat perapian. | ✅ Sudah dilakukan |
| Isi `README.md` bawaan Vite | Tidak relevan dengan proyek. | ✅ Ya, diganti dokumentasi baru |

> Catatan: `optional/` sengaja dipertahankan agar efek eksperimen tidak hilang. Jika diputuskan tidak diperlukan, hapus folder tersebut dan uninstall `three` jika tidak ada komponen lain yang memakainya.

---

## 7. Mana yang Harus Disimpan

| File/Folder | Alasan |
| --- | --- |
| `src/App.jsx`, `src/main.jsx` | Entry dan logika utama aplikasi. |
| `src/components/DecryptedText/*`, `ElectricLogo/*`, `ShapeWaves/*`, `TechText/*` | Empat komponen yang benar-benar dipakai. |
| `src/assets/images/formal.jpeg` | Foto profil di bagian Profile. |
| `src/styles/index.css`, `src/styles/App.css` | Styling global dan halaman. |
| `public/favicon.png` | Ikon tab sekaligus sumber gambar `ElectricLogo`. |
| `index.html` | HTML shell, metadata, dan Font Awesome CDN. |
| `package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.js`, `.gitignore` | Konfigurasi build, dependency, dan lint. |
| `AUDIT_FOLDER.md` | Dokumen ini — dipakai sebagai acuan perawatan berikutnya. |

---

## 8. Cara Menjalankan (di mesin ini)

```powershell
# Install dependency
cmd /c npm install

# Development server
cmd /c npm run dev

# Build produksi
cmd /c npm run build

# Preview hasil build
cmd /c npm run preview

# Cek lint (saat ini masih gagal — lihat bagian 4.1)
cmd /c npm run lint
```

---

## 9. Kesimpulan Singkat

Struktur folder sudah rapi dan build masih hijau. Yang paling mendesak bukan struktur, melainkan **4 error lint**, **tautan navigasi yang kosong**, dan **fallback untuk WebGPU**. Komponen eksperimen (`CRTWarp`, `MoltenMetal`) sudah diasingkan ke `src/components/optional/` agar tidak mengganggu, tetapi belum dihapus — keputusan akhir ada di bagian 6.
