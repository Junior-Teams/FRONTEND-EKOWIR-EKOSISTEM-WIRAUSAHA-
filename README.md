# Ekowir — Ekosistem Wirausaha 🌱

**Ekowir** adalah platform pembelajaran berbasis web yang menggabungkan teknologi dan pendidikan untuk meningkatkan **literasi koperasi di Indonesia**. Ekowir memberdayakan individu untuk menjadi pengelola koperasi yang lebih baik dan mendorong pertumbuhan ekonomi berbasis komunitas.

Repository ini adalah **frontend** dari aplikasi Ekowir, dibangun untuk kebutuhan hackathon.

Berikut adalah link repository **backend** dari aplikasi ekowir dan dokumentasi nya. - [BACKEND-EKOWIR](https://github.com/Junior-Teams/Backend-Ekowir)

## 🎯 Tema yang Diusung — TEMA 4

> **"Peningkatan Literasi dan Minat Generasi Z dan Generasi Alpha terhadap Koperasi"**

Ekowir dibangun untuk mendukung **pilar ke-4** hackathon ini.

### Latar Belakang & Problem Statement

Generasi muda merupakan penggerak ekonomi masa depan, namun tingkat pemahaman dan minat terhadap koperasi masih relatif rendah dibandingkan perkembangan teknologi dan ekonomi digital saat ini. Diperlukan pendekatan baru yang lebih relevan dengan karakteristik generasi digital agar koperasi menjadi lebih **menarik, modern, dan mudah dipahami**.

> **Bagaimana teknologi dapat meningkatkan literasi, pemahaman, dan minat Generasi Z serta Generasi Alpha terhadap koperasi?**

### Bagaimana Ekowir Menjawab Tantangan Ini

Ekowir mengombinasikan tiga contoh solusi yang direkomendasikan tema ini dalam satu platform:

| Contoh Solusi (Tema 4) | Implementasi di Ekowir |
|---|---|
| **Gamified Cooperative Learning Platform** | XP, badge, tier, leaderboard, dan **redeem hadiah** — setiap aktivitas belajar dan berdiskusi menghasilkan poin yang bisa ditukar reward nyata |
| **Digital Cooperative Academy** | Course terstruktur: modul → materi (rich text + video) → quiz dengan passing grade, lengkap dengan riwayat belajar |
| **Social Engagement Platform** | Forum diskusi antar anggota dengan insentif XP untuk saling berinteraksi, membangun komunitas belajar koperasi |

Jawaban Ekowir atas **challenge questions** Tema 4:

- **Mengapa generasi muda kurang tertarik terhadap koperasi?** — Karena pendekatan edukasi koperasi selama ini belum berbicara dengan bahasa generasi digital. Ekowir menghadirkannya dalam pengalaman yang familiar bagi Gen Z & Alpha: tampilan modern, interaktif, dan game-like.
- **Bagaimana menjadikan koperasi lebih relevan bagi generasi digital?** — Materi koperasi dikemas sebagai course digital yang ringkas dengan quiz interaktif, bukan teks panjang satu arah.
- **Bagaimana memanfaatkan gamifikasi untuk edukasi koperasi?** — Sistem XP → tier → badge → leaderboard → redeem hadiah menciptakan loop motivasi berkelanjutan; berdiskusi di forum pun diberi poin.
- **Bagaimana meningkatkan jumlah anggota muda dalam koperasi?** — Literasi yang menyenangkan menumbuhkan minat; forum komunitas menjaga keterlibatan — keduanya menjadi pintu masuk generasi muda ke ekosistem koperasi.

### Dampak yang Diharapkan

**Meningkatnya literasi, pemahaman, dan keterlibatan Generasi Z dan Generasi Alpha dalam ekosistem koperasi** — selaras dengan expected outcome Tema 4.

## ✨ Fitur Utama

- **Autentikasi** — Register/login manual dan login dengan Google (OAuth).
- **Belajar** — Daftar course, pilih modul, pelajari materi, lalu kerjakan quiz.
- **Gamifikasi** — Dapatkan **XP dan badge** setiap kali lulus quiz.
- **Leaderboard** — Papan peringkat pengguna berdasarkan XP.
- **Forum** — Lihat daftar thread, buat thread baru, buka thread, dan tambahkan komentar.
- **Redeem Reward** — Tukarkan poin/XP dengan reward yang tersedia.
- **Profil** — Kelola data diri dan lihat riwayat course.
- **Dashboard Admin** — Kelola modul, materi (rich text editor), quiz & pertanyaan, pengguna, dan reward.

## 🔀 Flowchart

Berikut adalah **flowchart dari project ini** yang menggambarkan alur pengguna di aplikasi Ekowir:

![Flowchart Ekowir](./public/assets/docs/Ekowir%20-flowchart-2.png)

Penjelasan alur:

1. **Start → Register/Login → Authentication** — Pengguna mendaftar atau login. Jika autentikasi gagal, pengguna diarahkan kembali ke proses autentikasi; jika berhasil, pengguna masuk ke **Beranda**.
2. Dari **Beranda**, pengguna dapat mengakses empat menu utama: **Belajar**, **Leaderboard**, **Forum**, dan **Profile**.
3. **Alur Belajar** — Daftar course → pilih course → pilih modul → belajar materi → kerjakan **Quiz**. Jika belum lulus (passing), pengguna dapat mengulang quiz. Jika lulus, pengguna mendapatkan **XP + Badge**.
4. **Alur Forum** — Lihat forum → thread list → buat thread baru (create thread) atau buka thread yang sudah ada dan tambahkan komentar (add comment).
5. **Logout → End** — Pengguna keluar dari aplikasi.

## 🛠️ Tech Stack

| Kategori | Teknologi | Keterangan |
|---|---|---|
| Framework | [React 19](https://react.dev) | Library UI utama, dengan **React Compiler** aktif |
| Build Tool | [Vite 8](https://vite.dev) | Dev server & bundler dengan HMR |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) | Utility-first CSS dan komponen UI (clsx, tailwind-merge, CVA, tw-animate-css) |
| Routing | [React Router 7](https://reactrouter.com) | Routing SPA (public, dashboard, admin) |
| Data Fetching | [TanStack React Query 5](https://tanstack.com/query) + [Axios](https://axios-http.com) | State server, caching, dan HTTP client |
| Form | [React Hook Form](https://react-hook-form.com) | Manajemen form & validasi |
| Rich Text Editor | [TipTap 3](https://tiptap.dev) | Editor materi di dashboard admin (table & YouTube embed) |
| Chart | [Recharts 3](https://recharts.org) | Visualisasi data di dashboard |
| Lainnya | react-select, react-hot-toast, lucide-react | Select dengan pencarian, notifikasi toast, dan ikon |
| Font | Plus Jakarta Sans | Via `@fontsource-variable` |
| Linting | ESLint 10 | Dengan plugin react-hooks & react-refresh |

> Backend Ekowir dibangun terpisah menggunakan **Go** dan diakses melalui REST API.

## 🚀 Cara Clone & Menjalankan Project Secara Lokal

### Prasyarat

- [Node.js](https://nodejs.org) versi 20 atau lebih baru
- npm (sudah termasuk dalam Node.js)

### Langkah-langkah

1. **Clone repository ini**

   ```bash
   git clone git@github.com:Junior-Teams/FRONTEND-EKOWIR-EKOSISTEM-WIRAUSAHA-.git
   cd FRONTEND-EKOWIR-EKOSISTEM-WIRAUSAHA-
   ```

   Atau menggunakan HTTPS:

   ```bash
   git clone https://github.com/Junior-Teams/FRONTEND-EKOWIR-EKOSISTEM-WIRAUSAHA-.git
   cd FRONTEND-EKOWIR-EKOSISTEM-WIRAUSAHA-
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Konfigurasi environment variable**

   Buat file `.env` di root project dan isi dengan URL backend API:

   ```env
   VITE_HOST_API=http://localhost:8080
   ```

   > Sesuaikan nilainya dengan alamat backend Ekowir yang sedang berjalan.

4. **Jalankan development server**

   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173` (default Vite).

### Script Lainnya

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan development server dengan HMR |
| `npm run build` | Build aplikasi untuk production |
| `npm run preview` | Preview hasil build production secara lokal |
| `npm run lint` | Menjalankan ESLint |

## 📁 Struktur Project (Ringkas)

```
src/
├── components/     # Komponen UI (homepage, charts, materi, ui, dll.)
├── hooks/          # Custom hooks per fitur (auth, belajar, forum, admin, dll.)
├── lib/            # Utilitas & konfigurasi (current-user, tiptap-extensions, dll.)
├── routes/         # Halaman (home, auth, dashboard, admin)
├── styles/         # Style tambahan
├── utils/          # Axios instance & helper
└── router.jsx      # Definisi routing aplikasi
```

---

Dibuat dengan 💚 oleh **Junior Teams** untuk hackathon.
