"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "grid" },
  { href: "/admin/program", label: "Program", icon: "book" },
  { href: "/admin/testimoni", label: "Testimoni", icon: "chat" },
  { href: "/admin/galeri", label: "Galeri", icon: "image" },
  { href: "/admin/pendaftaran", label: "Pendaftaran (Lead)", icon: "inbox" },
  { href: "/admin/pengaturan", label: "Pengaturan Situs", icon: "settings" },
  { href: "/admin/pengguna", label: "Pengguna (Tutor/Ortu)", icon: "users" },
  { href: "/admin/siswa", label: "Siswa", icon: "student" },
  { href: "/admin/jadwal", label: "Jadwal Kelas", icon: "calendar" },
  { href: "/admin/pendaftaran-kelas", label: "Penempatan Kelas", icon: "clipboard" },
  { href: "/admin/kehadiran", label: "Kehadiran", icon: "check" },
  { href: "/admin/invoice", label: "Invoice", icon: "wallet" },
  { href: "/admin/rapor", label: "Rapor", icon: "award" },
  { href: "/admin/jurnal", label: "Jurnal Tutor", icon: "edit" },
  { href: "/admin/promo", label: "Promo", icon: "tag" },
];

function NavIcon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 };
  switch (name) {
    case "grid":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z" strokeLinejoin="round" />
          <path d="M4 4v13a3 3 0 0 0 3 3" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M21 12a8 8 0 1 1-3.2-6.4L21 4l-1 4.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3 12a8 8 0 0 0 8 8" strokeLinecap="round" />
        </svg>
      );
    case "image":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="9" cy="9" r="2" />
          <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "inbox":
      return (
        <svg {...common}>
          <path d="M4 4h16l-2 9H6z" strokeLinejoin="round" />
          <path d="M4 13v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-6" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.87-.34 1.7 1.7 0 0 0-1 1.55V21a2 2 0 1 1-4 0v-.09a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.55-1H3a2 2 0 1 1 0-4h.09A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.87l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.55V3a2 2 0 1 1 4 0v.09a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.55 1H21a2 2 0 1 1 0 4h-.09a1.7 1.7 0 0 0-1.51 1z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3 2.5-5 6-5s6 2 6 5" strokeLinecap="round" />
          <circle cx="17" cy="9" r="2.5" />
          <path d="M16 13.5c2.5.3 4 1.8 4 4.5" strokeLinecap="round" />
        </svg>
      );
    case "student":
      return (
        <svg {...common}>
          <path d="M12 3 2 8l10 5 10-5z" strokeLinejoin="round" />
          <path d="M6 10.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" strokeLinecap="round" />
        </svg>
      );
    case "clipboard":
      return (
        <svg {...common}>
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1" />
          <path d="M9 11l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M8.5 12.5l2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="18" height="13" rx="2" />
          <path d="M3 10h18" />
          <circle cx="16" cy="14" r="1.2" fill="currentColor" />
        </svg>
      );
    case "award":
      return (
        <svg {...common}>
          <circle cx="12" cy="9" r="5" />
          <path d="M8.5 13.5 7 21l5-2.5L17 21l-1.5-7.5" strokeLinejoin="round" />
        </svg>
      );
    case "edit":
      return (
        <svg {...common}>
          <path d="M4 20h4l10-10-4-4L4 16z" strokeLinejoin="round" />
          <path d="M13 7l4 4" />
        </svg>
      );
    case "tag":
      return (
        <svg {...common}>
          <path d="M20 12 12 20l-9-9V4h7z" strokeLinejoin="round" />
          <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" />
        </svg>
      );
    default:
      return null;
  }
}

export default function AdminShell({
  children,
  adminName,
}: {
  children: React.ReactNode;
  adminName: string;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-navy-50 lg:flex">
      <aside className="flex flex-col gap-1 border-b border-navy-100 bg-navy-900 p-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r lg:p-6">
        <div className="mb-4 flex items-center gap-3 px-2">
          <Image src="/logo.jpg" alt="Logo" width={36} height={36} className="h-9 w-9 rounded-full object-cover" />
          <div>
            <p className="font-display text-sm font-semibold text-white">Bimbel Grismatik</p>
            <p className="text-xs text-navy-400">Admin Dashboard</p>
          </div>
        </div>
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-gold-400 text-navy-900"
                    : "text-navy-200 hover:bg-navy-800 hover:text-white"
                }`}
              >
                <NavIcon name={item.icon} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-4 border-t border-navy-700 pt-4">
          <p className="px-2 text-xs text-navy-400">Masuk sebagai</p>
          <p className="px-2 text-sm font-semibold text-white">{adminName}</p>
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
