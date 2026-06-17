import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteInvoice } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import InvoiceStatusSelect from "@/components/admin/InvoiceStatusSelect";

const monthNames = [
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
];

function formatRupiah(amount: number) {
  return `Rp${amount.toLocaleString("id-ID")}`;
}

export default async function AdminInvoicePage() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { createdAt: "desc" },
    include: { student: true },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-800">Invoice</h1>
          <p className="mt-1 text-sm text-navy-500">Kelola tagihan bulanan dan verifikasi bukti bayar.</p>
        </div>
        <Link
          href="/admin/invoice/baru"
          className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          + Buat Invoice
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm">
        {invoices.length === 0 ? (
          <p className="p-6 text-sm text-navy-500">Belum ada invoice.</p>
        ) : (
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-navy-50 text-navy-500">
              <tr>
                <th className="px-4 py-3 font-medium">Siswa</th>
                <th className="px-4 py-3 font-medium">Periode</th>
                <th className="px-4 py-3 font-medium">Total</th>
                <th className="px-4 py-3 font-medium">Bukti Bayar</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td className="px-4 py-3 font-medium text-navy-800">{inv.student.name}</td>
                  <td className="px-4 py-3 text-navy-600">
                    {monthNames[inv.month - 1]} {inv.year}
                  </td>
                  <td className="px-4 py-3 font-semibold text-navy-800">{formatRupiah(inv.totalAmount)}</td>
                  <td className="px-4 py-3">
                    {inv.proofUrl ? (
                      <a
                        href={inv.proofUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-navy-700 underline hover:text-gold-600"
                      >
                        Lihat bukti
                      </a>
                    ) : (
                      <span className="text-navy-400">Belum ada</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <InvoiceStatusSelect id={inv.id} status={inv.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DeleteButton
                      action={deleteInvoice.bind(null, inv.id)}
                      confirmText={`Hapus invoice "${inv.student.name}" periode ${monthNames[inv.month - 1]} ${inv.year}?`}
                    />
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
