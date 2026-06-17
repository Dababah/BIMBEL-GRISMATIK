import type { Metadata } from "next";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safe-query";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Galeri",
  description: "Dokumentasi kegiatan belajar mengajar di Bimbel Grismatik.",
};

export default async function GaleriPage() {
  const items = await safeQuery(
    () => prisma.galleryItem.findMany({ orderBy: { order: "asc" } }),
    []
  );

  return (
    <div>
      <section className="bg-navy-900 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 text-center lg:px-8">
          <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-400">
            Galeri
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold text-white sm:text-5xl">
            Dokumentasi Kegiatan
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-navy-200">
            Momen belajar dan kegiatan siswa di Bimbel Grismatik.
          </p>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-5 lg:px-8">
          {items.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <figure
                  key={item.id}
                  className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm"
                >
                  <div className="relative h-56 w-full">
                    <Image
                      src={item.imageUrl}
                      alt={item.title || "Galeri Bimbel Grismatik"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {item.title && (
                    <figcaption className="p-4 text-sm font-medium text-navy-700">
                      {item.title}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          ) : (
            <SectionHeading
              title="Belum ada foto galeri"
              description="Foto kegiatan dapat ditambahkan melalui dashboard admin."
              align="center"
            />
          )}
        </div>
      </section>
    </div>
  );
}
