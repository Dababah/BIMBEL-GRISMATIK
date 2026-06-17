import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePromoConfig } from "@/lib/actions";
import PromoConfigFormFields from "@/components/admin/PromoConfigFormFields";

export default async function EditPromoPage({ params }: { params: { id: string } }) {
  const promo = await prisma.promoConfig.findUnique({ where: { id: params.id } });

  if (!promo) {
    notFound();
  }

  const updateWithId = updatePromoConfig.bind(null, params.id);

  return (
    <div>
      <Link href="/admin/promo" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Edit Promo</h1>

      <form
        action={updateWithId}
        className="mt-6 max-w-xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <PromoConfigFormFields promo={promo} />
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
