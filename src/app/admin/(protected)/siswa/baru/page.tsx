import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createStudent } from "@/lib/actions";
import StudentFormFields from "@/components/admin/StudentFormFields";

export default async function NewStudentPage() {
  const parents = await prisma.user.findMany({ where: { role: "PARENT" }, orderBy: { name: "asc" } });

  return (
    <div>
      <Link href="/admin/siswa" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Tambah Siswa</h1>

      {parents.length === 0 && (
        <div className="mt-4 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-navy-700">
          Belum ada akun Orang Tua. Buat dulu di menu{" "}
          <Link href="/admin/pengguna/baru" className="font-semibold underline">
            Pengguna
          </Link>
          .
        </div>
      )}

      <form
        action={createStudent}
        className="mt-6 max-w-xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <StudentFormFields parents={parents} />
        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          Simpan Siswa
        </button>
      </form>
    </div>
  );
}
