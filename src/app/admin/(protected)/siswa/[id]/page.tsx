import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateStudent } from "@/lib/actions";
import StudentFormFields from "@/components/admin/StudentFormFields";

export default async function EditStudentPage({ params }: { params: { id: string } }) {
  const [student, parents] = await Promise.all([
    prisma.student.findUnique({ where: { id: params.id } }),
    prisma.user.findMany({ where: { role: "PARENT" }, orderBy: { name: "asc" } }),
  ]);

  if (!student) {
    notFound();
  }

  const updateStudentWithId = updateStudent.bind(null, params.id);

  return (
    <div>
      <Link href="/admin/siswa" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Edit Siswa</h1>
      <p className="mt-1 text-sm text-navy-500">Kode siswa: {student.studentCode}</p>

      <form
        action={updateStudentWithId}
        className="mt-6 max-w-xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <StudentFormFields student={student} parents={parents} />
        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}
