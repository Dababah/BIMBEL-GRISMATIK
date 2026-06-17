import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveAttendance } from "@/lib/actions";
import { FormField, inputClass } from "@/components/admin/FormField";

const statusOptions = [
  { value: "HADIR", label: "Hadir" },
  { value: "IZIN", label: "Izin" },
  { value: "SAKIT", label: "Sakit" },
  { value: "ALFA", label: "Alfa" },
];

export default async function TutorKehadiranPage({
  searchParams,
}: {
  searchParams: { scheduleId?: string; date?: string; success?: string };
}) {
  const session = await getServerSession(authOptions);
  const tutorId = session!.user.id;

  const schedules = await prisma.schedule.findMany({
    where: { tutorId, isActive: true },
    include: { program: true },
    orderBy: { name: "asc" },
  });

  const today = new Date().toISOString().slice(0, 10);
  const selectedScheduleId = searchParams.scheduleId || schedules[0]?.id || "";
  const selectedDate = searchParams.date || today;

  let enrolledStudents: { id: string; name: string; studentCode: string }[] = [];
  let existingAttendance: Record<string, string> = {};

  if (selectedScheduleId) {
    const enrollments = await prisma.enrollment.findMany({
      where: { scheduleId: selectedScheduleId, status: "APPROVED" },
      include: { student: true },
      orderBy: { student: { name: "asc" } },
    });
    enrolledStudents = enrollments.map((e) => ({
      id: e.student.id,
      name: e.student.name,
      studentCode: e.student.studentCode,
    }));

    const attendances = await prisma.attendance.findMany({
      where: { scheduleId: selectedScheduleId, date: new Date(selectedDate) },
    });
    existingAttendance = Object.fromEntries(attendances.map((a) => [a.studentId, a.status]));
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-800">Kehadiran</h1>
      <p className="mt-1 text-sm text-navy-500">Pilih jadwal dan tanggal, lalu isi kehadiran siswa.</p>

      {searchParams.success && (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Kehadiran berhasil disimpan.
        </div>
      )}

      <form method="GET" className="mt-6 grid gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:grid-cols-3 sm:p-8">
        <FormField label="Jadwal Kelas" htmlFor="scheduleId">
          <select id="scheduleId" name="scheduleId" defaultValue={selectedScheduleId} className={inputClass}>
            {schedules.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} &mdash; {s.program.title}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Tanggal" htmlFor="date">
          <input id="date" name="date" type="date" defaultValue={selectedDate} className={inputClass} />
        </FormField>
        <div className="flex items-end">
          <button type="submit" className="w-full rounded-full border border-navy-300 px-4 py-2.5 text-sm font-semibold text-navy-700 hover:border-gold-400 hover:text-gold-600 sm:w-fit">
            Tampilkan
          </button>
        </div>
      </form>

      {schedules.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-gold-300 bg-gold-50 p-6 text-sm text-navy-700">
          Anda belum ditugaskan ke jadwal kelas manapun.
        </p>
      ) : enrolledStudents.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-navy-100 bg-white p-6 text-sm text-navy-500 shadow-sm">
          Belum ada siswa yang ditempatkan di jadwal ini.
        </p>
      ) : (
        <form action={saveAttendance} className="mt-6 space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
          <input type="hidden" name="scheduleId" value={selectedScheduleId} />
          <input type="hidden" name="date" value={selectedDate} />

          <div className="divide-y divide-navy-100 rounded-xl border border-navy-100">
            {enrolledStudents.map((s) => (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div>
                  <input type="hidden" name="studentId" value={s.id} />
                  <p className="font-medium text-navy-800">{s.name}</p>
                  <p className="text-xs text-navy-400">{s.studentCode}</p>
                </div>
                <select
                  name={`status_${s.id}`}
                  defaultValue={existingAttendance[s.id] || "HADIR"}
                  className="rounded-lg border border-navy-200 px-3 py-1.5 text-sm text-navy-800 focus:border-gold-400"
                >
                  {statusOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <FormField label="Materi Hari Ini" htmlFor="material" hint="Opsional. Jika diisi, otomatis tercatat sebagai jurnal kelas.">
            <textarea id="material" name="material" rows={2} className={inputClass} />
          </FormField>
          <FormField label="Catatan Jurnal" htmlFor="journalNotes" hint="Opsional">
            <textarea id="journalNotes" name="journalNotes" rows={2} className={inputClass} />
          </FormField>

          <button
            type="submit"
            className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
          >
            Simpan Kehadiran
          </button>
        </form>
      )}
    </div>
  );
}
