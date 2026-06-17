import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProgram } from "@/lib/actions";
import ProgramFormFields from "@/components/admin/ProgramFormFields";

export default async function EditProgramPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const program = await prisma.program.findUnique({ where: { id } });

  if (!program) {
    notFound();
  }

  const updateProgramWithId = updateProgram.bind(null, id);

  return (
    <div>
      <Link href="/admin/program" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Edit Program</h1>

      <form
        action={updateProgramWithId}
        className="mt-6 max-w-2xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <ProgramFormFields program={program} />
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
