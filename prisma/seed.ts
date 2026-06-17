import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { defaultSettings } from "../src/lib/settings";

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai seeding database Bimbel Grismatik...");

  // =========================================================
  // 1. AKUN SUPER ADMIN
  // =========================================================
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@grismatik.com").toLowerCase().trim();
  const adminUsername = (process.env.ADMIN_USERNAME || "admin").toLowerCase().trim();
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminName = process.env.ADMIN_NAME || "Admin Grismatik";
  const adminHashed = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: adminName,
      username: adminUsername,
      email: adminEmail,
      password: adminHashed,
      role: "SUPER_ADMIN",
    },
  });
  console.log(`Super Admin siap -> login: ${adminEmail} / ${adminUsername} | password: ${adminPassword}`);

  // =========================================================
  // 2. PENGATURAN SITUS
  // =========================================================
  for (const [key, value] of Object.entries(defaultSettings)) {
    await prisma.setting.upsert({ where: { key }, update: {}, create: { key, value } });
  }
  console.log("Pengaturan situs default tersimpan.");

  // =========================================================
  // 3. PROGRAM (CMS Landing Page)
  // =========================================================
  let programs = await prisma.program.findMany();
  if (programs.length === 0) {
    await prisma.program.createMany({
      data: [
        {
          title: "Bimbel SD (Kelas 1 - 6)",
          description:
            "Penguatan dasar Membaca, Menulis, Berhitung (Calistung), Matematika, Bahasa Indonesia, dan IPA dengan metode belajar yang menyenangkan dan mudah dipahami.",
          level: "SD",
          schedule: "Senin, Rabu & Jumat - 14.00 s/d 15.30 WIB",
          price: "Rp100.000 / bulan",
          order: 1,
          isActive: true,
        },
        {
          title: "Bimbel SMP (Kelas 7 - 9)",
          description:
            "Pendalaman materi Matematika, IPA, Bahasa Indonesia, dan Bahasa Inggris, dilengkapi latihan soal untuk mempersiapkan ujian sekolah dan ujian nasional.",
          level: "SMP",
          schedule: "Selasa, Kamis & Sabtu - 15.30 s/d 17.00 WIB",
          price: "Rp125.000 / bulan",
          order: 2,
          isActive: true,
        },
        {
          title: "Bimbel SMA / Persiapan SNBT",
          description:
            "Pembahasan materi Matematika, Bahasa Indonesia, Bahasa Inggris, serta latihan soal Tes Potensi Skolastik (TPS) untuk persiapan masuk Perguruan Tinggi.",
          level: "SMA",
          schedule: "Senin - Jumat - 16.00 s/d 17.30 WIB",
          price: "Rp150.000 / bulan",
          order: 3,
          isActive: true,
        },
        {
          title: "Kelas Membaca & Menulis (Calistung)",
          description:
            "Kelas khusus untuk anak usia dini yang ingin mengenal huruf, angka, serta belajar membaca dan menulis dengan pendekatan yang ramah anak.",
          level: "Umum",
          schedule: "Sabtu - 09.00 s/d 10.30 WIB",
          price: "Rp75.000 / bulan",
          order: 4,
          isActive: true,
        },
      ],
    });
    console.log("Data program contoh tersimpan.");
    programs = await prisma.program.findMany();
  }

  // =========================================================
  // 4. TESTIMONI (CMS Landing Page)
  // =========================================================
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    await prisma.testimonial.createMany({
      data: [
        {
          name: "Ibu Siti Aisyah",
          role: "Orang tua siswa kelas 5 SD",
          message:
            "Sejak ikut bimbel di Grismatik, anak saya jadi lebih percaya diri dan nilai ulangannya meningkat. Tutornya sabar sekali menjelaskan.",
          rating: 5,
          order: 1,
          isActive: true,
        },
        {
          name: "Dimas Pratama",
          role: "Siswa kelas 9 SMP",
          message:
            "Pembahasan soalnya lengkap dan mudah dipahami. Saya jadi lebih siap menghadapi ujian sekolah.",
          rating: 5,
          order: 2,
          isActive: true,
        },
        {
          name: "Bapak Hendra Saputra",
          role: "Orang tua siswa SMA",
          message:
            "Tempatnya nyaman, jadwalnya fleksibel, dan yang penting sudah resmi berizin. Jadi lebih tenang menitipkan anak belajar di sini.",
          rating: 5,
          order: 3,
          isActive: true,
        },
      ],
    });
    console.log("Data testimoni contoh tersimpan.");
  }

  // =========================================================
  // 5. CONTOH AKUN TUTOR & ORANG TUA
  // =========================================================
  const tutorPassword = "tutor123";
  const tutor = await prisma.user.upsert({
    where: { email: "tutor1@grismatik.com" },
    update: {},
    create: {
      name: "Kak Fitri Ramadhani",
      username: "tutor1",
      email: "tutor1@grismatik.com",
      phone: "081200000001",
      password: await bcrypt.hash(tutorPassword, 10),
      role: "TUTOR",
    },
  });
  console.log(`Contoh akun Tutor -> login: tutor1@grismatik.com / tutor1 | password: ${tutorPassword}`);

  const parentPassword = "ortu123";
  const parentUser = await prisma.user.upsert({
    where: { email: "ortu1@grismatik.com" },
    update: {},
    create: {
      name: "Bapak Hendra Saputra",
      username: "ortu1",
      email: "ortu1@grismatik.com",
      phone: "081200000002",
      address: "Dusun Simpang Bandar, Desa Simpang Kopi, Kec. Sei Suka, Batu Bara",
      password: await bcrypt.hash(parentPassword, 10),
      role: "PARENT",
    },
  });
  console.log(`Contoh akun Orang Tua -> login: ortu1@grismatik.com / ortu1 | password: ${parentPassword}`);

  // =========================================================
  // 6. CONTOH SISWA
  // =========================================================
  const sdProgram = programs.find((p) => p.level === "SD") || programs[0];

  const student = await prisma.student.upsert({
    where: { studentCode: "GSM-SD-0001" },
    update: {},
    create: {
      studentCode: "GSM-SD-0001",
      name: "Putri Hendra Saputra",
      level: "SD",
      hasNgaji: true,
      parentId: parentUser.id,
      isActive: true,
    },
  });
  console.log("Contoh siswa tersimpan:", student.studentCode);

  // =========================================================
  // 7. CONTOH JADWAL KELAS
  // =========================================================
  let schedule = await prisma.schedule.findFirst({ where: { name: "Kelompok A - Senin & Rabu" } });
  if (!schedule) {
    schedule = await prisma.schedule.create({
      data: {
        name: "Kelompok A - Senin & Rabu",
        programId: sdProgram.id,
        tutorId: tutor.id,
        dayOfWeek: [1, 3],
        startTime: "16:00",
        endTime: "17:30",
        maxCapacity: 15,
        isActive: true,
      },
    });
    console.log("Contoh jadwal kelas tersimpan.");
  }

  // =========================================================
  // 8. CONTOH PENEMPATAN KELAS (ENROLLMENT)
  // =========================================================
  await prisma.enrollment.upsert({
    where: { studentId_scheduleId: { studentId: student.id, scheduleId: schedule.id } },
    update: {},
    create: {
      studentId: student.id,
      scheduleId: schedule.id,
      status: "APPROVED",
      reviewedAt: new Date(),
      reviewedBy: adminName,
    },
  });
  console.log("Contoh penempatan kelas tersimpan.");

  // =========================================================
  // 9. CONTOH KEHADIRAN
  // =========================================================
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  for (const date of [lastWeek, today]) {
    const normalizedDate = new Date(date.toISOString().slice(0, 10));
    await prisma.attendance.upsert({
      where: {
        studentId_scheduleId_date: { studentId: student.id, scheduleId: schedule.id, date: normalizedDate },
      },
      update: {},
      create: {
        studentId: student.id,
        scheduleId: schedule.id,
        date: normalizedDate,
        status: "HADIR",
      },
    });
  }
  console.log("Contoh data kehadiran tersimpan.");

  // =========================================================
  // 10. CONTOH JURNAL
  // =========================================================
  const journalCount = await prisma.journal.count({ where: { tutorId: tutor.id } });
  if (journalCount === 0) {
    await prisma.journal.create({
      data: {
        tutorId: tutor.id,
        scheduleId: schedule.id,
        date: today,
        material: "Perkalian dan pembagian bersusun, latihan soal cerita sehari-hari.",
        notes: "Siswa cukup aktif menjawab pertanyaan di kelas.",
      },
    });
    console.log("Contoh jurnal tersimpan.");
  }

  // =========================================================
  // 11. CONTOH INVOICE
  // =========================================================
  await prisma.invoice.upsert({
    where: {
      studentId_month_year: { studentId: student.id, month: today.getMonth() + 1, year: today.getFullYear() },
    },
    update: {},
    create: {
      studentId: student.id,
      month: today.getMonth() + 1,
      year: today.getFullYear(),
      registrationFee: 0,
      monthlyFee: 100000,
      ngajiFee: 25000,
      discountAmount: 0,
      totalAmount: 125000,
      status: "UNPAID",
    },
  });
  console.log("Contoh invoice tersimpan.");

  // =========================================================
  // 12. CONTOH RAPOR
  // =========================================================
  const reportPeriodName = `${today.toLocaleDateString("id-ID", { month: "long", year: "numeric" })}`;
  const existingReport = await prisma.reportPeriod.findFirst({
    where: { studentId: student.id, periodName: reportPeriodName },
  });
  if (!existingReport) {
    await prisma.reportPeriod.create({
      data: {
        studentId: student.id,
        tutorId: tutor.id,
        periodName: reportPeriodName,
        isPublished: true,
        details: {
          create: [
            { metricKey: "Perkalian & Pembagian", metricValue: "Lancar", category: "AKADEMIK" },
            { metricKey: "Bahasa Indonesia - Membaca", metricValue: "Sangat Baik", category: "AKADEMIK" },
            { metricKey: "Hafalan Surat", metricValue: "An-Naba (Ayat 1-10)", category: "NGAJI" },
            { metricKey: "Keaktifan di Kelas", metricValue: "Aktif", category: "KARAKTER" },
          ],
        },
      },
    });
    console.log("Contoh rapor tersimpan.");
  }

  // =========================================================
  // 13. CONTOH PROMO
  // =========================================================
  const promoCount = await prisma.promoConfig.count();
  if (promoCount === 0) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1);

    await prisma.promoConfig.create({
      data: {
        name: "Promo Gratis Pendaftaran Bulan Ini",
        discountType: "REGISTRATION_FREE",
        discountValue: 0,
        startDate,
        endDate,
        isActive: true,
      },
    });
    console.log("Contoh promo tersimpan.");
  }

  console.log("\nSeeding selesai. Ringkasan akun login:");
  console.log(`  Super Admin : ${adminEmail} / password: ${adminPassword}`);
  console.log(`  Tutor       : tutor1@grismatik.com / password: ${tutorPassword}`);
  console.log(`  Orang Tua   : ortu1@grismatik.com / password: ${parentPassword}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
