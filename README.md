# Website & Sistem Manajemen Bimbel Grismatik

Sistem lengkap untuk **Bimbel Grismatik** — lembaga bimbingan belajar di Kabupaten Batu Bara, Sumatera Utara. Terdiri dari landing page publik dan sistem manajemen akademik dengan **3 portal terpisah**: Admin, Tutor, dan Orang Tua. Dibangun dengan **Next.js 14**, **TypeScript**, **Tailwind CSS**, **Prisma**, dan database **PostgreSQL (Neon)**.

Dokumen ini ditulis selangkah demi selangkah. Ikuti urutannya dari atas ke bawah, jangan ada yang dilewati, terutama bagi yang belum pernah menjalankan project Next.js sebelumnya.

---

## Daftar Isi

1. [Fitur](#1-fitur)
2. [Tiga Portal & Akun Demo](#2-tiga-portal--akun-demo)
3. [Teknologi yang Digunakan](#3-teknologi-yang-digunakan)
4. [Struktur Folder](#4-struktur-folder)
5. [Persiapan Sebelum Mulai](#5-persiapan-sebelum-mulai)
6. [Langkah 1 — Install Dependensi](#6-langkah-1--install-dependensi)
7. [Langkah 2 — Membuat Database Gratis di Neon](#7-langkah-2--membuat-database-gratis-di-neon)
8. [Langkah 3 — Mengisi File `.env`](#8-langkah-3--mengisi-file-env)
9. [Langkah 4 — Membuat Tabel & Data Awal (Seed)](#9-langkah-4--membuat-tabel--data-awal-seed)
10. [Langkah 5 — Menjalankan Website di Lokal](#10-langkah-5--menjalankan-website-di-lokal)
11. [Langkah 6 — Login ke Setiap Portal](#11-langkah-6--login-ke-setiap-portal)
12. [Alur Kerja Sehari-hari](#12-alur-kerja-sehari-hari)
13. [Checklist Uji Coba Sebelum Deploy](#13-checklist-uji-coba-sebelum-deploy)
14. [Deploy ke Vercel (Produksi)](#14-deploy-ke-vercel-produksi)
15. [Mengganti Logo, Foto, dan Teks](#15-mengganti-logo-foto-dan-teks)
16. [Alternatif: Database Lokal dengan Docker (Opsional)](#16-alternatif-database-lokal-dengan-docker-opsional)
17. [Pemecahan Masalah (Troubleshooting)](#17-pemecahan-masalah-troubleshooting)
18. [Catatan Keamanan](#18-catatan-keamanan)
19. [Jika Masih Ada Error](#19-jika-masih-ada-error)

---

## 1. Fitur

**Halaman Publik** (tanpa login)
- Beranda, Tentang Kami, Program, Testimoni, Galeri, Kontak (dengan peta lokasi).
- Pendaftaran — formulir pendaftaran calon siswa (lead) yang otomatis tersimpan ke database.

**Portal Admin** (`/admin`)
- Kelola konten situs: Program, Testimoni, Galeri, Pengaturan Situs (semua teks bisa diubah tanpa coding), dan lead Pendaftaran dari halaman publik.
- Kelola Pengguna: buat akun login untuk Tutor dan Orang Tua.
- Kelola Siswa: data siswa aktif, kode siswa otomatis (format GSM-JENJANG-0001), dihubungkan ke akun Orang Tua.
- Kelola Jadwal Kelas: nama kelas, program, tutor pengajar, hari & jam, kapasitas.
- Penempatan Kelas: menempatkan siswa ke jadwal tertentu (enrollment).
- Kehadiran: melihat seluruh riwayat kehadiran siswa (read-only, pengisian oleh Tutor).
- Invoice: membuat tagihan bulanan per siswa, melihat & memverifikasi bukti bayar, menandai lunas.
- Rapor: oversight seluruh rapor yang dibuat Tutor, bisa juga membuat/mengedit langsung.
- Jurnal Tutor: oversight seluruh catatan pertemuan kelas.
- Promo: kelola promo/diskon pendaftaran atau SPP.

**Portal Tutor** (`/tutor`)
- Dashboard kelas yang diajar.
- Jurnal: mencatat materi yang diajarkan setiap pertemuan.
- Kehadiran: mengisi status hadir/izin/sakit/alfa untuk siswa di jadwalnya, per tanggal.
- Rapor: membuat dan mengedit rapor siswa dengan komponen nilai dinamis (key-value), bisa diterbitkan agar terlihat oleh Orang Tua.

**Portal Orang Tua** (`/portal`)
- Melihat daftar anak yang terhubung ke akun.
- Per anak: riwayat kehadiran, daftar invoice (dengan submit link bukti transfer untuk tagihan yang belum dibayar), dan rapor yang sudah diterbitkan Tutor.

---

## 2. Tiga Portal & Akun Demo

Sistem ini punya **satu halaman login bersama** di `/masuk` untuk ketiga role. Setelah login, pengguna otomatis diarahkan ke portalnya masing-masing sesuai role akun.

Setelah menjalankan `npm run db:seed` (Langkah 4), tersedia akun contoh untuk mencoba ketiga portal:

| Role | Email / Username | Password | Portal |
|---|---|---|---|
| Super Admin | sesuai `ADMIN_EMAIL` / `ADMIN_USERNAME` di `.env` | sesuai `ADMIN_PASSWORD` di `.env` | `/admin` |
| Tutor | `tutor1@grismatik.com` / `tutor1` | `tutor123` | `/tutor` |
| Orang Tua | `ortu1@grismatik.com` / `ortu1` | `ortu123` | `/portal` |

Akun Tutor & Orang Tua contoh di atas sudah dilengkapi data contoh (1 siswa, 1 jadwal kelas, kehadiran, invoice, dan rapor) supaya langsung bisa dicoba tanpa input manual dulu. **Ganti atau hapus akun contoh ini sebelum dipakai sungguhan** (lihat [Catatan Keamanan](#18-catatan-keamanan)).

---

## 3. Teknologi yang Digunakan

| Bagian | Teknologi |
|---|---|
| Framework | Next.js 14 (App Router) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS |
| Database | PostgreSQL (disediakan oleh [Neon](https://neon.tech)) |
| ORM | Prisma |
| Autentikasi | NextAuth.js (Credentials Provider), satu sistem untuk 3 role |
| Hosting yang Disarankan | Vercel |

> Sesuai permintaan, project ini disiapkan untuk **Vercel + Neon** terlebih dahulu. Jika nanti ingin pindah ke Hostinger atau server lain, project ini tetap bisa dijalankan di server Node.js apa pun karena tidak memakai fitur eksklusif Vercel.
>
> File rapor (PDF) dan bukti transfer pembayaran disimpan sebagai **tautan URL** (ditempel manual), sama seperti foto Galeri — tidak memakai layanan upload file berbayar.

---

## 4. Struktur Folder

```
bimbel-grismatik/
├─ prisma/
│  ├─ schema.prisma        # Definisi seluruh tabel database (CMS + akademik)
│  └─ seed.ts               # Skrip pengisi data awal & contoh (admin, tutor, ortu, siswa, dst)
├─ public/
│  └─ logo.jpg               # Logo Bimbel Grismatik
├─ src/
│  ├─ app/
│  │  ├─ (site)/             # Seluruh halaman publik (beranda, tentang, dst)
│  │  ├─ masuk/              # Halaman login bersama untuk Admin/Tutor/Orang Tua
│  │  ├─ admin/
│  │  │  ├─ login/           # Rute lama, otomatis redirect ke /masuk
│  │  │  └─ (protected)/     # Seluruh halaman Portal Admin (wajib login role SUPER_ADMIN)
│  │  ├─ tutor/
│  │  │  └─ (protected)/     # Seluruh halaman Portal Tutor (wajib login role TUTOR)
│  │  ├─ portal/
│  │  │  └─ (protected)/     # Seluruh halaman Portal Orang Tua (wajib login role PARENT)
│  │  ├─ api/
│  │  │  ├─ auth/[...nextauth]/   # Endpoint autentikasi NextAuth
│  │  │  └─ pendaftaran/          # Endpoint form pendaftaran publik
│  │  ├─ globals.css
│  │  ├─ layout.tsx
│  │  └─ not-found.tsx
│  ├─ components/            # Komponen UI (Navbar, Footer, AdminShell, PortalShell, Form, dll)
│  ├─ lib/
│  │  ├─ prisma.ts           # Koneksi Prisma Client
│  │  ├─ auth.ts             # Konfigurasi NextAuth (multi-role)
│  │  ├─ role-guard.ts        # Helper pembatas akses berdasarkan role
│  │  ├─ student-code.ts      # Generator kode siswa otomatis
│  │  ├─ settings.ts          # Pengambilan data pengaturan situs
│  │  └─ actions.ts            # Server Actions untuk seluruh fitur (CRUD CMS + akademik)
│  └─ middleware.ts          # Pelindung rute /admin, /tutor, /portal sesuai role
├─ .env.example               # Contoh isian environment variable
├─ docker-compose.yml         # (Opsional) Database PostgreSQL lokal via Docker
├─ package.json
└─ README.md                  # Dokumen yang sedang Anda baca
```

---

## 5. Persiapan Sebelum Mulai

Sebelum lanjut, pastikan sudah terpasang di komputer Anda:

1. **Node.js versi 20 LTS atau lebih baru.**
   Cek dengan menjalankan:
   ```bash
   node -v
   ```
   Jika belum terpasang, unduh di [nodejs.org](https://nodejs.org) (pilih versi **LTS**).

2. **Akun GitHub** (gratis) — untuk menyimpan kode dan menghubungkan ke Vercel.
   Daftar di [github.com](https://github.com) jika belum punya.

3. **Akun Vercel** (gratis) — untuk hosting.
   Daftar di [vercel.com](https://vercel.com), bisa langsung login pakai akun GitHub.

4. **Akun Neon** (gratis) — untuk database PostgreSQL.
   Daftar di [neon.tech](https://neon.tech), bisa langsung login pakai akun GitHub.

5. Editor kode, disarankan **Visual Studio Code** (gratis) — [code.visualstudio.com](https://code.visualstudio.com).

Tidak perlu menginstal PostgreSQL secara manual — Neon menyediakan database PostgreSQL yang siap pakai di cloud, bisa diakses dari lokal maupun dari Vercel.

---

## 6. Langkah 1 — Install Dependensi

1. Ekstrak folder project ini, lalu buka folder tersebut di terminal/Command Prompt/VS Code.
2. Jalankan:
   ```bash
   npm install
   ```
   Tunggu sampai proses selesai (biasanya 1-3 menit, tergantung koneksi internet). Proses ini mengunduh seluruh library yang dipakai project (Next.js, Tailwind, Prisma, NextAuth, bcryptjs, dll). Tidak ada library baru yang perlu ditambahkan manual untuk sistem 3 portal ini.

Jika muncul pesan error saat langkah ini, lihat bagian [Pemecahan Masalah](#17-pemecahan-masalah-troubleshooting) di bawah.

---

## 7. Langkah 2 — Membuat Database Gratis di Neon

1. Login ke [console.neon.tech](https://console.neon.tech).
2. Klik **New Project**.
3. Isi nama project, misalnya `bimbel-grismatik`. Pilih region yang paling dekat (misalnya Singapore / `ap-southeast-1`) agar koneksi lebih cepat.
4. Klik **Create Project**. Tunggu beberapa detik sampai database siap.
5. Setelah database dibuat, Anda akan melihat halaman **Connection Details**. Di sana ada dua jenis connection string:
   - **Pooled connection** (biasanya ada tulisan `-pooler` di URL-nya) → ini untuk `DATABASE_URL`.
   - **Direct connection** (tanpa `-pooler`) → ini untuk `DATABASE_URL_UNPOOLED`.
6. Klik tombol copy pada masing-masing connection string, simpan sementara (akan dipakai di langkah berikutnya). Bentuknya kurang lebih:
   ```
   postgresql://namauser:password@ep-xxxxxxx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```

> Tidak perlu membuat tabel secara manual di Neon. Seluruh tabel (termasuk yang akademik: Siswa, Jadwal, Kehadiran, Invoice, Rapor, dst) akan dibuat otomatis lewat Prisma di Langkah 4.

---

## 8. Langkah 3 — Mengisi File `.env`

1. Di dalam folder project, salin file `.env.example` menjadi file baru bernama `.env`.

   Di Mac/Linux:
   ```bash
   cp .env.example .env
   ```
   Di Windows (Command Prompt):
   ```bash
   copy .env.example .env
   ```

2. Buka file `.env` dengan editor kode, lalu isi setiap baris:

   ```env
   DATABASE_URL="<tempel pooled connection string dari Neon di sini>"
   DATABASE_URL_UNPOOLED="<tempel direct connection string dari Neon di sini>"

   NEXTAUTH_SECRET="<isi dengan teks rahasia acak, lihat cara membuatnya di bawah>"
   NEXTAUTH_URL="http://localhost:3000"

   ADMIN_NAME="Admin Grismatik"
   ADMIN_USERNAME="admin"
   ADMIN_EMAIL="admin@grismatik.com"
   ADMIN_PASSWORD="buat-password-yang-kuat-disini"
   ```

3. Untuk mengisi `NEXTAUTH_SECRET`, jalankan salah satu perintah berikut di terminal lalu tempel hasilnya:

   Di Mac/Linux:
   ```bash
   openssl rand -base64 32
   ```
   Di Windows (PowerShell):
   ```powershell
   [Convert]::ToBase64String([System.Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
   ```
   Atau jika kedua cara di atas tidak tersedia, buka [generate-secret.vercel.app/32](https://generate-secret.vercel.app/32) di browser dan salin teks yang muncul.

4. **Ganti `ADMIN_PASSWORD`** dengan password yang kuat (jangan biarkan nilai default). Ini akan menjadi password login Super Admin pertama Anda.

5. Simpan file `.env`. File ini **tidak akan ikut terunggah ke GitHub** (sudah diatur lewat `.gitignore`) karena berisi data rahasia.

---

## 9. Langkah 4 — Membuat Tabel & Data Awal (Seed)

Setelah `.env` terisi, jalankan dua perintah berikut secara berurutan:

```bash
npm run db:push
```
Perintah ini membuat seluruh tabel di database Neon Anda sesuai skema di `prisma/schema.prisma` — baik tabel CMS (Program, Testimoni, Galeri, Pendaftaran, Setting) maupun tabel akademik (User, Student, Schedule, Enrollment, Journal, Attendance, Invoice, ReportPeriod, ReportDetail, PromoConfig).

```bash
npm run db:seed
```
Perintah ini mengisi:
- 1 akun **Super Admin** (sesuai `ADMIN_EMAIL`/`ADMIN_USERNAME` dan `ADMIN_PASSWORD` di `.env`)
- Pengaturan teks default situs
- 4 contoh program bimbel & 3 contoh testimoni
- 1 akun **Tutor** contoh, 1 akun **Orang Tua** contoh, dan 1 **Siswa** contoh yang terhubung ke akun tersebut
- 1 **Jadwal Kelas** contoh dengan siswa tersebut sudah ditempatkan (Enrollment)
- Contoh data **Kehadiran**, **Jurnal**, **Invoice** (belum lunas), **Rapor** (sudah diterbitkan), dan **Promo** aktif

Jika kedua perintah berhasil tanpa pesan error berwarna merah, database Anda sudah siap dan langsung berisi data contoh di ketiga portal.

> Anda bisa membuka [console.neon.tech](https://console.neon.tech) → pilih project → tab **Tables**, atau jalankan `npm run db:studio` untuk membuka Prisma Studio dan melihat seluruh data secara visual.

---

## 10. Langkah 5 — Menjalankan Website di Lokal

Jalankan:
```bash
npm run dev
```

Setelah muncul tulisan seperti `Local: http://localhost:3000`, buka browser dan akses:

```
http://localhost:3000
```

Jika halaman beranda Bimbel Grismatik muncul lengkap dengan logo, hero section, program, dan testimoni — berarti instalasi berhasil.

Untuk menghentikan server, tekan `Ctrl + C` di terminal.

---

## 11. Langkah 6 — Login ke Setiap Portal

1. Akses: `http://localhost:3000/masuk` (atau klik tautan **Login Admin / Tutor / Orang Tua** di footer situs publik).
2. Masukkan **email atau username**, beserta password — gunakan salah satu akun dari tabel di [bagian 2](#2-tiga-portal--akun-demo).
3. Setelah berhasil login, Anda akan otomatis diarahkan sesuai role akun:
   - Super Admin → `/admin`
   - Tutor → `/tutor`
   - Orang Tua → `/portal`

Satu halaman login dipakai bersama untuk ketiga role — tidak perlu mengingat 3 alamat login berbeda. Sistem akan menolak akses ke portal yang bukan haknya (misalnya akun Tutor mencoba membuka `/admin` akan otomatis diarahkan balik ke `/tutor`).

---

## 12. Alur Kerja Sehari-hari

Gambaran penggunaan sehari-hari setelah sistem berjalan:

**Admin** menyiapkan data dasar lebih dulu: buat akun **Pengguna** untuk setiap Tutor dan Orang Tua baru (menu Pengguna), lalu tambahkan **Siswa** dan hubungkan ke akun Orang Tua-nya (menu Siswa), buat **Jadwal Kelas** dan tentukan Tutor pengajarnya (menu Jadwal Kelas), lalu tempatkan siswa ke jadwal yang sesuai (menu Penempatan Kelas). Setiap bulan, Admin membuat **Invoice** untuk siswa aktif (menu Invoice), dan memverifikasi bukti transfer yang dikirim Orang Tua untuk menandainya Lunas.

**Tutor** login ke portalnya untuk mengisi **Kehadiran** siswa setiap selesai mengajar (pilih jadwal & tanggal, tandai Hadir/Izin/Sakit/Alfa per siswa), menulis **Jurnal** singkat tentang materi yang diajarkan, dan secara berkala membuat **Rapor** per siswa dengan indikator nilai sesuai kebutuhan jenjangnya — rapor baru terlihat oleh Orang Tua setelah dicentang "Terbitkan ke Orang Tua".

**Orang Tua** login ke portalnya untuk memantau anaknya: melihat riwayat **Kehadiran**, memeriksa **Invoice** yang harus dibayar lalu menempelkan link foto bukti transfer setelah membayar (status berubah menjadi "Menunggu Verifikasi" sampai Admin mengonfirmasi), dan membaca **Rapor** yang sudah diterbitkan Tutor.

---

## 13. Checklist Uji Coba Sebelum Deploy

Sebelum lanjut ke Vercel, sebaiknya cek dulu hal-hal berikut di `http://localhost:3000`:

- [ ] Halaman Beranda, Tentang, Program, Testimoni, Galeri, Pendaftaran, dan Kontak semua terbuka tanpa error.
- [ ] Logo tampil dengan benar di Navbar, Footer, dan halaman login (`/masuk`).
- [ ] Form Pendaftaran di `/pendaftaran` berhasil dikirim dan munculnya pesan sukses, lalu datanya muncul di `/admin/pendaftaran`.
- [ ] Login & logout berhasil untuk ketiga akun demo (Super Admin, Tutor, Orang Tua), dan masing-masing diarahkan ke portal yang benar.
- [ ] Di Portal Admin: menambah Pengguna, Siswa, Jadwal Kelas, dan Penempatan Kelas berhasil.
- [ ] Di Portal Tutor: mengisi Kehadiran untuk siswa di jadwalnya berhasil, dan menulis Jurnal serta Rapor berhasil tersimpan.
- [ ] Rapor yang sudah dicentang "Terbitkan" muncul di Portal Orang Tua; yang masih draf tidak muncul.
- [ ] Di Portal Orang Tua: menempelkan link bukti bayar pada invoice berhasil, lalu status invoice berubah dan terlihat oleh Admin di `/admin/invoice`.
- [ ] Menambah, mengedit, dan menghapus data Program/Testimoni/Galeri di admin berhasil dan langsung terlihat di halaman publik.
- [ ] Tampilan tetap rapi saat browser diperkecil ke ukuran HP (cek lewat DevTools → ikon mobile, atau buka langsung dari HP).

Jika semua poin di atas berjalan lancar, project sudah siap di-deploy.

---

## 14. Deploy ke Vercel (Produksi)

### A. Unggah ke GitHub

1. Buat repository baru di GitHub (kosongkan, jangan tambahkan README/gitignore dari GitHub).
2. Di terminal, dari dalam folder project, jalankan:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Bimbel Grismatik"
   git branch -M main
   git remote add origin <URL_REPOSITORY_GITHUB_ANDA>
   git push -u origin main
   ```

### B. Hubungkan ke Vercel

1. Login ke [vercel.com](https://vercel.com).
2. Klik **Add New → Project**.
3. Pilih repository GitHub yang baru dibuat tadi, klik **Import**.
4. Pada bagian **Environment Variables**, tambahkan satu per satu (sama seperti isi file `.env` lokal Anda):
   - `DATABASE_URL`
   - `DATABASE_URL_UNPOOLED`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → isi dengan domain Vercel Anda nanti, contoh: `https://bimbel-grismatik.vercel.app` (boleh diisi setelah deploy pertama selesai dan domain sudah diketahui, lalu redeploy).
   - `ADMIN_NAME`, `ADMIN_USERNAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` (boleh disamakan dengan lokal, atau diganti untuk produksi).
5. Klik **Deploy**. Tunggu proses build selesai (biasanya 1-3 menit).
6. Setelah selesai, Vercel akan memberikan URL situs Anda, misalnya `https://bimbel-grismatik.vercel.app`.

### C. Selesaikan Pengaturan `NEXTAUTH_URL`

1. Buka **Project Settings → Environment Variables** di Vercel.
2. Pastikan `NEXTAUTH_URL` sudah berisi URL situs Anda yang sebenarnya (tanpa garis miring di akhir), contoh: `https://bimbel-grismatik.vercel.app`.
3. Klik **Save**, lalu buka tab **Deployments**, klik deployment terakhir, lalu klik **Redeploy** agar perubahan environment variable diterapkan.

### D. Isi Data Awal di Database Produksi

Database Neon yang sama bisa dipakai untuk lokal maupun produksi (satu database, dua tempat akses). Jika Anda sudah menjalankan `npm run db:push` dan `npm run db:seed` di Langkah 4 menggunakan Neon yang sama, **tidak perlu mengulang langkah ini** — data sudah otomatis tersedia di produksi.

Jika Anda membuat project Neon yang berbeda khusus untuk produksi, jalankan ulang `npm run db:push` dan `npm run db:seed` dari komputer lokal Anda, dengan `.env` yang menunjuk ke database produksi tersebut.

### E. Hubungkan Domain Sendiri (Opsional)

Jika sudah punya domain sendiri (misalnya `bimbelgrismatik.com`), buka **Project Settings → Domains** di Vercel dan ikuti instruksi untuk mengarahkan domain tersebut.

---

## 15. Mengganti Logo, Foto, dan Teks

- **Logo**: ganti file `public/logo.jpg` dengan logo baru (nama file harus tetap `logo.jpg`, atau ubah juga semua referensi `/logo.jpg` di dalam folder `src/components` dan `src/app`).
- **Foto Galeri, Foto Testimoni, PDF Rapor, & Bukti Transfer**: semuanya dikelola dalam bentuk tautan URL (tempel link gambar/file yang sudah diunggah ke layanan seperti Google Drive/Imgur/dll, lalu pastikan link tersebut bisa diakses publik).
- **Seluruh teks** (judul, deskripsi, alamat, kontak, dll): dikelola lewat menu **Pengaturan Situs** di Portal Admin — tidak perlu mengedit kode.

---

## 16. Alternatif: Database Lokal dengan Docker (Opsional)

Jika suatu saat Anda ingin menguji coba tanpa koneksi internet (tanpa Neon), project ini menyediakan `docker-compose.yml` untuk menjalankan PostgreSQL secara lokal.

1. Install [Docker Desktop](https://www.docker.com/products/docker-desktop/).
2. Jalankan:
   ```bash
   docker compose up -d
   ```
3. Di file `.env`, ganti sementara:
   ```env
   DATABASE_URL="postgresql://grismatik:grismatik@localhost:5432/grismatik"
   DATABASE_URL_UNPOOLED="postgresql://grismatik:grismatik@localhost:5432/grismatik"
   ```
4. Jalankan kembali `npm run db:push` dan `npm run db:seed`.

Catatan: opsi ini hanya untuk uji coba di komputer sendiri. Untuk deploy ke Vercel, tetap gunakan Neon karena Vercel tidak bisa mengakses database di laptop Anda.

---

## 17. Pemecahan Masalah (Troubleshooting)

**`npm install` gagal / muncul error `EACCES` atau permission denied**
Coba jalankan terminal sebagai Administrator (Windows) atau tambahkan `sudo` di depan perintah (Mac/Linux): `sudo npm install`.

**Error `Can't reach database server` saat `npm run db:push`**
- Pastikan `DATABASE_URL` dan `DATABASE_URL_UNPOOLED` sudah benar (tidak ada spasi atau tanda kutip ganda yang salah).
- Pastikan project Neon Anda berstatus aktif (bukan "Idle" karena tidak dipakai lama — buka dashboard Neon untuk membangunkannya kembali, biasanya otomatis aktif begitu ada koneksi).
- Pastikan komputer Anda terhubung internet.

**Halaman `/masuk` muncul tapi login selalu gagal**
- Pastikan email/username dan password yang dimasukkan sesuai dengan akun yang sudah dibuat lewat seed (lihat [bagian 2](#2-tiga-portal--akun-demo)) atau lewat menu Pengguna di Portal Admin.
- Jika Anda mengubah `ADMIN_PASSWORD` di `.env` **setelah** seeding, perubahan itu tidak otomatis berlaku — Anda perlu mengganti password lewat **Prisma Studio** (`npm run db:studio`, edit kolom `password` dengan hash bcrypt baru) atau menghapus akun lama lalu menjalankan ulang seed.

**Login berhasil tapi diarahkan ke portal yang salah / langsung dilempar balik**
Setiap akun hanya punya satu role (`SUPER_ADMIN`, `TUTOR`, atau `PARENT`). Pastikan Anda login dengan akun yang rolenya sesuai portal yang ingin diakses — role akun bisa dicek lewat menu Pengguna di Portal Admin atau lewat Prisma Studio.

**Error `NEXTAUTH_SECRET` tidak terdefinisi**
Pastikan file bernama tepat `.env` (bukan `.env.local` atau `.env.txt`), dan baris `NEXTAUTH_SECRET="..."` sudah terisi.

**Gambar/tautan dari URL tidak muncul (Galeri/Program/Testimoni/PDF Rapor/Bukti Bayar)**
Pastikan tautan yang dimasukkan adalah tautan langsung ke file (berakhiran `.jpg`/`.png`/`.pdf`/dll, atau tautan "direct file" dari layanan hosting), bukan tautan ke halaman pratinjau.

**Build gagal di Vercel dengan pesan terkait Prisma**
Pastikan environment variable `DATABASE_URL` dan `DATABASE_URL_UNPOOLED` sudah ditambahkan di Vercel **sebelum** melakukan deploy. Skrip `build` di `package.json` sudah menjalankan `prisma generate` secara otomatis sebelum build Next.js.

**Port 3000 sudah dipakai aplikasi lain**
Jalankan dengan port berbeda:
```bash
npm run dev -- -p 3001
```
Lalu akses `http://localhost:3001`.

---

## 18. Catatan Keamanan

- Jangan pernah mengunggah file `.env` ke GitHub atau membagikannya ke publik — file ini berisi kredensial database dan kunci rahasia sesi.
- Ganti `ADMIN_PASSWORD` default sebelum website dipakai sungguhan, dan gunakan password yang kuat (kombinasi huruf besar, huruf kecil, angka, minimal 10 karakter).
- **Hapus atau ganti password akun demo** (`tutor1@grismatik.com` dan `ortu1@grismatik.com`) sebelum sistem dipakai oleh Tutor dan Orang Tua sungguhan — bisa dilakukan lewat menu Pengguna di Portal Admin.
- Rute `/admin/*`, `/tutor/*`, dan `/portal/*` sudah dilindungi otomatis lewat `middleware.ts` sesuai role masing-masing akun — pengguna yang belum login akan selalu diarahkan ke halaman login, dan yang salah role akan diarahkan ke portalnya sendiri.
- Tidak ada pendaftaran akun mandiri untuk Tutor/Orang Tua — akun login hanya bisa dibuat oleh Super Admin lewat menu Pengguna, supaya akses ke data siswa tetap terkontrol.

---

## 19. Jika Masih Ada Error

Jalankan seluruh langkah di atas secara berurutan. Jika di salah satu langkah muncul pesan error:

1. **Salin seluruh teks error** yang muncul di terminal (jangan hanya screenshot sebagian).
2. Sebutkan **langkah ke berapa** error tersebut muncul (misalnya "error muncul saat menjalankan `npm run db:push`").
3. Tempelkan log tersebut dan minta diperbaiki — sertakan juga isi file yang relevan jika diminta.

Dengan begitu, perbaikan bisa dilakukan secara tepat tanpa menebak-nebak sumber masalahnya.
#   B I M B E L - G R I S M A T I K  
 