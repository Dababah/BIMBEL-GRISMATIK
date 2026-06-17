import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteReportPeriod } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminRaporPage() {
  const periods = await prisma.reportPeriod.findMany({
    orderBy: { createdAt: "desc" },
    include: { student: true, tutor: true, _count: { select: { details: true } } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-800">Rapor</h1>
          <p className="mt-1 text-sm text-navy-500">Oversight seluruh rapor siswa yang diisi oleh Tutor.</p>
        </div>
        <Link
          href="/admin/rapor/baru"
          className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          + Buat Rapor
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm">
        {periods.length === 0 ? (
          <p className="p-6 text-sm text-navy-500">Belum ada rapor.</p>
        ) : (
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-navy-50 text-navy-500">
              <tr>
                <th className="px-4 py-3 font-medium">Siswa</th>
                <th className="px-4 py-3 font-medium">Periode</th>
                <th className="px-4 py-3 font-medium">Tutor</th>
                <th className="px-4 py-3 font-medium">Jumlah Indikator</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {periods.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium text-navy-800">{p.student.name}</td>
                  <td className="px-4 py-3 text-navy-600">{p.periodName}</td>
                  <td className="px-4 py-3 text-navy-600">{p.tutor?.name || "-"}</td>
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
                        href={`/admin/rapor/${p.id}`}
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
