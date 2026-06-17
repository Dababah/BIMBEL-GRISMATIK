import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteReportPeriod } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function TutorRaporPage() {
  const session = await getServerSession(authOptions);
  const tutorId = session!.user.id;

  const periods = await prisma.reportPeriod.findMany({
    where: { tutorId },
    orderBy: { createdAt: "desc" },
    include: { student: true, _count: { select: { details: true } } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-800">Rapor Siswa</h1>
          <p className="mt-1 text-sm text-navy-500">Buat dan kelola rapor untuk siswa yang Anda ajar.</p>
        </div>
        <Link
          href="/tutor/rapor/baru"
          className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          + Buat Rapor
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm">
        {periods.length === 0 ? (
          <p className="p-6 text-sm text-navy-500">Belum ada rapor yang Anda buat.</p>
        ) : (
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="bg-navy-50 text-navy-500">
              <tr>
                <th className="px-4 py-3 font-medium">Siswa</th>
                <th className="px-4 py-3 font-medium">Periode</th>
                <th className="px-4 py-3 font-medium">Indikator</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {periods.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium text-navy-800">{p.student.name}</td>
                  <td className="px-4 py-3 text-navy-600">{p.periodName}</td>
                  <td className="px-4 py-3 text-navy-600">{p._count.details}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        p.isPublished ? "bg-green-100 text-green-700" : "bg-navy-100 text-navy-500"
                      }`}
                    >
                      {p.isPublished ? "Terbit" : "Draf"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/tutor/rapor/${p.id}`}
                        className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:border-gold-400 hover:text-gold-600"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteReportPeriod.bind(null, p.id)}
                        confirmText={`Hapus rapor "${p.student.name}" periode ${p.periodName}?`}
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
