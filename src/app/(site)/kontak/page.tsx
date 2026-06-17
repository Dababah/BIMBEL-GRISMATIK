import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/settings";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Kontak",
  description: "Informasi kontak dan lokasi Bimbel Grismatik di Kabupaten Batu Bara.",
};

export default async function KontakPage() {
  const settings = await getSettings();
  const waLink = `https://wa.me/${settings.whatsapp}`;

  return (
    <div>
      <section className="bg-navy-900 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
            Kontak
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            Hubungi Kami
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-navy-200">
            Punya pertanyaan seputar program atau pendaftaran? Tim kami siap membantu.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionHeading eyebrow="Informasi" title="Detail Kontak & Lokasi" />

            <dl className="mt-6 space-y-5 text-sm">
              <div className="corner-accent rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                <dt className="font-semibold text-navy-800">Alamat</dt>
                <dd className="mt-1 text-navy-600">{settings.address}</dd>
                <dd className="mt-1 font-medium text-gold-600">{settings.address_short}</dd>
              </div>
              <div className="corner-accent rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                <dt className="font-semibold text-navy-800">Telepon / WhatsApp</dt>
                <dd className="mt-1 text-navy-600">{settings.phone}</dd>
              </div>
              <div className="corner-accent rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                <dt className="font-semibold text-navy-800">Email</dt>
                <dd className="mt-1 text-navy-600">{settings.email}</dd>
              </div>
              <div className="corner-accent rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                <dt className="font-semibold text-navy-800">Jam Operasional</dt>
                <dd className="mt-1 text-navy-600">{settings.operating_hours}</dd>
              </div>
              <div className="corner-accent rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                <dt className="font-semibold text-navy-800">Media Sosial</dt>
                <dd className="mt-2 flex flex-wrap gap-3">
                  {settings.instagram && (
                    <a href={settings.instagram} target="_blank" rel="noreferrer" className="rounded-full bg-navy-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-gold-500 hover:text-navy-900">
                      Instagram
                    </a>
                  )}
                  {settings.facebook && (
                    <a href={settings.facebook} target="_blank" rel="noreferrer" className="rounded-full bg-navy-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-gold-500 hover:text-navy-900">
                      Facebook
                    </a>
                  )}
                  {settings.tiktok && (
                    <a href={settings.tiktok} target="_blank" rel="noreferrer" className="rounded-full bg-navy-800 px-4 py-1.5 text-xs font-semibold text-white hover:bg-gold-500 hover:text-navy-900">
                      TikTok
                    </a>
                  )}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-gold-300"
              >
                Chat via WhatsApp
              </a>
              <Link
                href="/pendaftaran"
                className="rounded-full border border-navy-300 px-6 py-3 text-sm font-semibold text-navy-800 hover:border-gold-500 hover:text-gold-600"
              >
                Form Pendaftaran
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-navy-100 shadow-sm">
            <iframe
              title="Lokasi Bimbel Grismatik"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                settings.map_address
              )}&output=embed`}
              width="100%"
              height="460"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
