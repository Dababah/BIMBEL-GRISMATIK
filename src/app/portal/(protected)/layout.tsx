import { requireRole } from "@/lib/role-guard";
import PortalShell from "@/components/PortalShell";
import { IconGrid } from "@/components/portal-icons";

export const dynamic = "force-dynamic";

export default async function ParentPortalLayout({ children }: { children: React.ReactNode }) {
  const session = await requireRole(["PARENT"]);

  const navItems = [{ href: "/portal", label: "Anak Saya", icon: <IconGrid /> }];

  return (
    <PortalShell userName={session.user.name || session.user.email || "Orang Tua"} portalLabel="Portal Orang Tua" navItems={navItems}>
      {children}
    </PortalShell>
  );
}
