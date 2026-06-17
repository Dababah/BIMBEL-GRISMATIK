import Image from "next/image";
import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Profil, visi, misi, dan legalitas Bimbel Grismatik.",
};

export default async function TentangPage() {
  const settings = await getSettings();

  return (
    <div>
      <section className="bg-navy-900 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
            Tentang Kami
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            {settings.site_name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-navy-200">
            {settings.tagline}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-start lg:px-8">
          <div>
            <SectionHeading eyebrow="Profil" title="Siapa Kami" />
            <p className="mt-5 text-base leading-relaxed text-navy-600">{settings.about_text}</p>
            <p className="mt-4 text-base leading-relaxed text-navy-600">
              {settings.site_name} diselenggarakan oleh{" "}
              <span className="font-semibold text-navy-800">{settings.founder_name}</span> dan
              berlokasi di {settings.address}.
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/logo.jpg"
              alt={`Logo ${settings.site_name}`}
              width={360}
              height={360}
              className="h-64 w-64 rounded-full object-cover shadow-xl ring-4 ring-gold-200 sm:h-80 sm:w-80"
            />
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 sm:grid-cols-2 lg:px-8">
          <div className="corner-accent rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-navy-800">Visi</h2>
            <p className="pen-divider my-4" />
            <p className="text-base leading-relaxed text-navy-600">{settings.vision}</p>
          </div>
          <div className="corner-accent rounded-2xl border border-navy-100 bg-white p-8 shadow-sm">
            <h2 className="font-display text-2xl font-semibold text-navy-800">Misi</h2>
            <p className="pen-divider my-4" />
            <p className="text-base leading-relaxed text-navy-600">{settings.mission}</p>
          </div>
        </div>
      </section>

      <section className="bg-navy-800 py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center lg:px-8">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-400 text-navy-900">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2 4 5v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V5z" strokeLinejoin="round" />
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="mt-5 font-display text-3xl font-semibold text-white">Legalitas Resmi</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-navy-200">
            {settings.license_text}
          </p>
          <div className="mx-auto mt-8 grid max-w-xl gap-4 rounded-2xl border border-navy-700 bg-navy-900 p-6 text-left text-sm text-navy-200 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold-400">Nomor Izin Kursus</p>
              <p className="mt-1 font-semibold text-white">{settings.license_number}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gold-400">Diterbitkan Oleh</p>
              <p className="mt-1 font-semibold text-white">{settings.license_issuer}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-xs uppercase tracking-widest text-gold-400">Penyelenggara</p>
              <p className="mt-1 font-semibold text-white">{settings.founder_name}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
