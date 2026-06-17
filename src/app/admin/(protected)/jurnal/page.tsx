import { prisma } from "@/lib/prisma";
import { deleteJournal } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminJurnalPage() {
  const journals = await prisma.journal.findMany({
    orderBy: { date: "desc" },
    take: 100,
    include: { tutor: true, schedule: { include: { program: true } } },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-800">Jurnal Tutor</h1>
      <p className="mt-1 text-sm text-navy-500">
        Oversight catatan pertemuan kelas yang ditulis oleh Tutor (100 data terbaru).
      </p>

      <div className="mt-6 space-y-3">
        {journals.length === 0 ? (
          <p className="rounded-2xl border border-navy-100 bg-white p-6 text-sm text-navy-500 shadow-sm">
            Belum ada jurnal.
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
                    {j.date.toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })} &middot;
                    Tutor: {j.tutor.name}
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
