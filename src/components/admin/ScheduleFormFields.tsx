import type { Schedule, Program, User } from "@prisma/client";
import { FormField, inputClass } from "@/components/admin/FormField";

const days = [
  { value: 1, label: "Senin" },
  { value: 2, label: "Selasa" },
  { value: 3, label: "Rabu" },
  { value: 4, label: "Kamis" },
  { value: 5, label: "Jumat" },
  { value: 6, label: "Sabtu" },
  { value: 0, label: "Minggu" },
];

export default function ScheduleFormFields({
  schedule,
  programs,
  tutors,
}: {
  schedule?: Schedule;
  programs: Program[];
  tutors: User[];
}) {
  const selectedDays = schedule?.dayOfWeek || [];

  return (
    <>
      <FormField label="Nama Jadwal" htmlFor="name" required hint="Contoh: Kelompok A - Senin & Rabu">
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={schedule?.name}
          placeholder="Kelompok A - Senin & Rabu"
          className={inputClass}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Program" htmlFor="programId" required>
          <select id="programId" name="programId" required defaultValue={schedule?.programId || ""} className={inputClass}>
            <option value="" disabled>
              Pilih program
            </option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Tutor Pengajar" htmlFor="tutorId" hint="Opsional, bisa ditentukan belakangan">
          <select id="tutorId" name="tutorId" defaultValue={schedule?.tutorId || ""} className={inputClass}>
            <option value="">Belum ditentukan</option>
            {tutors.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </FormField>
      </div>

      <FormField label="Hari Pertemuan" htmlFor="dayOfWeek" required>
        <div className="mt-1.5 flex flex-wrap gap-3">
          {days.map((d) => (
            <label
              key={d.value}
              className="flex items-center gap-2 rounded-xl border border-navy-200 bg-white px-3 py-2 text-sm text-navy-700"
            >
              <input
                type="checkbox"
                name="dayOfWeek"
                value={d.value}
                defaultChecked={selectedDays.includes(d.value)}
                className="h-4 w-4 rounded border-navy-300 text-gold-500 focus:ring-gold-400"
              />
              {d.label}
            </label>
          ))}
        </div>
      </FormField>

      <div className="grid gap-5 sm:grid-cols-3">
        <FormField label="Jam Mulai" htmlFor="startTime" required>
          <input
            id="startTime"
            name="startTime"
            type="time"
            required
            defaultValue={schedule?.startTime || "16:00"}
            className={inputClass}
          />
        </FormField>
        <FormField label="Jam Selesai" htmlFor="endTime" required>
          <input
            id="endTime"
            name="endTime"
            type="time"
            required
            defaultValue={schedule?.endTime || "17:30"}
            className={inputClass}
          />
        </FormField>
        <FormField label="Kapasitas Maks." htmlFor="maxCapacity">
          <input
            id="maxCapacity"
            name="maxCapacity"
            type="number"
            min={1}
            defaultValue={schedule?.maxCapacity ?? 15}
            className={inputClass}
          />
        </FormField>
      </div>

      <label className="flex items-center gap-2.5 text-sm font-medium text-navy-700">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={schedule ? schedule.isActive : true}
          className="h-4 w-4 rounded border-navy-300 text-gold-500 focus:ring-gold-400"
        />
        Jadwal aktif berjalan
      </label>
    </>
  );
}
