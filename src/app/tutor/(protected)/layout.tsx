import { requireRole } from "@/lib/role-guard";
import PortalShell from "@/components/PortalShell";
import { IconGrid, IconCalendar, IconEdit, IconAward } from "@/components/portal-icons";

export const dynamic = "force-dynamic";

export default async function TutorLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole(["TUTOR"]);

  const navItems = [
    { href: "/tutor", label: "Dashboard", icon: <IconGrid /> },
    { href: "/tutor/jurnal", label: "Jurnal", icon: <IconEdit /> },
    { href: "/tutor/kehadiran", label: "Kehadiran", icon: <IconCalendar /> },
    { href: "/tutor/rapor", label: "Rapor Siswa", icon: <IconAward /> },
  ];

  return (
    <PortalShell userName={session.user.name || session.user.email || "Tutor"} portalLabel="Portal Tutor" navItems={navItems}>
      {children}
    </PortalShell>
  );
}
