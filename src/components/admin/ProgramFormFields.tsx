import type { Program } from "@prisma/client";
import { FormField, inputClass } from "@/components/admin/FormField";

export default function ProgramFormFields({ program }: { program?: Program }) {
  return (
    <>
      <FormField label="Judul Program" htmlFor="title" required>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={program?.title}
          placeholder="Contoh: Bimbel SD (Kelas 1 - 6)"
          className={inputClass}
        />
      </FormField>

      <FormField label="Deskripsi" htmlFor="description" required>
        <textarea
          id="description"
          name="description"
          required
          rows={4}
          defaultValue={program?.description}
          placeholder="Jelaskan materi dan keunggulan program ini"
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Jenjang" htmlFor="level" hint="Contoh: SD, SMP, SMA, Umum">
          <input
            id="level"
            name="level"
            type="text"
            defaultValue={program?.level || ""}
            placeholder="SD"
            className={inputClass}
          />
        </FormField>
        <FormField label="Urutan Tampil" htmlFor="order" hint="Angka kecil tampil lebih dulu">
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={program?.order ?? 0}
            className={inputClass}
          />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Jadwal" htmlFor="schedule">
          <input
            id="schedule"
            name="schedule"
            type="text"
            defaultValue={program?.schedule || ""}
            placeholder="Senin & Rabu, 16.00 - 17.30"
            className={inputClass}
          />
        </FormField>
        <FormField label="Biaya" htmlFor="price">
          <input
            id="price"
            name="price"
            type="text"
            defaultValue={program?.price || ""}
            placeholder="Rp150.000 / bulan"
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField
        label="URL Gambar"
        htmlFor="imageUrl"
        hint="Opsional. Tempel tautan gambar (misalnya dari Google Drive, Imgur, dsb)."
      >
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          defaultValue={program?.imageUrl || ""}
          placeholder="https://..."
          className={inputClass}
        />
      </FormField>

      <label className="flex items-center gap-2.5 text-sm font-medium text-navy-700">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={program ? program.isActive : true}
          className="h-4 w-4 rounded border-navy-300 text-gold-500 focus:ring-gold-400"
        />
        Tampilkan program ini di situs
      </label>
    </>
  );
}
