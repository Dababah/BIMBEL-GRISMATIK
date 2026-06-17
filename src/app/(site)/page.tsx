import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { safeQuery } from "@/lib/safe-query";
import SectionHeading from "@/components/SectionHeading";
import ProgramCard from "@/components/ProgramCard";
import TestimonialCard from "@/components/TestimonialCard";

export default async function HomePage() {
  const settings = await getSettings();

  const [programs, testimonials] = await Promise.all([
    safeQuery(
      () =>
        prisma.program.findMany({
          where: { isActive: true },
          orderBy: { order: "asc" },
          take: 4,
        }),
      []
    ),
    safeQuery(
      () =>
        prisma.testimonial.findMany({
          where: { isActive: true },
          orderBy: { order: "asc" },
          take: 3,
        }),
      []
    ),
  ]);

  const waLink = `https://wa.me/${settings.whatsapp}`;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #ECB234 0, transparent 35%), radial-gradient(circle at 85% 75%, #ECB234 0, transparent 40%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 py-16 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
              {settings.tagline}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {settings.hero_title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-navy-200">
              {settings.hero_subtitle}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/pendaftaran"
                className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 shadow-lg transition-transform hover:-translate-y-0.5 hover:bg-gold-300"
              >
                Daftar Sekarang
              </Link>
              <Link
                href="/program"
                className="rounded-full border border-navy-300 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold-400 hover:text-gold-300"
              >
                Lihat Program
              </Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-widest text-navy-400">
              Berizin Resmi &middot; No. {settings.license_number}
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full border border-gold-400/30" aria-hidden="true" />
              <Image
                src="/logo.jpg"
                alt={`Logo ${settings.site_name}`}
                width={320}
                height={320}
                className="h-56 w-56 rounded-full object-cover shadow-2xl ring-4 ring-gold-400/40 sm:h-72 sm:w-72"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / LEGALITAS */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Mengapa Memilih Kami"
            title="Bimbingan Belajar Resmi & Terpercaya"
            description="Bimbel Grismatik telah mengantongi izin resmi dari Pemerintah Kabupaten Batu Bara, sehingga kegiatan belajar mengajar kami legal, aman, dan dapat dipertanggungjawabkan."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <div className="corner-accent rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-gold-400">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2 4 5v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V5z" strokeLinejoin="round" />
                  <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-800">Terdaftar Resmi</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Memiliki Izin Operasional Resmi dari Pemerintah Kabupaten Batu Bara.
              </p>
            </div>
            <div className="corner-accent rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-gold-400">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="10" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-800">Legal & Amanah</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Dikelola sesuai peraturan dan standar pendidikan yang berlaku.
              </p>
            </div>
            <div className="corner-accent rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-800 text-gold-400">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 21c4-3 8-6.5 8-11a5 5 0 0 0-8-4 5 5 0 0 0-8 4c0 4.5 4 8 8 11z" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy-800">Berkomitmen Memberikan</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">
                Layanan pendidikan terbaik untuk masa depan generasi Indonesia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TENTANG SINGKAT */}
      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <SectionHeading eyebrow="Tentang Kami" title={`Mengenal ${settings.site_name}`} />
            <p className="mt-5 text-base leading-relaxed text-navy-600">{settings.about_text}</p>
            <Link
              href="/tentang"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-800 hover:text-gold-600"
            >
              Selengkapnya tentang kami
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-navy-800 p-6 text-white">
              <h3 className="font-display text-lg font-semibold text-gold-400">Visi</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-100">{settings.vision}</p>
            </div>
            <div className="rounded-2xl bg-navy-50 p-6">
              <h3 className="font-display text-lg font-semibold text-navy-800">Misi</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-600">{settings.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM */}
      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          <SectionHeading
            eyebrow="Program Unggulan"
            title="Pilih Program Sesuai Jenjang Anak Anda"
            description="Setiap program dirancang sesuai kebutuhan belajar siswa, mulai dari jenjang SD hingga SMA."
          />
          {programs.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-navy-500">Belum ada data program. Silakan tambahkan melalui dashboard admin.</p>
          )}
          <div className="mt-10 text-center">
            <Link
              href="/program"
              className="rounded-full border border-navy-300 px-6 py-3 text-sm font-semibold text-navy-800 transition-colors hover:border-gold-500 hover:text-gold-600"
            >
              Lihat Semua Program
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONI */}
      {testimonials.length > 0 && (
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-5 lg:px-8">
            <SectionHeading
              eyebrow="Kata Mereka"
              title="Testimoni Siswa & Orang Tua"
              align="center"
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA / LOKASI */}
      <section className="bg-navy-900 py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
              Lokasi Bimbel
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
              Kunjungi Tempat Belajar Kami
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-200">{settings.address}</p>
            <p className="mt-1 text-sm font-semibold text-gold-300">{settings.address_short}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-gold-300"
              >
                Hubungi via WhatsApp
              </a>
              <Link
                href="/kontak"
                className="rounded-full border border-navy-300 px-6 py-3 text-sm font-semibold text-white hover:border-gold-400 hover:text-gold-300"
              >
                Detail Kontak
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-navy-700">
            <iframe
              title="Lokasi Bimbel Grismatik"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                settings.map_address
              )}&output=embed`}
              width="100%"
              height="320"
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
