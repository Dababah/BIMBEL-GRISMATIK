import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createSchedule } from "@/lib/actions";
import ScheduleFormFields from "@/components/admin/ScheduleFormFields";

export default async function NewSchedulePage() {
  const [programs, tutors] = await Promise.all([
    prisma.program.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.user.findMany({ where: { role: "TUTOR" }, orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <Link href="/admin/jadwal" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Tambah Jadwal Kelas</h1>

      {programs.length === 0 && (
        <div className="mt-4 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-navy-700">
          Belum ada Program aktif. Tambahkan dulu di menu Program.
        </div>
      )}

      <form
        action={createSchedule}
        className="mt-6 max-w-2xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <ScheduleFormFields programs={programs} tutors={tutors} />
        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          Simpan Jadwal
        </button>
      </form>
    </div>
  );
}
