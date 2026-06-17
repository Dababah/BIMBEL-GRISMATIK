import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deleteGalleryItem } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminGaleriPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-800">Galeri</h1>
          <p className="mt-1 text-sm text-navy-500">Kelola foto dokumentasi kegiatan.</p>
        </div>
        <Link
          href="/admin/galeri/baru"
          className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          + Tambah Foto
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 text-sm text-navy-500 shadow-sm">
          Belum ada foto galeri.
        </p>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item.id} className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
              <div className="relative h-44 w-full bg-navy-50">
                <Image
                  src={item.imageUrl}
                  alt={item.title || "Galeri"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex items-center justify-between gap-2 p-4">
                <p className="truncate text-sm font-medium text-navy-700">
                  {item.title || "Tanpa judul"}
                </p>
                <DeleteButton
                  action={deleteGalleryItem.bind(null, item.id)}
                  confirmText="Hapus foto ini dari galeri?"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
