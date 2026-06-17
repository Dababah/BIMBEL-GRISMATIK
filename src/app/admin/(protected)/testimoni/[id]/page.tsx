import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateTestimonial } from "@/lib/actions";
import TestimonialFormFields from "@/components/admin/TestimonialFormFields";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  const testimonial = await prisma.testimonial.findUnique({ where: { id } });

  if (!testimonial) {
    notFound();
  }

  const updateTestimonialWithId = updateTestimonial.bind(null, id);

  return (
    <div>
      <Link href="/admin/testimoni" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Edit Testimoni</h1>

      <form
        action={updateTestimonialWithId}
        className="mt-6 max-w-2xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <TestimonialFormFields testimonial={testimonial} />
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
