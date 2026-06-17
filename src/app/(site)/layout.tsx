import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSettings } from "@/lib/settings";

// Halaman publik mengambil data dari database (program, testimoni, pengaturan, dll)
// sehingga di-render secara dinamis (tidak di-pre-render saat build).
export const dynamic = "force-dynamic";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();

  return (
    <>
      <Navbar siteName={settings.site_name} />
      <main>{children}</main>
      <Footer settings={settings} />
    </>
  );
}
