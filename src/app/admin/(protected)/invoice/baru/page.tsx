import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createInvoice } from "@/lib/actions";
import { FormField, inputClass } from "@/components/admin/FormField";

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

export default async function NewInvoicePage() {
  const [students, activePromo] = await Promise.all([
    prisma.student.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
    prisma.promoConfig.findFirst({
      where: { isActive: true, startDate: { lte: new Date() }, endDate: { gte: new Date() } },
    }),
  ]);

  const now = new Date();

  return (
    <div>
      <Link href="/admin/invoice" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Buat Invoice</h1>

      {activePromo && (
        <div className="mt-4 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-navy-700">
          Promo aktif saat ini: <span className="font-semibold">{activePromo.name}</span> &mdash;{" "}
          {activePromo.discountType === "REGISTRATION_FREE"
            ? "Gratis biaya pendaftaran"
            : `Diskon ${activePromo.discountValue}`}
          . Masukkan nominal diskon secara manual di bawah jika berlaku untuk invoice ini.
        </div>
      )}

      <form
        action={createInvoice}
        className="mt-6 max-w-xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <FormField label="Siswa" htmlFor="studentId" required>
          <select id="studentId" name="studentId" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Pilih siswa
            </option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.studentCode})
              </option>
            ))}
          </select>
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Bulan" htmlFor="month" required>
            <select id="month" name="month" required defaultValue={now.getMonth() + 1} className={inputClass}>
              {monthNames.map((m, i) => (
                <option key={m} value={i + 1}>
                  {m}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Tahun" htmlFor="year" required>
            <input id="year" name="year" type="number" required defaultValue={now.getFullYear()} className={inputClass} />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Biaya Pendaftaran (Rp)" htmlFor="registrationFee">
            <input id="registrationFee" name="registrationFee" type="number" min={0} defaultValue={0} className={inputClass} />
          </FormField>
          <FormField label="SPP Bulanan (Rp)" htmlFor="monthlyFee" required>
            <input id="monthlyFee" name="monthlyFee" type="number" min={0} required defaultValue={150000} className={inputClass} />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Biaya Ngaji (Rp)" htmlFor="ngajiFee" hint="Isi jika siswa ambil paket Ngaji">
            <input id="ngajiFee" name="ngajiFee" type="number" min={0} defaultValue={0} className={inputClass} />
          </FormField>
          <FormField label="Diskon (Rp)" htmlFor="discountAmount">
            <input id="discountAmount" name="discountAmount" type="number" min={0} defaultValue={0} className={inputClass} />
          </FormField>
        </div>

        <FormField label="Catatan" htmlFor="notes" hint="Opsional">
          <textarea id="notes" name="notes" rows={2} className={inputClass} />
        </FormField>

        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          Simpan Invoice
        </button>
      </form>
    </div>
  );
}
