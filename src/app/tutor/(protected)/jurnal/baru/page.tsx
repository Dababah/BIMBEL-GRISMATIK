import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createJournal } from "@/lib/actions";
import { FormField, inputClass } from "@/components/admin/FormField";

export default async function NewJournalPage() {
  const session = await getServerSession(authOptions);
  const tutorId = session!.user.id;

  const schedules = await prisma.schedule.findMany({
    where: { tutorId, isActive: true },
    include: { program: true },
    orderBy: { name: "asc" },
  });

  const today = new Date().toISOString().slice(0, 10);

  return (
    <div>
      <Link href="/tutor/jurnal" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Tulis Jurnal Kelas</h1>

      {schedules.length === 0 ? (
        <p className="mt-4 rounded-xl border border-gold-300 bg-gold-50 px-4 py-3 text-sm text-navy-700">
          Anda belum ditugaskan ke jadwal kelas manapun.
        </p>
      ) : (
        <form
          action={createJournal}
          className="mt-6 max-w-xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
        >
          <FormField label="Jadwal Kelas" htmlFor="scheduleId" required>
            <select id="scheduleId" name="scheduleId" required defaultValue="" className={inputClass}>
              <option value="" disabled>
                Pilih jadwal
              </option>
              {schedules.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} &mdash; {s.program.title}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Tanggal Pertemuan" htmlFor="date" required>
            <input id="date" name="date" type="date" required defaultValue={today} className={inputClass} />
          </FormField>

          <FormField label="Materi yang Diajarkan" htmlFor="material" required>
            <textarea id="material" name="material" required rows={3} placeholder="Contoh: Perkalian dan pembagian bersusun" className={inputClass} />
          </FormField>

          <FormField label="Catatan Tambahan" htmlFor="notes" hint="Opsional">
            <textarea id="notes" name="notes" rows={2} className={inputClass} />
          </FormField>

          <button
            type="submit"
            className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
          >
            Simpan Jurnal
          </button>
        </form>
      )}
    </div>
  );
}
