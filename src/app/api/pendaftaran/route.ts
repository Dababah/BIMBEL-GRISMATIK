import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, studentClass, programInterest, message } = body as {
      name?: string;
      phone?: string;
      email?: string;
      studentClass?: string;
      programInterest?: string;
      message?: string;
    };

    if (!name || !name.trim()) {
      return NextResponse.json(
        { ok: false, error: "Nama lengkap wajib diisi." },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { ok: false, error: "Nomor WhatsApp / telepon wajib diisi." },
        { status: 400 }
      );
    }

    const registration = await prisma.registration.create({
      data: {
        name: name.trim(),
        phone: phone.trim(),
        email: email?.trim() || null,
        studentClass: studentClass?.trim() || null,
        programInterest: programInterest?.trim() || null,
        message: message?.trim() || null,
      },
    });

    return NextResponse.json({ ok: true, id: registration.id }, { status: 201 });
  } catch (error) {
    console.error("Gagal menyimpan pendaftaran:", error);
    return NextResponse.json(
      { ok: false, error: "Terjadi kesalahan pada server. Silakan coba lagi." },
      { status: 500 }
    );
  }
}
