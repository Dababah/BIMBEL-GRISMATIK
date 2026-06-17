import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safe-query";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";

export const metadata: Metadata = {
  title: "Testimoni",
  description: "Apa kata siswa dan orang tua tentang Bimbel Grismatik.",
};

export default async function TestimoniPage() {
  const testimonials = await safeQuery(
    () =>
      prisma.testimonial.findMany({
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
            Testimoni
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            Apa Kata Mereka?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-navy-200">
            Pengalaman nyata siswa dan orang tua yang telah belajar bersama kami.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          {testimonials.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t) => (
                <TestimonialCard key={t.id} testimonial={t} />
              ))}
            </div>
          ) : (
            <SectionHeading
              title="Belum ada testimoni"
              description="Testimoni dapat ditambahkan melalui dashboard admin."
              align="center"
            />
          )}
        </div>
      </section>
    </div>
  );
}
