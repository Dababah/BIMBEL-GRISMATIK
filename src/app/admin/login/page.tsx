import { redirect } from "next/navigation";

// Halaman login khusus admin sudah digabung menjadi satu halaman login
// bersama untuk semua role di /masuk. Rute ini tetap ada agar tautan lama
// tidak rusak, dan otomatis mengarahkan ke halaman login yang baru.
export default function AdminLoginRedirect() {
  redirect("/masuk");
}
