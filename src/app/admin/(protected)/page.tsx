import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const [
    programCount,
    testimonialCount,
    galleryCount,
    newRegistrationCount,
    studentCount,
    tutorCount,
    parentCount,
    scheduleCount,
    pendingInvoiceCount,
  ] = await Promise.all([
    prisma.program.count(),
    prisma.testimonial.count(),
    prisma.galleryItem.count(),
    prisma.registration.count({ where: { status: "BARU" } }),
    prisma.student.count({ where: { isActive: true } }),
    prisma.user.count({ where: { role: "TUTOR" } }),
    prisma.user.count({ where: { role: "PARENT" } }),
    prisma.schedule.count({ where: { isActive: true } }),
    prisma.invoice.count({ where: { status: { in: ["UNPAID", "PENDING_VERIFICATION"] } } }),
  ]);

  const recentRegistrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  const cmsStats = [
    { label: "Program Aktif", value: programCount, href: "/admin/program" },
    { label: "Testimoni", value: testimonialCount, href: "/admin/testimoni" },
    { label: "Foto Galeri", value: galleryCount, href: "/admin/galeri" },
    { label: "Lead Pendaftaran Baru", value: newRegistrationCount, href: "/admin/pendaftaran" },
  ];

  const academicStats = [
    { label: "Siswa Aktif", value: studentCount, href: "/admin/siswa" },
    { label: "Jadwal Kelas Aktif", value: scheduleCount, href: "/admin/jadwal" },
    { label: "Tutor", value: tutorCount, href: "/admin/pengguna" },
    { label: "Orang Tua", value: parentCount, href: "/admin/pengguna" },
    { label: "Invoice Belum Lunas", value: pendingInvoiceCount, href: "/admin/invoice" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-800">Dashboard</h1>
      <p className="mt-1 text-sm text-navy-500">
        Ringkasan konten situs dan aktivitas akademik Bimbel Grismatik.
      </p>

      <h2 className="mt-6 text-sm font-semibold uppercase tracking-wide text-navy-400">
        Konten Situs
      </h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cmsStats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm text-navy-500">{stat.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-navy-800">{stat.value}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-navy-400">
        Akademik & Operasional
      </h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {academicStats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <p className="text-sm text-navy-500">{stat.label}</p>
            <p className="mt-2 font-display text-3xl font-semibold text-navy-800">{stat.value}</p>
          </Link>
        ))}
      </div>

      {newRegistrationCount > 0 && (
        <div className="mt-6 rounded-2xl border border-gold-300 bg-gold-50 p-4 text-sm text-navy-700">
          Ada <span className="font-semibold">{newRegistrationCount}</span> lead pendaftaran baru
          yang belum ditindaklanjuti.{" "}
          <Link href="/admin/pendaftaran" className="font-semibold text-gold-700 underline">
            Lihat sekarang
          </Link>
        </div>
      )}

      <div className="mt-8">
        <h2 className="font-display text-lg font-semibold text-navy-800">Lead Pendaftaran Terbaru</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
          {recentRegistrations.length === 0 ? (
            <p className="p-5 text-sm text-navy-500">Belum ada lead pendaftaran.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-50 text-navy-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Nama</th>
                  <th className="px-4 py-3 font-medium">WhatsApp</th>
                  <th className="px-4 py-3 font-medium">Program</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {recentRegistrations.map((reg) => (
                  <tr key={reg.id}>
                    <td className="px-4 py-3 font-medium text-navy-800">{reg.name}</td>
                    <td className="px-4 py-3 text-navy-600">{reg.phone}</td>
                    <td className="px-4 py-3 text-navy-600">{reg.programInterest || "-"}</td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-navy-100 px-2.5 py-1 text-xs font-medium capitalize text-navy-700">
                        {reg.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-navy-500">
                      {reg.createdAt.toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
