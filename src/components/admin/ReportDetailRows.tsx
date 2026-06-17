"use client";

import { useState } from "react";

const rowInputClass =
  "w-full rounded-lg border border-navy-200 bg-white px-3 py-2 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400";

type Row = { key: string; value: string; category: string };

export default function ReportDetailRows({
  initialRows,
}: {
  initialRows?: Row[];
}) {
  const [rows, setRows] = useState<Row[]>(
    initialRows && initialRows.length > 0
      ? initialRows
      : [{ key: "", value: "", category: "AKADEMIK" }]
  );

  function updateRow(index: number, field: keyof Row, value: string) {
    setRows((prev) => prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, { key: "", value: "", category: "AKADEMIK" }]);
  }

  function removeRow(index: number) {
    setRows((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div>
      <label className="block text-sm font-semibold text-navy-800">Komponen Nilai / Penilaian</label>
      <p className="mt-1 text-xs text-navy-400">
        Tambahkan indikator penilaian sesuai kebutuhan (fleksibel untuk semua jenjang). Contoh:
        &ldquo;Pengenalan Huruf&rdquo; = &ldquo;Lancar&rdquo;, atau &ldquo;Quick Math Tricks&rdquo; = &ldquo;88&rdquo;.
      </p>

      <div className="mt-3 space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 rounded-xl border border-navy-100 bg-navy-50 p-3">
            <input
              type="text"
              value={row.key}
              onChange={(e) => updateRow(i, "key", e.target.value)}
              placeholder="Indikator (contoh: Hafalan Surat)"
              className={`col-span-12 sm:col-span-4 ${rowInputClass}`}
              name="metricKey[]"
            />
            <input
              type="text"
              value={row.value}
              onChange={(e) => updateRow(i, "value", e.target.value)}
              placeholder="Nilai / capaian"
              className={`col-span-8 sm:col-span-4 ${rowInputClass}`}
              name="metricValue[]"
            />
            <select
              value={row.category}
              onChange={(e) => updateRow(i, "category", e.target.value)}
              className={`col-span-3 sm:col-span-3 ${rowInputClass}`}
              name="category[]"
            >
              <option value="AKADEMIK">Akademik</option>
              <option value="NGAJI">Ngaji</option>
              <option value="KARAKTER">Karakter</option>
            </select>
            <button
              type="button"
              onClick={() => removeRow(i)}
              className="col-span-1 flex items-center justify-center rounded-lg border border-red-200 text-red-500 hover:bg-red-50"
              aria-label="Hapus baris"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-3 rounded-full border border-navy-300 px-4 py-2 text-xs font-semibold text-navy-700 hover:border-gold-400 hover:text-gold-600"
      >
        + Tambah Baris Nilai
      </button>
    </div>
  );
}
