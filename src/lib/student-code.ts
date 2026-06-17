import { prisma } from "@/lib/prisma";
import type { StudentLevel } from "@prisma/client";

/**
 * Menghasilkan kode siswa unik dengan format: GSM-{LEVEL}-{nomor urut 4 digit}
 * Contoh: GSM-SD-0001, GSM-SMP-0002, GSM-CALISTUNG-0003
 */
export async function generateStudentCode(level: StudentLevel): Promise<string> {
  const prefix = `GSM-${level}`;
  const count = await prisma.student.count({
    where: { studentCode: { startsWith: prefix } },
  });
  const next = String(count + 1).padStart(4, "0");
  return `${prefix}-${next}`;
}
