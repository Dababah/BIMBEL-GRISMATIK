import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import PaymentProofForm from "@/components/PaymentProofForm";

const levelLabel: Record<string, string> = {
  CALISTUNG: "Calistung",
  SD: "SD",
  SMP: "SMP",
  SMA: "SMA",
};

const attendanceColor: Record<string, string> = {
  HADIR: "bg-green-100 text-green-700",
  IZIN: "bg-blue-100 text-blue-700",
  SAKIT: "bg-gold-100 text-gold-700",
  ALFA: "bg-red-100 text-red-700",
};

const invoiceStatusLabel: Record<string, string> = {
  UNPAID: "Belum Bayar",
  PENDING_VERIFICATION: "Menunggu Verifikasi",
  PAID: "Lunas",
};

const invoiceStatusColor: Record<string, string> = {
  UNPAID: "bg-red-100 text-red-700",
  PENDING_VERIFICATION: "bg-gold-100 text-gold-700",
  PAID: "bg-green-100 text-green-700",
};

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatRupiah(amount: number) {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

export default async function ParentStudentDetailPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const parentId = session!.user.id;

  const student = await prisma.student.findUnique({
    where: { id: params.id },
    include: {
      attendances: { orderBy: { date: "desc" }, take: 20, include: { schedule: true } },
      invoices: { orderBy: [{ year: "desc" }, { month: "desc" }] },
      reportPeriods: {
        where: { isPublished: true },
        orderBy: { createdAt: "desc" },
        include: { details: true, tutor: true },
      },
    },
  });

  if (!student) {
    notFound();
  }

  if (student.parentId !== parentId) {
    redirect("/portal");
  }

  return (
    <div>
      <Link href="/portal" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali ke daftar anak
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">{student.name}</h1>
      <p className="mt-1 text-sm text-navy-500">
        {levelLabel[student.level]} &middot; {student.studentCode}
      </p>

      {/* INVOICE */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-navy-800">Invoice / Tagihan</h2>
        <div className="mt-3 space-y-3">
          {student.invoices.length === 0 ? (
            <p className="rounded-2xl border border-navy-100 bg-white p-5 text-sm text-navy-500 shadow-sm">
              Belum ada invoice.
            </p>
          ) : (
            student.invoices.map((inv) => (
              <div key={inv.id} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-navy-800">
                      {monthNames[inv.month - 1]} {inv.year}
                    </p>
                    <p className="text-sm text-navy-500">Total: {formatRupiah(inv.totalAmount)}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${invoiceStatusColor[inv.status]}`}>
                    {invoiceStatusLabel[inv.status]}
                  </span>
                </div>
                {inv.status === "UNPAID" && (
                  <div className="mt-4 border-t border-navy-100 pt-4">
                    <p className="mb-2 text-xs text-navy-500">
                      Sudah transfer? Tempel link foto bukti transfer di bawah ini.
                    </p>
                    <PaymentProofForm invoiceId={inv.id} />
                  </div>
                )}
                {inv.status === "PENDING_VERIFICATION" && inv.proofUrl && (
                  <p className="mt-3 text-sm text-navy-600">
                    Bukti bayar terkirim:{" "}
                    <a href={inv.proofUrl} target="_blank" rel="noreferrer" className="underline hover:text-gold-600">
                      Lihat bukti
                    </a>{" "}
                    &middot; menunggu verifikasi Admin.
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </section>

      {/* KEHADIRAN */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-navy-800">Riwayat Kehadiran</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-sm">
          {student.attendances.length === 0 ? (
            <p className="p-5 text-sm text-navy-500">Belum ada data kehadiran.</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="bg-navy-50 text-navy-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Tanggal</th>
                  <th className="px-4 py-3 font-medium">Kelas</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy-100">
                {student.attendances.map((a) => (
                  <tr key={a.id}>
                    <td className="px-4 py-3 text-navy-600">
                      {a.date.toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-3 text-navy-600">{a.schedule.name}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${attendanceColor[a.status]}`}>
                        {a.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* RAPOR */}
      <section className="mt-8">
        <h2 className="font-display text-lg font-semibold text-navy-800">Rapor</h2>
        <div className="mt-3 space-y-4">
          {student.reportPeriods.length === 0 ? (
            <p className="rounded-2xl border border-navy-100 bg-white p-5 text-sm text-navy-500 shadow-sm">
              Belum ada rapor yang diterbitkan.
            </p>
          ) : (
            student.reportPeriods.map((rp) => (
              <div key={rp.id} className="rounded-2xl border border-navy-100 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-base font-semibold text-navy-800">{rp.periodName}</p>
                  {rp.pdfUrl && (
                    <a href={rp.pdfUrl} target="_blank" rel="noreferrer" className="text-sm text-navy-600 underline hover:text-gold-600">
                      Lihat PDF
                    </a>
                  )}
                </div>
                {rp.tutor && <p className="text-xs text-navy-500">Diisi oleh: {rp.tutor.name}</p>}
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {rp.details.map((d) => (
                    <div key={d.id} className="rounded-lg bg-navy-50 px-3 py-2 text-sm">
                      <span className="text-navy-500">{d.metricKey}: </span>
                      <span className="font-medium text-navy-800">{d.metricValue}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
