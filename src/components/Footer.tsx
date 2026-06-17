import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/lib/settings";

export default function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-100 bg-navy-900 text-navy-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt={`Logo ${settings.site_name}`}
              width={48}
              height={48}
              className="h-12 w-12 rounded-full object-cover"
            />
            <span className="font-display text-lg font-semibold text-white">
              {settings.site_name}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-navy-200">{settings.tagline}</p>
          <p className="mt-3 text-xs text-navy-300">
            No. Izin Kursus: {settings.license_number}
          </p>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-gold-400">Navigasi</h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-200">
            <li><Link className="hover:text-gold-300" href="/">Beranda</Link></li>
            <li><Link className="hover:text-gold-300" href="/tentang">Tentang Kami</Link></li>
            <li><Link className="hover:text-gold-300" href="/program">Program</Link></li>
            <li><Link className="hover:text-gold-300" href="/testimoni">Testimoni</Link></li>
            <li><Link className="hover:text-gold-300" href="/galeri">Galeri</Link></li>
            <li><Link className="hover:text-gold-300" href="/pendaftaran">Pendaftaran</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-gold-400">Kontak</h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-200">
            <li>{settings.address}</li>
            <li>{settings.address_short}</li>
            <li>Telp/WA: {settings.phone}</li>
            <li>Email: {settings.email}</li>
            <li>Jam Operasional: {settings.operating_hours}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-base font-semibold text-gold-400">Media Sosial</h3>
          <ul className="mt-4 space-y-2 text-sm text-navy-200">
            {settings.instagram && (
              <li>
                <a className="hover:text-gold-300" href={settings.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
            )}
            {settings.facebook && (
              <li>
                <a className="hover:text-gold-300" href={settings.facebook} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
            )}
            {settings.tiktok && (
              <li>
                <a className="hover:text-gold-300" href={settings.tiktok} target="_blank" rel="noreferrer">
                  TikTok
                </a>
              </li>
            )}
          </ul>
          <Link
            href="/masuk"
            className="mt-6 inline-block text-xs text-navy-400 hover:text-navy-200"
          >
            Login Admin / Tutor / Orang Tua
          </Link>
        </div>
      </div>

      <div className="pen-divider mx-5 lg:mx-8" />

      <div className="mx-auto max-w-6xl px-5 py-5 text-center text-xs text-navy-400 lg:px-8">
        &copy; {year} {settings.site_name}. Diselenggarakan oleh {settings.founder_name}. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
