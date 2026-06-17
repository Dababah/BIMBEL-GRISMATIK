import type { Student, User } from "@prisma/client";
import { FormField, inputClass } from "@/components/admin/FormField";

export default function StudentFormFields({
  student,
  parents,
}: {
  student?: Student;
  parents: User[];
}) {
  const birthDateValue = student?.birthDate
    ? new Date(student.birthDate).toISOString().slice(0, 10)
    : "";

  return (
    <>
      <FormField label="Nama Siswa" htmlFor="name" required>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={student?.name}
          placeholder="Nama lengkap siswa"
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Jenjang" htmlFor="level" required>
          <select id="level" name="level" required defaultValue={student?.level || "SD"} className={inputClass}>
            <option value="CALISTUNG">Calistung</option>
            <option value="SD">SD</option>
            <option value="SMP">SMP</option>
            <option value="SMA">SMA</option>
          </select>
        </FormField>
        <FormField label="Tanggal Lahir" htmlFor="birthDate" hint="Opsional">
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            defaultValue={birthDateValue}
            className={inputClass}
          />
        </FormField>
      </div>

      <FormField label="Orang Tua / Wali" htmlFor="parentId" required hint="Akun orang tua harus sudah dibuat di menu Pengguna">
        <select id="parentId" name="parentId" required defaultValue={student?.parentId || ""} className={inputClass}>
          <option value="" disabled>
            Pilih orang tua
          </option>
          {parents.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.username})
            </option>
          ))}
        </select>
      </FormField>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
        <label className="flex items-center gap-2.5 text-sm font-medium text-navy-700">
          <input
            type="checkbox"
            name="hasNgaji"
            defaultChecked={student?.hasNgaji}
            className="h-4 w-4 rounded border-navy-300 text-gold-500 focus:ring-gold-400"
          />
          Mengambil paket Les Ngaji
        </label>
        <label className="flex items-center gap-2.5 text-sm font-medium text-navy-700">
          <input
            type="checkbox"
            name="isActive"
            defaultChecked={student ? student.isActive : true}
            className="h-4 w-4 rounded border-navy-300 text-gold-500 focus:ring-gold-400"
          />
          Siswa aktif belajar
        </label>
      </div>
    </>
  );
}
