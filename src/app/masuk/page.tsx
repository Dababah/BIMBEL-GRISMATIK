"use client";

import { useState, type FormEvent } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      identifier,
      password,
      redirect: false,
    });

    if (result?.error) {
      setLoading(false);
      setError("Email/Username atau password salah. Silakan coba lagi.");
      return;
    }

    const session = await getSession();
    const role = session?.user?.role;

    const destination = role === "SUPER_ADMIN" ? "/admin" : role === "TUTOR" ? "/tutor" : "/portal";

    router.push(destination);
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-900 px-5 py-12">
      <div className="w-full max-w-md rounded-2xl border border-navy-700 bg-navy-800 p-8 shadow-xl sm:p-10">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/logo.jpg"
            alt="Logo Bimbel Grismatik"
            width={64}
            height={64}
            className="h-16 w-16 rounded-full object-cover"
          />
          <h1 className="mt-4 font-display text-2xl font-semibold text-white">Masuk ke Sistem</h1>
          <p className="mt-1 text-sm text-navy-300">Bimbel Grismatik</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {error && (
            <div className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="identifier" className="block text-sm font-semibold text-navy-200">
              Email atau Username
            </label>
            <input
              id="identifier"
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="admin@grismatik.com"
              className="mt-1.5 w-full rounded-xl border border-navy-600 bg-navy-900 px-4 py-2.5 text-sm text-white placeholder:text-navy-500 focus:border-gold-400"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-navy-200">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="mt-1.5 w-full rounded-xl border border-navy-600 bg-navy-900 px-4 py-2.5 text-sm text-white placeholder:text-navy-500 focus:border-gold-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gold-400 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-navy-400">
          Halaman ini dipakai bersama untuk Admin, Tutor, dan Orang Tua. Anda akan otomatis
          diarahkan ke portal sesuai akun Anda.
        </p>

        <a href="/" className="mt-3 block text-center text-xs text-navy-500 hover:text-navy-300">
          &larr; Kembali ke situs utama
        </a>
      </div>
    </div>
  );
}
