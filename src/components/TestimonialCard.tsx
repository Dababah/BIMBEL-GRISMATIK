import type { Testimonial } from "@prisma/client";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm">
      <div className="mb-3 flex gap-1 text-gold-500" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill={i < testimonial.rating ? "currentColor" : "none"}
            stroke="currentColor"
          >
            <path
              d="M10 1.5 12.4 6.8 18.2 7.6 14 11.6 15 17.4 10 14.6 5 17.4 6 11.6 1.8 7.6 7.6 6.8Z"
              strokeWidth="1"
            />
          </svg>
        ))}
      </div>
      <blockquote className="flex-1 text-sm leading-relaxed text-navy-700">
        &ldquo;{testimonial.message}&rdquo;
      </blockquote>
      <figcaption className="mt-4 border-t border-navy-100 pt-3">
        <p className="font-display text-base font-semibold text-navy-800">{testimonial.name}</p>
        {testimonial.role && <p className="text-xs text-navy-500">{testimonial.role}</p>}
      </figcaption>
    </figure>
  );
}
