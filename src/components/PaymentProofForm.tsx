"use client";

import { useState, type FormEvent } from "react";
import { submitPaymentProof } from "@/lib/actions";

export default function PaymentProofForm({ invoiceId }: { invoiceId: string }) {
  const [url, setUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    setSaving(true);
    await submitPaymentProof(invoiceId, url.trim());
    setSaving(false);
    setDone(true);
  }

  if (done) {
    return <p className="text-sm font-medium text-green-600">Bukti bayar terkirim, menunggu verifikasi Admin.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="url"
        required
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Tempel link foto/bukti transfer di sini"
        className="flex-1 rounded-lg border border-navy-200 px-3 py-2 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400"
      />
      <button
        type="submit"
        disabled={saving}
        className="rounded-lg bg-navy-800 px-4 py-2 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900 disabled:opacity-60"
      >
        {saving ? "Mengirim..." : "Kirim Bukti"}
      </button>
    </form>
  );
}
