export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow && (
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
          {eyebrow}
        </p>
      )}
      <h2 className="ink-stroke mt-2 font-display text-3xl font-semibold text-navy-800 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base leading-relaxed text-navy-600 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
