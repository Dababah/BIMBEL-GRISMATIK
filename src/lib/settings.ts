import { prisma } from "@/lib/prisma";

/**
 * Nilai default untuk seluruh konten yang bisa diatur lewat halaman
 * /admin/pengaturan. Nilai ini dipakai sebagai fallback apabila
 * baris Setting belum ada di database (misalnya sebelum di-seed).
 */
export const defaultSettings: Record<string, string> = {
  site_name: "Bimbel Grismatik",
  tagline: "Bimbingan Belajar Terpercaya, Legal, dan Berkualitas",
  hero_title: "Wujudkan Prestasi Belajar Anak Bersama Grismatik",
  hero_subtitle:
    "Bimbel Grismatik membantu siswa SD, SMP, dan SMA di Batu Bara meraih nilai terbaik melalui bimbingan personal, materi terstruktur, dan tenaga pengajar berpengalaman.",
  about_text:
    "Bimbel Grismatik adalah lembaga bimbingan belajar yang berdiri untuk membantu siswa di Kabupaten Batu Bara meningkatkan kemampuan akademik dengan metode belajar yang menyenangkan, terstruktur, dan personal. Kami berkomitmen memberikan layanan pendidikan terbaik untuk masa depan generasi Indonesia.",
  vision:
    "Menjadi lembaga bimbingan belajar terpercaya yang melahirkan generasi cerdas, berkarakter, dan siap menghadapi tantangan masa depan.",
  mission:
    "Memberikan pembelajaran berkualitas dengan tenaga pengajar kompeten, kurikulum terstruktur, dan suasana belajar yang nyaman serta menyenangkan bagi setiap siswa.",
  founder_name: "Nazli Nasty, S.Pd",
  license_number: "500.16.7.2/0002/IKK/DPM-PTSP/II/2026",
  license_issuer:
    "Dinas Penanaman Modal dan Pelayanan Terpadu Satu Pintu (DPM-PTSP) Kabupaten Batu Bara",
  license_text:
    "Bimbel Grismatik telah memiliki Izin Kursus dari Pemerintah Kabupaten Batu Bara, sehingga kegiatan belajar mengajar kami legal, resmi, dan dapat dipertanggungjawabkan.",
  address:
    "Dusun Simpang Bandar, Desa Simpang Kopi, Kecamatan Sei Suka, Kabupaten Batu Bara, Sumatera Utara",
  address_short: "Gang Muhsin, Depan SPBU Simpang Bandar Tinggi",
  map_address:
    "883H+HPR, Jl. Lintas Sumatera, Sei Suka/Deras, Kec. Sei Suka, Kabupaten Batu Bara, Sumatera Utara 21257",
  phone: "0812-0000-0000",
  whatsapp: "6281200000000",
  email: "info@bimbelgrismatik.com",
  instagram: "https://instagram.com/bimbel_grismatik",
  facebook: "https://facebook.com/grismatika.batubara",
  tiktok: "https://tiktok.com/@grismatik_batubara",
  operating_hours: "Senin - Sabtu, 14.00 - 18.00 WIB",
};

export type SiteSettings = typeof defaultSettings;

/**
 * Mengambil seluruh pengaturan situs dari database dan menggabungkannya
 * dengan nilai default. Aman dipanggil walau tabel Setting kosong.
 */
export async function getSettings(): Promise<SiteSettings> {
  try {
    const rows = await prisma.setting.findMany();
    const fromDb: Record<string, string> = {};
    for (const row of rows) {
      fromDb[row.key] = row.value;
    }
    return { ...defaultSettings, ...fromDb } as SiteSettings;
  } catch (error) {
    console.error("Gagal mengambil settings, menggunakan nilai default:", error);
    return { ...defaultSettings };
  }
}
