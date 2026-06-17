import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteStudent } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

const levelLabel: Record<string, string> = {
  CALISTUNG: "Calistung",
  SD: "SD",
  SMP: "SMP",
  SMA: "SMA",
};

export default async function AdminSiswaPage() {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
    include: { parent: true },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-800">Siswa</h1>
          <p className="mt-1 text-sm text-navy-500">Kelola data siswa yang terdaftar aktif belajar.</p>
        </div>
        <Link
          href="/admin/siswa/baru"
          className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          + Tambah Siswa
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm">
        {students.length === 0 ? (
          <p className="p-6 text-sm text-navy-500">
            Belum ada siswa. Pastikan sudah membuat akun Orang Tua di menu Pengguna sebelum
            menambah siswa.
          </p>
        ) : (
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-navy-50 text-navy-500">
              <tr>
                <th className="px-4 py-3 font-medium">Kode</th>
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">Jenjang</th>
                <th className="px-4 py-3 font-medium">Orang Tua</th>
                <th className="px-4 py-3 font-medium">Ngaji</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {students.map((s) => (
                <tr key={s.id}>
                  <td className="px-4 py-3 font-mono text-xs text-navy-500">{s.studentCode}</td>
                  <td className="px-4 py-3 font-medium text-navy-800">{s.name}</td>
                  <td className="px-4 py-3 text-navy-600">{levelLabel[s.level]}</td>
                  <td className="px-4 py-3 text-navy-600">{s.parent.name}</td>
                  <td className="px-4 py-3 text-navy-600">{s.hasNgaji ? "Ya" : "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        s.isActive ? "bg-green-100 text-green-700" : "bg-navy-100 text-navy-500"
                      }`}
                    >
                      {s.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/siswa/${s.id}`}
                        className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:border-gold-400 hover:text-gold-600"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteStudent.bind(null, s.id)}
                        confirmText={`Hapus siswa "${s.name}"? Seluruh data kehadiran, invoice, dan rapor terkait juga akan terhapus.`}
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
