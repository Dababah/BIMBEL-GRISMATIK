import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safe-query";
import SectionHeading from "@/components/SectionHeading";
import ProgramCard from "@/components/ProgramCard";

export const metadata: Metadata = {
  title: "Program Bimbingan Belajar",
  description: "Daftar program bimbingan belajar untuk siswa SD, SMP, dan SMA di Bimbel Grismatik.",
};

export default async function ProgramPage() {
  const programs = await safeQuery(
    () =>
      prisma.program.findMany({
        where: { isActive: true },
        orderBy: { order: "asc" },
      }),
    []
  );

  return (
    <div>
      <section className="bg-navy-900 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
            Program Kami
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            Program Bimbingan Belajar
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-navy-200">
            Pilih program yang sesuai dengan jenjang dan kebutuhan belajar anak Anda. Semua
            program dibimbing oleh tenaga pengajar yang berpengalaman.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          {programs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <SectionHeading
              title="Belum ada program"
              description="Data program belum ditambahkan. Silakan kelola melalui dashboard admin."
              align="center"
            />
          )}

          <div className="mt-12 rounded-2xl bg-navy-800 p-8 text-center text-white">
            <h2 className="font-display text-2xl font-semibold">Tertarik dengan salah satu program?</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm text-navy-200">
              Daftarkan anak Anda sekarang dan rasakan pengalaman belajar yang menyenangkan dan
              terarah bersama Bimbel Grismatik.
            </p>
            <Link
              href="/pendaftaran"
              className="mt-6 inline-block rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-gold-300"
            >
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
