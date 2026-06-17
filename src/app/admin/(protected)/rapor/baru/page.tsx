import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createReportPeriod } from "@/lib/actions";
import ReportPeriodFormFields from "@/components/ReportPeriodForm";

export default async function NewReportPeriodPage() {
  const students = await prisma.student.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });

  return (
    <div>
      <Link href="/admin/rapor" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Buat Rapor</h1>

      <form
        action={createReportPeriod}
        className="mt-6 max-w-2xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <ReportPeriodFormFields students={students} />
        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          Simpan Rapor
        </button>
      </form>
    </div>
  );
}
