"use client";

import { useState, type FormEvent } from "react";

const classOptions = [
  "TK",
  "SD Kelas 1",
  "SD Kelas 2",
  "SD Kelas 3",
  "SD Kelas 4",
  "SD Kelas 5",
  "SD Kelas 6",
  "SMP Kelas 7",
  "SMP Kelas 8",
  "SMP Kelas 9",
  "SMA Kelas 10",
  "SMA Kelas 11",
  "SMA Kelas 12",
  "Umum",
];

export default function RegistrationForm({ programOptions }: { programOptions: string[] }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      phone: String(formData.get("phone") || ""),
      email: String(formData.get("email") || ""),
      studentClass: String(formData.get("studentClass") || ""),
      programInterest: String(formData.get("programInterest") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const res = await fetch("/api/pendaftaran", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Terjadi kesalahan. Silakan coba lagi.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-gold-200 bg-gold-50 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-400 text-navy-900">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h3 className="mt-4 font-display text-xl font-semibold text-navy-800">
          Pendaftaran berhasil dikirim!
        </h3>
        <p className="mt-2 text-sm text-navy-600">
          Terima kasih, data Anda sudah kami terima. Tim kami akan segera menghubungi Anda
          melalui nomor WhatsApp yang Anda berikan.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 rounded-full border border-navy-300 px-5 py-2 text-sm font-semibold text-navy-700 hover:border-gold-500 hover:text-gold-600"
        >
          Isi Form Lain
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === "error" && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMessage}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-navy-800">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          placeholder="Contoh: Andi Saputra"
          className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-navy-800">
            Nomor WhatsApp <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="08xxxxxxxxxx"
            className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-navy-800">
            Email <span className="text-navy-400">(opsional)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="nama@email.com"
            className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="studentClass" className="block text-sm font-semibold text-navy-800">
            Kelas / Jenjang
          </label>
          <select
            id="studentClass"
            name="studentClass"
            className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 focus:border-gold-400"
            defaultValue=""
          >
            <option value="" disabled>
              Pilih kelas / jenjang
            </option>
            {classOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="programInterest" className="block text-sm font-semibold text-navy-800">
            Program yang Diminati
          </label>
          <select
            id="programInterest"
            name="programInterest"
            className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 focus:border-gold-400"
            defaultValue=""
          >
            <option value="" disabled>
              Pilih program
            </option>
            {programOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
            <option value="Belum tahu / tanya dulu">Belum tahu / tanya dulu</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-navy-800">
          Pesan / Pertanyaan Tambahan <span className="text-navy-400">(opsional)</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="Tuliskan pertanyaan atau hal lain yang ingin disampaikan"
          className="mt-1.5 w-full rounded-xl border border-navy-200 bg-white px-4 py-2.5 text-sm text-navy-800 placeholder:text-navy-300 focus:border-gold-400"
        />
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-gold-500 hover:text-navy-900 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "loading" ? "Mengirim..." : "Kirim Pendaftaran"}
      </button>
    </form>
  );
}
