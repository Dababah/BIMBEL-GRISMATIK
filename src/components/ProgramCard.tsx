import type { Program } from "@prisma/client";

export default function ProgramCard({ program }: { program: Program }) {
  return (
    <div className="corner-accent flex h-full flex-col rounded-2xl border border-navy-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      {program.level && (
        <span className="mb-3 inline-block w-fit rounded-full bg-gold-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-gold-700">
          {program.level}
        </span>
      )}
      <h3 className="font-display text-xl font-semibold text-navy-800">{program.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-navy-600">{program.description}</p>
      <div className="mt-5 space-y-1 border-t border-navy-100 pt-4 text-sm text-navy-500">
        {program.schedule && (
          <p>
            <span className="font-semibold text-navy-700">Jadwal:</span> {program.schedule}
          </p>
        )}
        {program.price && (
          <p>
            <span className="font-semibold text-navy-700">Biaya:</span> {program.price}
          </p>
        )}
      </div>
    </div>
  );
}
