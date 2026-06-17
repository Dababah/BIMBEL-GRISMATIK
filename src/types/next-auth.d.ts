import type { DefaultSession } from "next-auth";

// Menambahkan field "id" dan "role" ke tipe Session & JWT bawaan NextAuth,
// supaya bisa dipakai dengan aman di seluruh aplikasi (session.user.role, dsb).
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "SUPER_ADMIN" | "TUTOR" | "PARENT";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "SUPER_ADMIN" | "TUTOR" | "PARENT";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "SUPER_ADMIN" | "TUTOR" | "PARENT";
  }
}
