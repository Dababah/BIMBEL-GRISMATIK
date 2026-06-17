import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-cream px-5 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-gold-600">
        404
      </p>
      <h1 className="mt-2 font-display text-3xl font-semibold text-navy-800">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-3 max-w-md text-sm text-navy-500">
        Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
