import { prisma } from "@/lib/prisma";
import { createEnrollment, deleteEnrollment } from "@/lib/actions";
import { FormField, inputClass } from "@/components/admin/FormField";
import DeleteButton from "@/components/admin/DeleteButton";

const statusColor: Record<string, string> = {
  PENDING: "bg-gold-100 text-gold-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default async function AdminPendaftaranKelasPage() {
  const [enrollments, students, schedules] = await Promise.all([
    prisma.enrollment.findMany({
      orderBy: { submittedAt: "desc" },
      include: { student: true, schedule: { include: { program: true } } },
    }),
    prisma.student.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
    prisma.schedule.findMany({ where: { isActive: true }, orderBy: { name: "asc" }, include: { program: true } }),
  ]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-800">Penempatan Kelas</h1>
      <p className="mt-1 text-sm text-navy-500">
        Tempatkan siswa ke jadwal kelas tertentu (enrollment).
      </p>

      <form
        action={createEnrollment}
        className="mt-6 grid gap-4 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:grid-cols-3 sm:p-8"
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
        <FormField label="Jadwal Kelas" htmlFor="scheduleId" required>
          <select id="scheduleId" name="scheduleId" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Pilih jadwal
            </option>
            {schedules.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} &mdash; {s.program.title}
              </option>
            ))}
          </select>
        </FormField>
        <div className="flex flex-col justify-between gap-2 sm:col-span-1">
          <FormField label="Catatan" htmlFor="notes" hint="Opsional">
            <input id="notes" name="notes" type="text" className={inputClass} />
          </FormField>
        </div>
        <button
          type="submit"
          className="rounded-full bg-navy-800 px-6 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900 sm:col-span-3 sm:w-fit"
        >
          + Tempatkan Siswa
        </button>
      </form>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm">
        {enrollments.length === 0 ? (
          <p className="p-6 text-sm text-navy-500">Belum ada penempatan siswa ke kelas.</p>
        ) : (
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-navy-50 text-navy-500">
              <tr>
                <th className="px-4 py-3 font-medium">Siswa</th>
                <th className="px-4 py-3 font-medium">Jadwal</th>
                <th className="px-4 py-3 font-medium">Program</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {enrollments.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-3 font-medium text-navy-800">{e.student.name}</td>
                  <td className="px-4 py-3 text-navy-600">{e.schedule.name}</td>
                  <td className="px-4 py-3 text-navy-600">{e.schedule.program.title}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[e.status]}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DeleteButton
                      action={deleteEnrollment.bind(null, e.id)}
                      confirmText={`Hapus penempatan "${e.student.name}" dari kelas "${e.schedule.name}"?`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
