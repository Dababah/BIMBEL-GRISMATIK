"use client";

import Link from "next/link";
import { useState } from "react";
import { createGalleryItem } from "@/lib/actions";
import { FormField, inputClass } from "@/components/admin/FormField";

export default function NewGalleryItemPage() {
  const [uploadMethod, setUploadMethod] = useState<"file" | "link">("file");
  const [base64Image, setBase64Image] = useState<string>("");
  const [isConverting, setIsConverting] = useState(false);

  // Fungsi kompresi gambar otomatis dari HP
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsConverting(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800; // Batas lebar gambar uji coba
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        // Kompresi kualitas menjadi 70% agar super ringan di Neon
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);

        setBase64Image(compressedBase64);
        setIsConverting(false);
      };
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <Link
        href="/admin/galeri"
        className="text-sm text-navy-500 hover:text-gold-600">
        &larr; Kembali
      </Link>
      <h1 className="mt-2 font-display text-2xl font-semibold text-navy-800">
        Tambah Foto Galeri
      </h1>

      <div className="mt-6 max-w-xl rounded-2xl border border-navy-100 bg-white p-6 shadow-sm sm:p-8">
        {/* Toggle Pilihan Metode */}
        <div className="mb-5 flex gap-2 rounded-xl bg-navy-50 p-1">
          <button
            type="button"
            onClick={() => setUploadMethod("file")}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
              uploadMethod === "file"
                ? "bg-navy-800 text-white"
                : "text-navy-500 hover:text-navy-800"
            }`}>
            📱 Jepret / Pilih dari HP
          </button>
          <button
            type="button"
            onClick={() => setUploadMethod("link")}
            className={`flex-1 rounded-lg py-2 text-xs font-semibold transition ${
              uploadMethod === "link"
                ? "bg-navy-800 text-white"
                : "text-navy-500 hover:text-navy-800"
            }`}>
            🔗 Tempel Link URL
          </button>
        </div>

        <form action={createGalleryItem} className="space-y-5">
          {/* Input Gambar Dinamis */}
          {uploadMethod === "link" ? (
            <FormField
              label="URL Gambar"
              htmlFor="imageUrl"
              required
              hint="Tempel tautan gambar eksternal yang sudah online.">
              <input
                id="imageUrl"
                name="imageUrl"
                type="url"
                required
                placeholder="https://..."
                className={inputClass}
              />
            </FormField>
          ) : (
            <FormField
              label="Ambil Foto dari HP"
              htmlFor="fileInput"
              required
              hint="Klik untuk membuka Kamera HP atau mengambil file gambar dari Galeri.">
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className={`${inputClass} file:mr-4 file:rounded-full file:border-0 file:bg-navy-50 file:px-4 file:py-2 file:text-xs file:font-semibold file:text-navy-700 hover:file:bg-navy-100`}
              />
              {/* Melempar hasil kompresi teks Base64 ke Server Action */}
              <input type="hidden" name="imageUrl" value={base64Image} />
            </FormField>
          )}

          <FormField label="Judul / Keterangan" htmlFor="title" hint="Opsional">
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Contoh: Kegiatan Belajar Kelas SD"
              className={inputClass}
            />
          </FormField>

          <FormField label="Urutan Tampil" htmlFor="order">
            <input
              id="order"
              name="order"
              type="number"
              defaultValue={0}
              className={inputClass}
            />
          </FormField>

          <button
            type="submit"
            disabled={isConverting || (uploadMethod === "file" && !base64Image)}
            className="w-full rounded-full bg-navy-800 px-6 py-3 text-sm font-semibold text-white hover:bg-gold-500 hover:text-navy-900 disabled:bg-navy-200 disabled:text-navy-400">
            {isConverting ? "Memproses Gambar..." : "Simpan Foto"}
          </button>
        </form>
      </div>
    </div>
  );
}
