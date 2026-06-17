import Link from "next/link";
import { createProgram } from "@/lib/actions";
import ProgramFormFields from "@/components/admin/ProgramFormFields";

export default function NewProgramPage() {
  return (
    <div>
      <div className="flex items-center gap-3">
        <Link href="/admin/program" className="text-sm text-navy-500 hover:text-gold-600">
          &larr; Kembali
        </Link>
      </div>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Tambah Program</h1>

      <form action={createProgram} className="mt-6 max-w-2xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
        <ProgramFormFields />
        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          Simpan Program
        </button>
      </form>
    </div>
  );
}
