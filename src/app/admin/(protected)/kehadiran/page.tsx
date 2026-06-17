import { prisma } from "@/lib/prisma";

const statusColor: Record<string, string> = {
  HADIR: "bg-green-100 text-green-700",
  IZIN: "bg-blue-100 text-blue-700",
  SAKIT: "bg-gold-100 text-gold-700",
  ALFA: "bg-red-100 text-red-700",
};

export default async function AdminKehadiranPage() {
  const attendances = await prisma.attendance.findMany({
    orderBy: { date: "desc" },
    take: 100,
    include: { student: true, schedule: { include: { program: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-800">Kehadiran</h1>
      <p className="mt-1 text-sm text-navy-500">
        Riwayat kehadiran siswa (100 data terbaru). Pengisian dilakukan oleh Tutor lewat portalnya.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm">
        {attendances.length === 0 ? (
          <p className="p-6 text-sm text-navy-500">Belum ada data kehadiran.</p>
        ) : (
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-navy-50 text-navy-500">
              <tr>
                <th className="px-4 py-3 font-medium">Tanggal</th>
                <th className="px-4 py-3 font-medium">Siswa</th>
                <th className="px-4 py-3 font-medium">Jadwal</th>
                <th className="px-4 py-3 font-medium">Program</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {attendances.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-3 text-navy-500">
                    {a.date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td className="px-4 py-3 font-medium text-navy-800">{a.student.name}</td>
                  <td className="px-4 py-3 text-navy-600">{a.schedule.name}</td>
                  <td className="px-4 py-3 text-navy-600">{a.schedule.program.title}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusColor[a.status]}`}>
                      {a.status}
                    </span>
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
