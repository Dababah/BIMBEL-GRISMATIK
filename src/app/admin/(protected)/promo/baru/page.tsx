import Link from "next/link";
import { createPromoConfig } from "@/lib/actions";
import PromoConfigFormFields from "@/components/admin/PromoConfigFormFields";

export default function NewPromoPage() {
  return (
    <div>
      <Link href="/admin/promo" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Tambah Promo</h1>

      <form
        action={createPromoConfig}
        className="mt-6 max-w-xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <PromoConfigFormFields />
        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          Simpan Promo
        </button>
      </form>
    </div>
  );
}
