import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteJournal } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function TutorJurnalPage() {
  const session = await getServerSession(authOptions);
  const tutorId = session!.user.id;

  const journals = await prisma.journal.findMany({
    where: { tutorId },
    orderBy: { date: "desc" },
    include: { schedule: { include: { program: true } } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-800">Jurnal Kelas</h1>
          <p className="mt-1 text-sm text-navy-500">Catatan materi yang sudah Anda ajarkan.</p>
        </div>
        <Link
          href="/tutor/jurnal/baru"
          className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          + Tulis Jurnal
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        {journals.length === 0 ? (
          <p className="rounded-2xl border border-navy-100 bg-white p-6 text-sm text-navy-500 shadow-sm">
            Belum ada catatan jurnal.
          </p>
        ) : (
          journals.map((j) => (
            <div key={j.id} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-display text-base font-semibold text-navy-800">
                    {j.schedule.name} &mdash; {j.schedule.program.title}
                  </p>
                  <p className="text-xs text-navy-500">
                    {j.date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                  </p>
                </div>
                <DeleteButton action={deleteJournal.bind(null, j.id)} confirmText="Hapus catatan jurnal ini?" />
              </div>
              <p className="mt-3 text-sm text-navy-700">
                <span className="font-semibold">Materi:</span> {j.material}
              </p>
              {j.notes && <p className="mt-1 text-sm text-navy-600">Catatan: {j.notes}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
