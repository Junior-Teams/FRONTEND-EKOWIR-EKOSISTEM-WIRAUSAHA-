import {
  HandCoins,
  Landmark,
  PiggyBank,
  Scale,
  ShieldCheck,
  Smartphone,
  Store,
  Users,
} from "lucide-react"

export const LEVELS = ["Semua", "Pemula", "Menengah", "Lanjutan"]

export const LEVEL_BADGE = {
  Pemula: "bg-eko-tertiary",
  Menengah: "bg-eko-secondary",
  Lanjutan: "bg-red-300 dark:bg-red-500/70",
}

const PLACEHOLDER_IMAGES = [
  "/assets/placeholder/promo-image.1762971964.png",
  "/assets/placeholder/promo-image.1762972035.png",
]

export function getModuleImage(id) {
  return PLACEHOLDER_IMAGES[id % PLACEHOLDER_IMAGES.length]
}

export const MODULES = [
  {
    id: 1,
    title: "Dasar-Dasar Koperasi",
    description:
      "Kenali prinsip, jenis, dan nilai-nilai dasar koperasi sebagai badan usaha berbasis kekeluargaan.",
    level: "Pemula",
    icon: Landmark,
    color: "bg-amber-100 dark:bg-amber-950",
    materials: [
      "Pengertian dan Sejarah Koperasi",
      "Prinsip-Prinsip Koperasi",
      "Jenis-Jenis Koperasi di Indonesia",
      "Nilai dan Landasan Hukum Koperasi",
      "Peran Koperasi dalam Perekonomian",
      "Perbedaan Koperasi dengan Badan Usaha Lain",
    ],
  },
  {
    id: 2,
    title: "Simpan Pinjam & Perhitungan Bunga",
    description:
      "Pelajari mekanisme simpanan, pinjaman, dan perhitungan bunga yang adil bagi anggota koperasi.",
    level: "Pemula",
    icon: PiggyBank,
    color: "bg-sky-100 dark:bg-sky-950",
    materials: [
      "Konsep Simpanan Pokok, Wajib, dan Sukarela",
      "Mekanisme Pengajuan Pinjaman Anggota",
      "Perhitungan Bunga Flat vs Menurun",
      "Analisis Kelayakan Pinjaman",
      "Mitigasi Risiko Kredit Macet",
    ],
  },
  {
    id: 3,
    title: "Manajemen Keuangan Koperasi",
    description:
      "Susun laporan keuangan, kelola arus kas, dan bagi Sisa Hasil Usaha (SHU) secara transparan.",
    level: "Menengah",
    icon: HandCoins,
    color: "bg-emerald-100 dark:bg-emerald-950",
    materials: [
      "Dasar Akuntansi Koperasi",
      "Menyusun Neraca dan Laba Rugi",
      "Pengelolaan Arus Kas",
      "Menghitung dan Membagi SHU",
      "Audit Internal Koperasi",
      "Perpajakan bagi Koperasi",
      "Anggaran dan Perencanaan Keuangan",
      "Studi Kasus Laporan Keuangan Koperasi",
    ],
  },
  {
    id: 4,
    title: "Tata Kelola & Organisasi",
    description:
      "Bangun struktur pengurus, pengawas, dan rapat anggota yang sehat dan akuntabel.",
    level: "Menengah",
    icon: Users,
    color: "bg-pink-100 dark:bg-pink-950",
    materials: [
      "Struktur Pengurus dan Pengawas",
      "Rapat Anggota Tahunan (RAT)",
      "Pengambilan Keputusan yang Akuntabel",
      "Etika dan Kepemimpinan Koperasi",
    ],
  },
  {
    id: 5,
    title: "Hukum & Regulasi Koperasi",
    description:
      "Pahami dasar hukum, perizinan, dan kepatuhan koperasi terhadap regulasi pemerintah.",
    level: "Menengah",
    icon: Scale,
    color: "bg-violet-100 dark:bg-violet-950",
    materials: [
      "Undang-Undang Perkoperasian",
      "Proses Pendirian dan Badan Hukum",
      "Perizinan Usaha Simpan Pinjam",
      "Kepatuhan terhadap OJK dan Kemenkop",
      "Sengketa dan Penyelesaian Hukum Koperasi",
    ],
  },
  {
    id: 6,
    title: "Digitalisasi Layanan Koperasi",
    description:
      "Manfaatkan aplikasi dan sistem digital untuk mempermudah pencatatan dan layanan anggota.",
    level: "Lanjutan",
    icon: Smartphone,
    color: "bg-teal-100 dark:bg-teal-950",
    materials: [
      "Transformasi Digital bagi Koperasi",
      "Aplikasi Pencatatan Simpan Pinjam",
      "Layanan Anggota Berbasis Aplikasi",
      "Keamanan Data dan Transaksi Digital",
      "Pembayaran Digital dan E-Wallet",
      "Studi Kasus Koperasi Digital",
    ],
  },
  {
    id: 7,
    title: "Pemasaran Produk Koperasi",
    description:
      "Strategi memasarkan produk dan jasa koperasi agar makin dikenal dan diminati masyarakat.",
    level: "Lanjutan",
    icon: Store,
    color: "bg-orange-100 dark:bg-orange-950",
    materials: [
      "Strategi Branding Koperasi",
      "Pemasaran Digital untuk UMKM Anggota",
      "Membangun Jaringan Distribusi",
      "Riset Kebutuhan Pasar",
      "Studi Kasus Pemasaran Produk Koperasi",
    ],
  },
  {
    id: 8,
    title: "Manajemen Risiko & Kepatuhan",
    description:
      "Identifikasi risiko usaha dan terapkan pengendalian internal demi keberlangsungan koperasi.",
    level: "Lanjutan",
    icon: ShieldCheck,
    color: "bg-rose-100 dark:bg-rose-950",
    materials: [
      "Identifikasi Risiko Usaha Koperasi",
      "Pengendalian Internal",
      "Manajemen Risiko Kredit",
      "Kepatuhan terhadap Regulasi",
      "Whistleblowing dan Pelaporan Pelanggaran",
      "Rencana Mitigasi dan Kontinjensi",
      "Studi Kasus Manajemen Risiko",
    ],
  },
]
