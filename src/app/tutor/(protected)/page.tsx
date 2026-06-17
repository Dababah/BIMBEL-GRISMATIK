import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const dayLabel = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

export default async function TutorDashboardPage() {
  const session = await getServerSession(authOptions);
  const tutorId = session!.user.id;

  const schedules = await prisma.schedule.findMany({
    where: { tutorId, isActive: true },
    include: { program: true, _count: { select: { enrollments: true } } },
    orderBy: { name: "asc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-800">Dashboard Tutor</h1>
      <p className="mt-1 text-sm text-navy-500">Selamat datang, berikut kelas yang Anda ajar.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {schedules.length === 0 ? (
          <p className="rounded-2xl border border-navy-100 bg-white p-6 text-sm text-navy-500 shadow-sm sm:col-span-3">
            Anda belum ditugaskan ke jadwal kelas manapun. Hubungi Admin untuk penugasan jadwal.
          </p>
        ) : (
          schedules.map((s) => (
            <div key={s.id} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
              <p className="font-display text-lg font-semibold text-navy-800">{s.name}</p>
              <p className="mt-1 text-sm text-navy-500">{s.program.title}</p>
              <p className="mt-3 text-xs text-navy-500">
                {s.dayOfWeek.map((d) => dayLabel[d]).join(", ")} &middot; {s.startTime}-{s.endTime}
              </p>
              <p className="mt-1 text-xs text-navy-500">
                Siswa terdaftar: {s._count.enrollments} / {s.maxCapacity}
              </p>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/tutor/kehadiran?scheduleId=${s.id}`}
                  className="rounded-full border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:border-gold-400 hover:text-gold-600"
                >
                  Isi Kehadiran
                </Link>
                <Link
                  href="/tutor/jurnal/baru"
                  className="rounded-full border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:border-gold-400 hover:text-gold-600"
                >
                  Tulis Jurnal
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
