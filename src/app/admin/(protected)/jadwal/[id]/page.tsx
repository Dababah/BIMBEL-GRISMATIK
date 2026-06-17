import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateSchedule } from "@/lib/actions";
import ScheduleFormFields from "@/components/admin/ScheduleFormFields";

export default async function EditSchedulePage({ params }: { params: { id: string } }) {
  const [schedule, programs, tutors] = await Promise.all([
    prisma.schedule.findUnique({ where: { id: params.id } }),
    prisma.program.findMany({ orderBy: { order: "asc" } }),
    prisma.user.findMany({ where: { role: "TUTOR" }, orderBy: { name: "asc" } }),
  ]);

  if (!schedule) {
    notFound();
  }

  const updateScheduleWithId = updateSchedule.bind(null, params.id);

  return (
    <div>
      <Link href="/admin/jadwal" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Edit Jadwal Kelas</h1>

      <form
        action={updateScheduleWithId}
        className="mt-6 max-w-2xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <ScheduleFormFields schedule={schedule} programs={programs} tutors={tutors} />
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
