"use client";

import { useState } from "react";
import { updateRegistrationStatus } from "@/lib/actions";
import type { RegistrationStatus } from "@prisma/client";

const statusOptions: { value: RegistrationStatus; label: string }[] = [
  { value: "BARU", label: "Baru" },
  { value: "DIHUBUNGI", label: "Dihubungi" },
  { value: "TERDAFTAR", label: "Terdaftar" },
  { value: "DITOLAK", label: "Ditolak" },
];

const statusColor: Record<string, string> = {
  BARU: "bg-gold-100 text-gold-700",
  DIHUBUNGI: "bg-blue-100 text-blue-700",
  TERDAFTAR: "bg-green-100 text-green-700",
  DITOLAK: "bg-red-100 text-red-700",
};

export default function StatusSelect({ id, status }: { id: number; status: RegistrationStatus }) {
  const [current, setCurrent] = useState<RegistrationStatus>(status);
  const [saving, setSaving] = useState(false);

  async function handleChange(value: RegistrationStatus) {
    setCurrent(value);
    setSaving(true);
    await updateRegistrationStatus(id, value);
    setSaving(false);
  }

  return (
    <select
      value={current}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value as RegistrationStatus)}
      className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold capitalize ${
        statusColor[current] || "bg-navy-100 text-navy-700"
      }`}
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
