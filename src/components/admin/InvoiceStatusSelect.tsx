"use client";

import { useState } from "react";
import { updateInvoiceStatus } from "@/lib/actions";
import type { InvoiceStatus } from "@prisma/client";

const options: { value: InvoiceStatus; label: string }[] = [
  { value: "UNPAID", label: "Belum Bayar" },
  { value: "PENDING_VERIFICATION", label: "Menunggu Verifikasi" },
  { value: "PAID", label: "Lunas" },
];

const color: Record<string, string> = {
  UNPAID: "bg-red-100 text-red-700",
  PENDING_VERIFICATION: "bg-gold-100 text-gold-700",
  PAID: "bg-green-100 text-green-700",
};

export default function InvoiceStatusSelect({ id, status }: { id: string; status: InvoiceStatus }) {
  const [current, setCurrent] = useState<InvoiceStatus>(status);
  const [saving, setSaving] = useState(false);

  async function handleChange(value: InvoiceStatus) {
    setCurrent(value);
    setSaving(true);
    await updateInvoiceStatus(id, value);
    setSaving(false);
  }

  return (
    <select
      value={current}
      disabled={saving}
      onChange={(e) => handleChange(e.target.value as InvoiceStatus)}
      className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold ${color[current]}`}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
