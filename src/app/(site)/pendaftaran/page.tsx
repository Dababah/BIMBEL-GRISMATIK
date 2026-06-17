import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { getSettings } from "@/lib/settings";
import { safeQuery } from "@/lib/safe-query";
import RegistrationForm from "@/components/RegistrationForm";

export const metadata: Metadata = {
  title: "Pendaftaran",
  description: "Formulir pendaftaran siswa baru Bimbel Grismatik.",
};

export default async function PendaftaranPage() {
  const [settings, programs] = await Promise.all([
    getSettings(),
    safeQuery(
      () =>
        prisma.program.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
      []
    ),
  ]);

  const programOptions = programs.map((p) => p.title);

  return (
    <div>
      <section className="bg-navy-900 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
            Pendaftaran Siswa Baru
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            Daftar Sekarang
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-navy-200">
            Isi formulir di bawah ini untuk mendaftarkan diri atau anak Anda. Tim {settings.site_name}{" "}
            akan menghubungi Anda melalui WhatsApp untuk informasi lebih lanjut.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-5 lg:px-8">
          <div className="rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-10">
            <RegistrationForm programOptions={programOptions} />
          </div>
          <p className="mt-6 text-center text-xs text-navy-400">
            Dengan mengirimkan formulir ini, Anda menyetujui data Anda disimpan dan digunakan oleh{" "}
            {settings.site_name} untuk keperluan proses pendaftaran.
          </p>
        </div>
      </section>
    </div>
  );
}
