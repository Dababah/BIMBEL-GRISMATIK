import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createReportPeriod } from "@/lib/actions";
import ReportPeriodFormFields from "@/components/ReportPeriodForm";

export default async function NewTutorReportPeriodPage() {
  const session = await getServerSession(authOptions);
  const tutorId = session!.user.id;

  const enrollments = await prisma.enrollment.findMany({
    where: { status: "APPROVED", schedule: { tutorId } },
    include: { student: true },
    distinct: ["studentId"],
    orderBy: { student: { name: "asc" } },
  });

  const students = enrollments.map((e) => e.student);

  return (
    <div>
      <Link href="/tutor/rapor" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Buat Rapor Siswa</h1>

      {students.length === 0 ? (
        <p className="mt-4 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-navy-700">
          Belum ada siswa yang ditempatkan di kelas Anda.
        </p>
      ) : (
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
      )}
    </div>
  );
}
