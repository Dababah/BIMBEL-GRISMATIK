import type { PromoConfig } from "@prisma/client";
import { FormField, inputClass } from "@/components/admin/FormField";

export default function PromoConfigFormFields({ promo }: { promo?: PromoConfig }) {
  const startValue = promo?.startDate ? new Date(promo.startDate).toISOString().slice(0, 10) : "";
  const endValue = promo?.endDate ? new Date(promo.endDate).toISOString().slice(0, 10) : "";

  return (
    <>
      <FormField label="Nama Promo" htmlFor="name" required>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={promo?.name}
          placeholder="Promo Gratis Pendaftaran Juni 2026"
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Tipe Diskon" htmlFor="discountType" required>
          <select id="discountType" name="discountType" required defaultValue={promo?.discountType || "REGISTRATION_FREE"} className={inputClass}>
            <option value="REGISTRATION_FREE">Gratis Biaya Pendaftaran</option>
            <option value="PERCENTAGE">Persentase (%)</option>
            <option value="NOMINAL">Nominal Rupiah</option>
          </select>
        </FormField>
        <FormField label="Nilai Diskon" htmlFor="discountValue" hint="Isi 0 jika tipe Gratis Pendaftaran">
          <input id="discountValue" name="discountValue" type="number" min={0} defaultValue={promo?.discountValue ?? 0} className={inputClass} />
        </FormField>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Tanggal Mulai" htmlFor="startDate" required>
          <input id="startDate" name="startDate" type="date" required defaultValue={startValue} className={inputClass} />
        </FormField>
        <FormField label="Tanggal Selesai" htmlFor="endDate" required>
          <input id="endDate" name="endDate" type="date" required defaultValue={endValue} className={inputClass} />
        </FormField>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-medium text-navy-700">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={promo ? promo.isActive : true}
          className="h-4 w-4 rounded border-navy-300 text-gold-500 focus:ring-gold-400"
        />
        Promo aktif
      </label>
    </>
  );
}
