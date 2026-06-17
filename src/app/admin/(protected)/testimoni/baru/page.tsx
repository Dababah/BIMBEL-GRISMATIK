import Link from "next/link";
import { createTestimonial } from "@/lib/actions";
import TestimonialFormFields from "@/components/admin/TestimonialFormFields";

export default function NewTestimonialPage() {
  return (
    <div>
      <Link href="/admin/testimoni" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Tambah Testimoni</h1>

      <form
        action={createTestimonial}
        className="mt-6 max-w-2xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <TestimonialFormFields />
        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          Simpan Testimoni
        </button>
      </form>
    </div>
  );
}
