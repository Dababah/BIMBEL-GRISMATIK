import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import AdminShell from "@/components/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Lapisan keamanan tambahan selain middleware: hanya SUPER_ADMIN yang boleh masuk.
  if (!session || session.user.role !== "SUPER_ADMIN") {
    redirect("/masuk");
  }

  return <AdminShell adminName={session.user?.name || session.user?.email || "Admin"}>{children}</AdminShell>;
}
