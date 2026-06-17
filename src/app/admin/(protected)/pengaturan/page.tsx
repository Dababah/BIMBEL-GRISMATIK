import { getSettings } from "@/lib/settings";
import { updateSettings } from "@/lib/actions";
import { FormField, inputClass } from "@/components/admin/FormField";

export default async function AdminPengaturanPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const settings = await getSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-800">Pengaturan Situs</h1>
      <p className="mt-1 text-sm text-navy-500">
        Ubah teks dan informasi yang ditampilkan di halaman utama, tentang kami, dan kontak.
      </p>

      {searchParams.success && (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Pengaturan berhasil disimpan.
        </div>
      )}

      <form action={updateSettings} className="mt-6 space-y-8">
        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-lg font-semibold text-navy-800">Identitas Situs</h2>
          <div className="mt-5 space-y-5">
            <FormField label="Nama Situs / Lembaga" htmlFor="site_name">
              <input id="site_name" name="site_name" defaultValue={settings.site_name} className={inputClass} />
            </FormField>
            <FormField label="Tagline" htmlFor="tagline">
              <input id="tagline" name="tagline" defaultValue={settings.tagline} className={inputClass} />
            </FormField>
          </div>
        </section>

        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-lg font-semibold text-navy-800">Halaman Utama (Hero)</h2>
          <div className="mt-5 space-y-5">
            <FormField label="Judul Hero" htmlFor="hero_title">
              <input id="hero_title" name="hero_title" defaultValue={settings.hero_title} className={inputClass} />
            </FormField>
            <FormField label="Subjudul Hero" htmlFor="hero_subtitle">
              <textarea
                id="hero_subtitle"
                name="hero_subtitle"
                rows={3}
                defaultValue={settings.hero_subtitle}
                className={inputClass}
              />
            </FormField>
          </div>
        </section>

        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-lg font-semibold text-navy-800">Tentang Kami</h2>
          <div className="mt-5 space-y-5">
            <FormField label="Deskripsi Tentang Kami" htmlFor="about_text">
              <textarea
                id="about_text"
                name="about_text"
                rows={4}
                defaultValue={settings.about_text}
                className={inputClass}
              />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Visi" htmlFor="vision">
                <textarea id="vision" name="vision" rows={3} defaultValue={settings.vision} className={inputClass} />
              </FormField>
              <FormField label="Misi" htmlFor="mission">
                <textarea id="mission" name="mission" rows={3} defaultValue={settings.mission} className={inputClass} />
              </FormField>
            </div>
            <FormField label="Nama Penyelenggara" htmlFor="founder_name">
              <input
                id="founder_name"
                name="founder_name"
                defaultValue={settings.founder_name}
                className={inputClass}
              />
            </FormField>
          </div>
        </section>

        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-lg font-semibold text-navy-800">Legalitas</h2>
          <div className="mt-5 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Nomor Izin Kursus" htmlFor="license_number">
                <input
                  id="license_number"
                  name="license_number"
                  defaultValue={settings.license_number}
                  className={inputClass}
                />
              </FormField>
              <FormField label="Diterbitkan Oleh" htmlFor="license_issuer">
                <input
                  id="license_issuer"
                  name="license_issuer"
                  defaultValue={settings.license_issuer}
                  className={inputClass}
                />
              </FormField>
            </div>
            <FormField label="Teks Legalitas" htmlFor="license_text">
              <textarea
                id="license_text"
                name="license_text"
                rows={3}
                defaultValue={settings.license_text}
                className={inputClass}
              />
            </FormField>
          </div>
        </section>

        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-lg font-semibold text-navy-800">Kontak & Lokasi</h2>
          <div className="mt-5 space-y-5">
            <FormField label="Alamat Lengkap" htmlFor="address">
              <textarea id="address" name="address" rows={2} defaultValue={settings.address} className={inputClass} />
            </FormField>
            <FormField label="Alamat Singkat / Patokan" htmlFor="address_short">
              <input
                id="address_short"
                name="address_short"
                defaultValue={settings.address_short}
                className={inputClass}
              />
            </FormField>
            <FormField
              label="Alamat untuk Peta (Google Maps)"
              htmlFor="map_address"
              hint="Alamat ini digunakan untuk menampilkan peta lokasi di situs."
            >
              <input
                id="map_address"
                name="map_address"
                defaultValue={settings.map_address}
                className={inputClass}
              />
            </FormField>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Nomor Telepon" htmlFor="phone">
                <input id="phone" name="phone" defaultValue={settings.phone} className={inputClass} />
              </FormField>
              <FormField
                label="Nomor WhatsApp"
                htmlFor="whatsapp"
                hint="Format internasional tanpa tanda + atau spasi, contoh: 6281234567890"
              >
                <input id="whatsapp" name="whatsapp" defaultValue={settings.whatsapp} className={inputClass} />
              </FormField>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <FormField label="Email" htmlFor="email">
                <input id="email" name="email" type="email" defaultValue={settings.email} className={inputClass} />
              </FormField>
              <FormField label="Jam Operasional" htmlFor="operating_hours">
                <input
                  id="operating_hours"
                  name="operating_hours"
                  defaultValue={settings.operating_hours}
                  className={inputClass}
                />
              </FormField>
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="font-display text-lg font-semibold text-navy-800">Media Sosial</h2>
          <div className="mt-5 space-y-5">
            <FormField label="Instagram" htmlFor="instagram">
              <input id="instagram" name="instagram" defaultValue={settings.instagram} className={inputClass} />
            </FormField>
            <FormField label="Facebook" htmlFor="facebook">
              <input id="facebook" name="facebook" defaultValue={settings.facebook} className={inputClass} />
            </FormField>
            <FormField label="TikTok" htmlFor="tiktok">
              <input id="tiktok" name="tiktok" defaultValue={settings.tiktok} className={inputClass} />
            </FormField>
          </div>
        </section>

        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900 sm:w-auto sm:px-10"
        >
          Simpan Semua Pengaturan
        </button>
      </form>
    </div>
  );
}
