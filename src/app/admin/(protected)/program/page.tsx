import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProgram } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminProgramPage() {
  const programs = await prisma.program.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-800">Program Bimbel</h1>
          <p className="mt-1 text-sm text-navy-500">Kelola daftar program yang ditampilkan di situs.</p>
        </div>
        <Link
          href="/admin/program/baru"
          className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          + Tambah Program
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
        {programs.length === 0 ? (
          <p className="p-6 text-sm text-navy-500">
            Belum ada program. Klik &ldquo;Tambah Program&rdquo; untuk menambahkan data pertama.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-navy-500">
              <tr>
                <th className="px-4 py-3 font-medium">Urutan</th>
                <th className="px-4 py-3 font-medium">Judul</th>
                <th className="px-4 py-3 font-medium">Jenjang</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {programs.map((program) => (
                <tr key={program.id}>
                  <td className="px-4 py-3 text-navy-500">{program.order}</td>
                  <td className="px-4 py-3 font-medium text-navy-800">{program.title}</td>
                  <td className="px-4 py-3 text-navy-600">{program.level || "-"}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        program.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-navy-100 text-navy-500"
                      }`}
                    >
                      {program.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/program/${program.id}`}
                        className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:border-gold-400 hover:text-gold-600"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        action={deleteProgram.bind(null, program.id)}
                        confirmText={`Hapus program "${program.title}"?`}
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
