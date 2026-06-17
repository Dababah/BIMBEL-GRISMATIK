/**
 * Pembungkus query Prisma agar halaman publik tidak crash (error 500)
 * jika koneksi database belum diatur atau sedang tidak tersedia.
 * Jika query gagal, fungsi ini mengembalikan nilai fallback dan
 * mencatat error ke console (terlihat di terminal `npm run dev`).
 */
export async function safeQuery<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    console.error("Query database gagal, menggunakan data fallback:", error);
    return fallback;
  }
}
