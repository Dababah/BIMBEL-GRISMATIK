import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteUser } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

const roleLabel: Record<string, string> = {
  SUPER_ADMIN: "Super Admin",
  TUTOR: "Tutor",
  PARENT: "Orang Tua",
};

const roleColor: Record<string, string> = {
  SUPER_ADMIN: "bg-navy-800 text-white",
  TUTOR: "bg-blue-100 text-blue-700",
  PARENT: "bg-green-100 text-green-700",
};

export default async function AdminPenggunaPage() {
  const users = await prisma.user.findMany({
    orderBy: [{ role: "asc" }, { createdAt: "desc" }],
    include: { _count: { select: { studentsAsParent: true } } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-800">Pengguna</h1>
          <p className="mt-1 text-sm text-navy-500">
            Kelola akun login untuk Tutor dan Orang Tua. Super Admin tidak bisa dibuat di sini.
          </p>
        </div>
        <Link
          href="/admin/pengguna/baru"
          className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          + Tambah Pengguna
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
        {users.length === 0 ? (
          <p className="p-6 text-sm text-navy-500">Belum ada pengguna.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-navy-500">
              <tr>
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">Username</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Telepon</th>
                <th className="px-4 py-3 font-medium">Role</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 font-medium text-navy-800">{user.name}</td>
                  <td className="px-4 py-3 text-navy-600">{user.username}</td>
                  <td className="px-4 py-3 text-navy-600">{user.email || "-"}</td>
                  <td className="px-4 py-3 text-navy-600">{user.phone || "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${roleColor[user.role]}`}>
                      {roleLabel[user.role]}
                      {user.role === "PARENT" && user._count.studentsAsParent > 0
                        ? ` (${user._count.studentsAsParent} anak)`
                        : ""}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {user.role !== "SUPER_ADMIN" && (
                      <DeleteButton
                        action={deleteUser.bind(null, user.id)}
                        confirmText={`Hapus pengguna "${user.name}"? Pastikan tidak ada data siswa/jurnal yang masih terkait.`}
                      />
                    )}
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
