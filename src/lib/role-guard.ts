import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

type AppRole = "SUPER_ADMIN" | "TUTOR" | "PARENT";

/**
 * Memastikan pengguna sudah login dan memiliki salah satu role yang diizinkan.
 * Jika tidak, otomatis diarahkan ke halaman login (atau halaman lain jika ditentukan).
 * Dipakai di awal Server Action maupun di layout/halaman server component.
 */
export async function requireRole(allowed: AppRole[], redirectTo = "/masuk") {
  const session = await getServerSession(authOptions);

  if (!session || !allowed.includes(session.user.role)) {
    redirect(redirectTo);
  }

  return session;
}
