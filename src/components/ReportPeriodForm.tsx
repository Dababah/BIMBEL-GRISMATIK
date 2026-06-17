import type { ReportPeriod, ReportDetail, Student } from "@prisma/client";
import { FormField, inputClass } from "@/components/admin/FormField";
import ReportDetailRows from "@/components/admin/ReportDetailRows";

export default function ReportPeriodFormFields({
  reportPeriod,
  details,
  students,
  showStudentSelect = true,
}: {
  reportPeriod?: ReportPeriod;
  details?: ReportDetail[];
  students: Student[];
  showStudentSelect?: boolean;
}) {
  return (
    <>
      {showStudentSelect && (
        <FormField label="Siswa" htmlFor="studentId" required>
          <select
            id="studentId"
            name="studentId"
            required
            defaultValue={reportPeriod?.studentId || ""}
            disabled={Boolean(reportPeriod)}
            className={inputClass}
          >
            <option value="" disabled>
              Pilih siswa
            </option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.studentCode})
              </option>
            ))}
          </select>
        </FormField>
      )}

      <FormField label="Nama Periode" htmlFor="periodName" required hint="Contoh: Juni 2026 atau Semester Genap">
        <input
          id="periodName"
          name="periodName"
          type="text"
          required
          defaultValue={reportPeriod?.periodName}
          placeholder="Juni 2026"
          className={inputClass}
        />
      </FormField>

      <FormField
        label="URL PDF Rapor"
        htmlFor="pdfUrl"
        hint="Opsional, jika rapor sudah dibuat versi PDF dan diunggah ke layanan eksternal"
      >
        <input id="pdfUrl" name="pdfUrl" type="url" defaultValue={reportPeriod?.pdfUrl || ""} className={inputClass} />
      </FormField>

      <ReportDetailRows
        initialRows={details?.map((d) => ({ key: d.metricKey, value: d.metricValue, category: d.category }))}
      />

      <label className="flex items-center gap-2.5 text-sm font-medium text-navy-700">
        <input
          type="checkbox"
          name="isPublished"
          defaultChecked={reportPeriod?.isPublished}
          className="h-4 w-4 rounded border-navy-300 text-gold-500 focus:ring-gold-400"
        />
        Terbitkan ke Orang Tua (jika dicentang, rapor akan terlihat di portal orang tua)
      </label>
    </>
  );
}
