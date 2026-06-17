import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteSchedule } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

const dayLabel = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default async function AdminJadwalPage() {
  const schedules = await prisma.schedule.findMany({
    orderBy: { createdAt: "desc" },
    include: { program: true, tutor: true, _count: { select: { enrollments: true } } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-800">Jadwal Kelas</h1>
          <p className="mt-1 text-sm text-navy-500">Kelola jadwal kelas, tutor pengajar, dan kapasitas.</p>
        </div>
        <Link
          href="/admin/jadwal/baru"
          className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          + Tambah Jadwal
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm">
        {schedules.length === 0 ? (
          <p className="p-6 text-sm text-navy-500">Belum ada jadwal kelas.</p>
        ) : (
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-navy-50 text-navy-500">
              <tr>
                <th className="px-4 py-3 font-medium">Nama Jadwal</th>
                <th className="px-4 py-3 font-medium">Program</th>
                <th className="px-4 py-3 font-medium">Tutor</th>
                <th className="px-4 py-3 font-medium">Hari</th>
                <th className="px-4 py-3 font-medium">Jam</th>
                <th className="px-4 py-3 font-medium">Kapasitas</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {schedules.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3 font-medium text-navy-800">{s.name}</td>
                  <td className="px-4 py-3 text-navy-600">{s.program.title}</td>
                  <td className="px-4 py-3 text-navy-600">{s.tutor?.name || "-"}</td>
                  <td className="px-4 py-3 text-navy-600">
                    {s.dayOfWeek.map((d) => dayLabel[d]).join(", ")}
                  </td>
                  <td className="px-4 py-3 text-navy-600">
                    {s.startTime} - {s.endTime}
                  </td>
                  <td className="px-4 py-3 text-navy-600">
                    {s._count.enrollments} / {s.maxCapacity}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/jadwal/${s.id}`}
                        className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:border-gold-400 hover:text-gold-600"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteSchedule.bind(null, s.id)}
                        confirmText={`Hapus jadwal "${s.name}"?`}
                      />
                    </div>
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
