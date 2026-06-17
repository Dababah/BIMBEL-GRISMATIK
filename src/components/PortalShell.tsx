"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import type { ReactNode } from "react";

export type PortalNavItem = {
  href: string;
  label: string;
  icon: ReactNode;
};

export default function PortalShell({
  children,
  userName,
  portalLabel,
  navItems,
}: {
  children: ReactNode;
  userName: string;
  portalLabel: string;
  navItems: PortalNavItem[];
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-navy-50 lg:flex">
      <aside className="flex flex-col gap-1 border-b border-navy-100 bg-navy-900 p-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:p-6">
        <div className="mb-4 flex items-center gap-3 px-2">
          <Image src="/logo.jpg" alt="Logo" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="font-display text-sm font-semibold text-white">Bimbel Grismatik</p>
            <p className="text-xs text-navy-400">{portalLabel}</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active ? "bg-gold-400 text-navy-900" : "text-navy-200 hover:bg-navy-800 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 border-t border-navy-700 pt-4">
          <p className="px-2 text-xs text-navy-400">Masuk sebagai</p>
          <p className="px-2 text-sm font-semibold text-white">{userName}</p>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/masuk" })}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-navy-700 px-3 py-2 text-sm font-medium text-navy-200 hover:border-gold-400 hover:text-gold-300"
          >
            Keluar
          </button>
          <a href="/" className="mt-2 block px-2 text-center text-xs text-navy-500 hover:text-navy-300">
            &larr; Lihat situs utama
          </a>
        </div>
      </aside>

      <main className="flex-1 p-5 lg:p-10">{children}</main>
    </div>
  );
}
