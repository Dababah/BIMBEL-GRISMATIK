import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePromoConfig } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";

export default async function AdminPromoPage() {
  const promos = await prisma.promoConfig.findMany({ orderBy: { startDate: "desc" } });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold text-navy-800">Promo</h1>
          <p className="mt-1 text-sm text-navy-500">Kelola promo/diskon untuk pendaftaran atau SPP.</p>
        </div>
        <Link
          href="/admin/promo/baru"
          className="rounded-full bg-navy-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          + Tambah Promo
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm">
        {promos.length === 0 ? (
          <p className="p-6 text-sm text-navy-500">Belum ada promo.</p>
        ) : (
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="bg-navy-50 text-navy-500">
              <tr>
                <th className="px-4 py-3 font-medium">Nama Promo</th>
                <th className="px-4 py-3 font-medium">Tipe</th>
                <th className="px-4 py-3 font-medium">Nilai</th>
                <th className="px-4 py-3 font-medium">Periode</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {promos.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 font-medium text-navy-800">{p.name}</td>
                  <td className="px-4 py-3 text-navy-600">{p.discountType}</td>
                  <td className="px-4 py-3 text-navy-600">{p.discountValue}</td>
                  <td className="px-4 py-3 text-navy-600">
                    {p.startDate.toLocaleDateString("id-ID")} - {p.endDate.toLocaleDateString("id-ID")}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        p.isActive ? "bg-green-100 text-green-700" : "bg-navy-100 text-navy-500"
                      }`}
                    >
                      {p.isActive ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Link
                        href={`/admin/promo/${p.id}`}
                        className="rounded-lg border border-navy-200 px-3 py-1.5 text-xs font-semibold text-navy-700 hover:border-gold-400 hover:text-gold-600"
                      >
                        Edit
                      </Link>
                      <DeleteButton
                        action={deletePromoConfig.bind(null, p.id)}
                        confirmText={`Hapus promo "${p.name}"?`}
                      />
                    </div>
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
