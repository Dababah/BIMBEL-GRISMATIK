import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateReportPeriod } from "@/lib/actions";
import ReportPeriodFormFields from "@/components/ReportPeriodForm";

export default async function EditTutorReportPeriodPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const tutorId = session!.user.id;

  const reportPeriod = await prisma.reportPeriod.findUnique({
    where: { id: params.id },
    include: { details: true, student: true },
  });

  if (!reportPeriod) {
    notFound();
  }

  if (reportPeriod.tutorId !== tutorId) {
    redirect("/tutor/rapor");
  }

  const updateWithId = updateReportPeriod.bind(null, params.id);

  return (
    <div>
      <Link href="/tutor/rapor" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Edit Rapor</h1>
      <p className="mt-1 text-sm text-navy-500">Siswa: {reportPeriod.student.name}</p>

      <form
        action={updateWithId}
        className="mt-6 max-w-2xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <ReportPeriodFormFields
          reportPeriod={reportPeriod}
          details={reportPeriod.details}
          students={[]}
          showStudentSelect={false}
        />
        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
