import Link from "next/link";
import { createGalleryItem } from "@/lib/actions";
import { FormField, inputClass } from "@/components/admin/FormField";

export default function NewGalleryItemPage() {
  return (
    <div>
      <Link href="/admin/galeri" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Tambah Foto Galeri</h1>

      <form
        action={createGalleryItem}
        className="mt-6 max-w-xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <FormField
          label="URL Gambar"
          htmlFor="imageUrl"
          required
          hint="Tempel tautan gambar yang sudah diunggah (misalnya dari Google Drive, Imgur, atau layanan hosting gambar lainnya)."
        >
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            required
            placeholder="https://..."
            className={inputClass}
          />
        </FormField>

        <FormField label="Judul / Keterangan" htmlFor="title" hint="Opsional">
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Contoh: Kegiatan Belajar Kelas SD"
            className={inputClass}
          />
        </FormField>

        <FormField label="Urutan Tampil" htmlFor="order">
          <input id="order" name="order" type="number" defaultValue={0} className={inputClass} />
        </FormField>

        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          Simpan Foto
        </button>
      </form>
    </div>
  );
}
