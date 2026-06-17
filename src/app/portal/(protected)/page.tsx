import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const levelLabel: Record<string, string> = {
  CALISTUNG: "Calistung",
  SD: "SD",
  SMP: "SMP",
  SMA: "SMA",
};

export default async function ParentDashboardPage() {
  const session = await getServerSession(authOptions);
  const parentId = session!.user.id;

  const students = await prisma.student.findMany({
    where: { parentId },
    orderBy: { name: "asc" },
    include: {
      invoices: { where: { status: { in: ["UNPAID", "PENDING_VERIFICATION"] } } },
    },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-800">Anak Saya</h1>
      <p className="mt-1 text-sm text-navy-500">Pilih anak untuk melihat kehadiran, invoice, dan rapor.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {students.length === 0 ? (
          <p className="rounded-2xl border border-navy-100 bg-white p-6 text-sm text-navy-500 shadow-sm sm:col-span-3">
            Belum ada data anak yang terhubung dengan akun Anda. Hubungi Admin Bimbel Grismatik.
          </p>
        ) : (
          students.map((s) => (
            <Link
              key={s.id}
              href={`/portal/siswa/${s.id}`}
              className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="font-display text-lg font-semibold text-navy-800">{s.name}</p>
              <p className="mt-1 text-sm text-navy-500">
                {levelLabel[s.level]} &middot; {s.studentCode}
              </p>
              {s.invoices.length > 0 && (
                <p className="mt-3 inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold text-gold-700">
                  {s.invoices.length} invoice belum lunas
                </p>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
