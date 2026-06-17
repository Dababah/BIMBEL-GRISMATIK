"use server";

import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/role-guard";
import { generateStudentCode } from "@/lib/student-code";
import type {
  Role,
  StudentLevel,
  EnrollmentStatus,
  AttendanceStatus,
  InvoiceStatus,
  RegistrationStatus,
} from "@prisma/client";

// ===================== HELPER =====================

function str(formData: FormData, key: string): string {
  return String(formData.get(key) || "").trim();
}

function optionalStr(formData: FormData, key: string): string | null {
  const value = str(formData, key);
  return value.length > 0 ? value : null;
}

function num(formData: FormData, key: string, fallback = 0): number {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : fallback;
}

function numArray(formData: FormData, key: string): number[] {
  return formData
    .getAll(key)
    .map((v) => Number(v))
    .filter((v) => Number.isFinite(v));
}

function strArray(formData: FormData, key: string): string[] {
  return formData.getAll(key).map((v) => String(v));
}

// =====================================================
// PROGRAM (CMS Landing Page)
// =====================================================

export async function createProgram(formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  await prisma.program.create({
    data: {
      title: str(formData, "title"),
      description: str(formData, "description"),
      level: optionalStr(formData, "level"),
      schedule: optionalStr(formData, "schedule"),
      price: optionalStr(formData, "price"),
      imageUrl: optionalStr(formData, "imageUrl"),
      order: num(formData, "order"),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/program");
  revalidatePath("/");
  revalidatePath("/program");
  redirect("/admin/program");
}

export async function updateProgram(id: number, formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  await prisma.program.update({
    where: { id },
    data: {
      title: str(formData, "title"),
      description: str(formData, "description"),
      level: optionalStr(formData, "level"),
      schedule: optionalStr(formData, "schedule"),
      price: optionalStr(formData, "price"),
      imageUrl: optionalStr(formData, "imageUrl"),
      order: num(formData, "order"),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/program");
  revalidatePath("/");
  revalidatePath("/program");
  redirect("/admin/program");
}

export async function deleteProgram(id: number) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.program.delete({ where: { id } });
  revalidatePath("/admin/program");
  revalidatePath("/");
  revalidatePath("/program");
}

// =====================================================
// TESTIMONIAL
// =====================================================

export async function createTestimonial(formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  await prisma.testimonial.create({
    data: {
      name: str(formData, "name"),
      role: optionalStr(formData, "role"),
      message: str(formData, "message"),
      rating: Math.min(5, Math.max(1, num(formData, "rating", 5))),
      imageUrl: optionalStr(formData, "imageUrl"),
      order: num(formData, "order"),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/testimoni");
  revalidatePath("/");
  revalidatePath("/testimoni");
  redirect("/admin/testimoni");
}

export async function updateTestimonial(id: number, formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  await prisma.testimonial.update({
    where: { id },
    data: {
      name: str(formData, "name"),
      role: optionalStr(formData, "role"),
      message: str(formData, "message"),
      rating: Math.min(5, Math.max(1, num(formData, "rating", 5))),
      imageUrl: optionalStr(formData, "imageUrl"),
      order: num(formData, "order"),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/testimoni");
  revalidatePath("/");
  revalidatePath("/testimoni");
  redirect("/admin/testimoni");
}

export async function deleteTestimonial(id: number) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimoni");
  revalidatePath("/");
  revalidatePath("/testimoni");
}

// =====================================================
// GALLERY
// =====================================================

export async function createGalleryItem(formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  await prisma.galleryItem.create({
    data: {
      title: optionalStr(formData, "title"),
      imageUrl: str(formData, "imageUrl"),
      order: num(formData, "order"),
    },
  });

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  redirect("/admin/galeri");
}

export async function deleteGalleryItem(id: number) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.galleryItem.delete({ where: { id } });
  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
}

// =====================================================
// REGISTRATION (Lead dari form publik)
// =====================================================

export async function updateRegistrationStatus(id: number, status: RegistrationStatus) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.registration.update({ where: { id }, data: { status } });
  revalidatePath("/admin/pendaftaran");
}

export async function deleteRegistration(id: number) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.registration.delete({ where: { id } });
  revalidatePath("/admin/pendaftaran");
}

// =====================================================
// SETTINGS
// =====================================================

export async function updateSettings(formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  const entries = Array.from(formData.entries()).filter(
    ([key]) => key !== "$ACTION_ID" && !key.startsWith("$ACTION")
  );

  await Promise.all(
    entries.map(([key, value]) =>
      prisma.setting.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    )
  );

  revalidatePath("/", "layout");
  redirect("/admin/pengaturan?success=1");
}

// =====================================================
// PENGGUNA (User: Tutor & Orang Tua, dibuat oleh Admin)
// =====================================================

export async function createUser(formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  const password = str(formData, "password");
  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name: str(formData, "name"),
      username: str(formData, "username").toLowerCase(),
      email: optionalStr(formData, "email")?.toLowerCase() || null,
      phone: optionalStr(formData, "phone"),
      address: optionalStr(formData, "address"),
      role: str(formData, "role") as Role,
      password: hashed,
    },
  });

  revalidatePath("/admin/pengguna");
  redirect("/admin/pengguna");
}

export async function deleteUser(id: string) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.user.delete({ where: { id } });
  revalidatePath("/admin/pengguna");
}

// =====================================================
// SISWA
// =====================================================

export async function createStudent(formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  const level = str(formData, "level") as StudentLevel;
  const studentCode = await generateStudentCode(level);
  const birthDate = optionalStr(formData, "birthDate");

  await prisma.student.create({
    data: {
      studentCode,
      name: str(formData, "name"),
      level,
      birthDate: birthDate ? new Date(birthDate) : null,
      hasNgaji: formData.get("hasNgaji") === "on",
      parentId: str(formData, "parentId"),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/siswa");
  redirect("/admin/siswa");
}

export async function updateStudent(id: string, formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  const birthDate = optionalStr(formData, "birthDate");

  await prisma.student.update({
    where: { id },
    data: {
      name: str(formData, "name"),
      level: str(formData, "level") as StudentLevel,
      birthDate: birthDate ? new Date(birthDate) : null,
      hasNgaji: formData.get("hasNgaji") === "on",
      parentId: str(formData, "parentId"),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/siswa");
  redirect("/admin/siswa");
}

export async function deleteStudent(id: string) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.student.delete({ where: { id } });
  revalidatePath("/admin/siswa");
}

// =====================================================
// JADWAL KELAS
// =====================================================

export async function createSchedule(formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  await prisma.schedule.create({
    data: {
      name: str(formData, "name"),
      programId: num(formData, "programId"),
      tutorId: optionalStr(formData, "tutorId"),
      dayOfWeek: numArray(formData, "dayOfWeek"),
      startTime: str(formData, "startTime"),
      endTime: str(formData, "endTime"),
      maxCapacity: num(formData, "maxCapacity", 15),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/jadwal");
  redirect("/admin/jadwal");
}

export async function updateSchedule(id: string, formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  await prisma.schedule.update({
    where: { id },
    data: {
      name: str(formData, "name"),
      programId: num(formData, "programId"),
      tutorId: optionalStr(formData, "tutorId"),
      dayOfWeek: numArray(formData, "dayOfWeek"),
      startTime: str(formData, "startTime"),
      endTime: str(formData, "endTime"),
      maxCapacity: num(formData, "maxCapacity", 15),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/jadwal");
  redirect("/admin/jadwal");
}

export async function deleteSchedule(id: string) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.schedule.delete({ where: { id } });
  revalidatePath("/admin/jadwal");
}

// =====================================================
// PENEMPATAN KELAS (ENROLLMENT)
// =====================================================

export async function createEnrollment(formData: FormData) {
  const session = await requireRole(["SUPER_ADMIN"]);

  await prisma.enrollment.create({
    data: {
      studentId: str(formData, "studentId"),
      scheduleId: str(formData, "scheduleId"),
      notes: optionalStr(formData, "notes"),
      status: "APPROVED",
      reviewedAt: new Date(),
      reviewedBy: session.user.name || session.user.email || "Admin",
    },
  });

  revalidatePath("/admin/pendaftaran-kelas");
  redirect("/admin/pendaftaran-kelas");
}

export async function updateEnrollmentStatus(id: string, status: EnrollmentStatus) {
  const session = await requireRole(["SUPER_ADMIN"]);
  await prisma.enrollment.update({
    where: { id },
    data: {
      status,
      reviewedAt: new Date(),
      reviewedBy: session.user.name || session.user.email || "Admin",
    },
  });
  revalidatePath("/admin/pendaftaran-kelas");
}

export async function deleteEnrollment(id: string) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.enrollment.delete({ where: { id } });
  revalidatePath("/admin/pendaftaran-kelas");
}

// =====================================================
// KEHADIRAN (diisi Tutor per jadwal & tanggal)
// =====================================================

export async function saveAttendance(formData: FormData) {
  const session = await requireRole(["TUTOR", "SUPER_ADMIN"]);

  const scheduleId = str(formData, "scheduleId");
  const dateStr = str(formData, "date");
  const material = optionalStr(formData, "material");
  const journalNotes = optionalStr(formData, "journalNotes");
  const date = new Date(dateStr);

  let journalId: string | null = null;

  // Jika tutor mengisi materi, buat catatan jurnal otomatis untuk pertemuan ini
  if (material && session.user.role === "TUTOR") {
    const journal = await prisma.journal.create({
      data: {
        tutorId: session.user.id,
        scheduleId,
        date,
        material,
        notes: journalNotes,
      },
    });
    journalId = journal.id;
  }

  const studentIds = strArray(formData, "studentId");

  await Promise.all(
    studentIds.map((studentId) => {
      const status = str(formData, `status_${studentId}`) as AttendanceStatus;
      return prisma.attendance.upsert({
        where: {
          studentId_scheduleId_date: { studentId, scheduleId, date },
        },
        update: { status, journalId: journalId ?? undefined },
        create: { studentId, scheduleId, date, status, journalId },
      });
    })
  );

  revalidatePath("/tutor/kehadiran");
  revalidatePath("/admin/kehadiran");
  revalidatePath("/portal");
  redirect("/tutor/kehadiran?success=1");
}

// =====================================================
// JURNAL TUTOR
// =====================================================

export async function createJournal(formData: FormData) {
  const session = await requireRole(["TUTOR"]);

  await prisma.journal.create({
    data: {
      tutorId: session.user.id,
      scheduleId: str(formData, "scheduleId"),
      date: new Date(str(formData, "date")),
      material: str(formData, "material"),
      notes: optionalStr(formData, "notes"),
    },
  });

  revalidatePath("/tutor/jurnal");
  revalidatePath("/admin/jurnal");
  redirect("/tutor/jurnal");
}

export async function deleteJournal(id: string) {
  const session = await requireRole(["TUTOR", "SUPER_ADMIN"]);

  if (session.user.role === "TUTOR") {
    const journal = await prisma.journal.findUnique({ where: { id } });
    if (!journal || journal.tutorId !== session.user.id) {
      return;
    }
  }

  await prisma.journal.delete({ where: { id } });
  revalidatePath("/tutor/jurnal");
  revalidatePath("/admin/jurnal");
}

// =====================================================
// INVOICE
// =====================================================

export async function createInvoice(formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  const registrationFee = num(formData, "registrationFee", 0);
  const monthlyFee = num(formData, "monthlyFee", 0);
  const ngajiFee = num(formData, "ngajiFee", 0);
  const discountAmount = num(formData, "discountAmount", 0);
  const totalAmount = Math.max(0, registrationFee + monthlyFee + ngajiFee - discountAmount);

  await prisma.invoice.create({
    data: {
      studentId: str(formData, "studentId"),
      month: num(formData, "month"),
      year: num(formData, "year"),
      registrationFee,
      monthlyFee,
      ngajiFee,
      discountAmount,
      totalAmount,
      notes: optionalStr(formData, "notes"),
    },
  });

  revalidatePath("/admin/invoice");
  revalidatePath("/portal");
  redirect("/admin/invoice");
}

export async function updateInvoiceStatus(id: string, status: InvoiceStatus) {
  const session = await requireRole(["SUPER_ADMIN"]);

  await prisma.invoice.update({
    where: { id },
    data: {
      status,
      verifiedAt: status === "PAID" ? new Date() : null,
      verifiedBy: status === "PAID" ? session.user.name || session.user.email || "Admin" : null,
    },
  });

  revalidatePath("/admin/invoice");
  revalidatePath("/portal");
}

export async function submitPaymentProof(id: string, proofUrl: string) {
  const session = await requireRole(["PARENT"]);

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: { student: true },
  });

  if (!invoice || invoice.student.parentId !== session.user.id) {
    return;
  }

  await prisma.invoice.update({
    where: { id },
    data: {
      proofUrl,
      status: "PENDING_VERIFICATION",
      submittedAt: new Date(),
    },
  });

  revalidatePath("/portal");
  revalidatePath("/admin/invoice");
}

export async function deleteInvoice(id: string) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.invoice.delete({ where: { id } });
  revalidatePath("/admin/invoice");
}

// =====================================================
// RAPOR (ReportPeriod + ReportDetail dinamis)
// =====================================================

async function saveReportDetails(reportPeriodId: string, formData: FormData) {
  const keys = strArray(formData, "metricKey[]");
  const values = strArray(formData, "metricValue[]");
  const categories = strArray(formData, "category[]");

  // Hapus detail lama, lalu simpan ulang dari form (replace penuh, lebih sederhana & konsisten)
  await prisma.reportDetail.deleteMany({ where: { reportPeriodId } });

  const rows = keys
    .map((key, i) => ({
      reportPeriodId,
      metricKey: key.trim(),
      metricValue: (values[i] || "").trim(),
      category: categories[i] || "AKADEMIK",
    }))
    .filter((row) => row.metricKey.length > 0);

  if (rows.length > 0) {
    await prisma.reportDetail.createMany({ data: rows });
  }
}

export async function createReportPeriod(formData: FormData) {
  const session = await requireRole(["TUTOR", "SUPER_ADMIN"]);

  const reportPeriod = await prisma.reportPeriod.create({
    data: {
      studentId: str(formData, "studentId"),
      tutorId: session.user.role === "TUTOR" ? session.user.id : optionalStr(formData, "tutorId"),
      periodName: str(formData, "periodName"),
      pdfUrl: optionalStr(formData, "pdfUrl"),
      isPublished: formData.get("isPublished") === "on",
    },
  });

  await saveReportDetails(reportPeriod.id, formData);

  revalidatePath("/tutor/rapor");
  revalidatePath("/admin/rapor");
  revalidatePath("/portal");
  redirect(session.user.role === "TUTOR" ? "/tutor/rapor" : "/admin/rapor");
}

export async function updateReportPeriod(id: string, formData: FormData) {
  const session = await requireRole(["TUTOR", "SUPER_ADMIN"]);

  await prisma.reportPeriod.update({
    where: { id },
    data: {
      periodName: str(formData, "periodName"),
      pdfUrl: optionalStr(formData, "pdfUrl"),
      isPublished: formData.get("isPublished") === "on",
    },
  });

  await saveReportDetails(id, formData);

  revalidatePath("/tutor/rapor");
  revalidatePath("/admin/rapor");
  revalidatePath("/portal");
  redirect(session.user.role === "TUTOR" ? "/tutor/rapor" : "/admin/rapor");
}

export async function deleteReportPeriod(id: string) {
  await requireRole(["TUTOR", "SUPER_ADMIN"]);
  await prisma.reportPeriod.delete({ where: { id } });
  revalidatePath("/tutor/rapor");
  revalidatePath("/admin/rapor");
  revalidatePath("/portal");
}

// =====================================================
// PROMO CONFIG
// =====================================================

export async function createPromoConfig(formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  await prisma.promoConfig.create({
    data: {
      name: str(formData, "name"),
      discountType: str(formData, "discountType"),
      discountValue: num(formData, "discountValue", 0),
      startDate: new Date(str(formData, "startDate")),
      endDate: new Date(str(formData, "endDate")),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/promo");
  redirect("/admin/promo");
}

export async function updatePromoConfig(id: string, formData: FormData) {
  await requireRole(["SUPER_ADMIN"]);

  await prisma.promoConfig.update({
    where: { id },
    data: {
      name: str(formData, "name"),
      discountType: str(formData, "discountType"),
      discountValue: num(formData, "discountValue", 0),
      startDate: new Date(str(formData, "startDate")),
      endDate: new Date(str(formData, "endDate")),
      isActive: formData.get("isActive") === "on",
    },
  });

  revalidatePath("/admin/promo");
  redirect("/admin/promo");
}

export async function deletePromoConfig(id: string) {
  await requireRole(["SUPER_ADMIN"]);
  await prisma.promoConfig.delete({ where: { id } });
  revalidatePath("/admin/promo");
}
