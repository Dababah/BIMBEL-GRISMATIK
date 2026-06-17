import type { Testimonial } from "@prisma/client";
import { FormField, inputClass } from "@/components/admin/FormField";

export default function TestimonialFormFields({ testimonial }: { testimonial?: Testimonial }) {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Nama" htmlFor="name" required>
          <input
            id="name"
            name="name"
            type="text"
            required
            defaultValue={testimonial?.name}
            placeholder="Ibu Siti Aisyah"
            className={inputClass}
          />
        </FormField>
        <FormField label="Peran" htmlFor="role" hint="Contoh: Orang tua siswa kelas 5 SD">
          <input
            id="role"
            name="role"
            type="text"
            defaultValue={testimonial?.role || ""}
            placeholder="Orang tua siswa"
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField label="Isi Testimoni" htmlFor="message" required>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          defaultValue={testimonial?.message}
          placeholder="Tuliskan testimoni di sini"
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Rating" htmlFor="rating">
          <select
            id="rating"
            name="rating"
            defaultValue={testimonial?.rating ?? 5}
            className={inputClass}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Bintang
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Urutan Tampil" htmlFor="order">
          <input
            id="order"
            name="order"
            type="number"
            defaultValue={testimonial?.order ?? 0}
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField
        label="URL Foto"
        htmlFor="imageUrl"
        hint="Opsional. Foto profil orang yang memberi testimoni."
      >
        <input
          id="imageUrl"
          name="imageUrl"
          type="url"
          defaultValue={testimonial?.imageUrl || ""}
          placeholder="https://..."
          className={inputClass}
        />
      </FormField>

      <label className="flex items-center gap-2.5 text-sm font-medium text-navy-700">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={testimonial ? testimonial.isActive : true}
          className="h-4 w-4 rounded border-navy-300 text-gold-500 focus:ring-gold-400"
        />
        Tampilkan testimoni ini di situs
      </label>
    </>
  );
}
