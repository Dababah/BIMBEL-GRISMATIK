import Link from "next/link";
import { createUser } from "@/lib/actions";
import { FormField, inputClass } from "@/components/admin/FormField";

export default function NewUserPage() {
  return (
    <div>
      <Link href="/admin/pengguna" className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">Tambah Pengguna</h1>

      <form
        action={createUser}
        className="mt-6 max-w-xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8"
      >
        <FormField label="Role" htmlFor="role" required>
          <select id="role" name="role" required defaultValue="PARENT" className={inputClass}>
            <option value="PARENT">Orang Tua</option>
            <option value="TUTOR">Tutor</option>
          </select>
        </FormField>

        <FormField label="Nama Lengkap" htmlFor="name" required>
          <input id="name" name="name" type="text" required placeholder="Contoh: Budi Santoso" className={inputClass} />
        </FormField>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Username" htmlFor="username" required hint="Dipakai untuk login, tanpa spasi">
            <input id="username" name="username" type="text" required placeholder="budi" className={inputClass} />
          </FormField>
          <FormField label="Email" htmlFor="email" hint="Opsional, bisa juga dipakai untuk login">
            <input id="email" name="email" type="email" placeholder="budi@email.com" className={inputClass} />
          </FormField>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <FormField label="Nomor Telepon / WhatsApp" htmlFor="phone">
            <input id="phone" name="phone" type="tel" placeholder="08xxxxxxxxxx" className={inputClass} />
          </FormField>
          <FormField label="Password Awal" htmlFor="password" required>
            <input id="password" name="password" type="text" required placeholder="Minimal 6 karakter" className={inputClass} />
          </FormField>
        </div>

        <FormField label="Alamat" htmlFor="address" hint="Opsional">
          <textarea id="address" name="address" rows={2} className={inputClass} />
        </FormField>

        <button
          type="submit"
          className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900"
        >
          Simpan Pengguna
        </button>
      </form>
    </div>
  );
}
