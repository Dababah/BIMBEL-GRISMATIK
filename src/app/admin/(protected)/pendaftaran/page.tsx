import { prisma } from "@/lib/prisma";
import { deleteRegistration } from "@/lib/actions";
import DeleteButton from "@/components/admin/DeleteButton";
import StatusSelect from "@/components/admin/StatusSelect";

export default async function AdminPendaftaranPage() {
  const registrations = await prisma.registration.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-800">Pendaftaran Siswa</h1>
      <p className="mt-1 text-sm text-navy-500">
        Daftar calon siswa yang mengisi formulir pendaftaran di situs.
      </p>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-navy-100 bg-white shadow-sm">
        {registrations.length === 0 ? (
          <p className="p-6 text-sm text-navy-500">Belum ada data pendaftaran.</p>
        ) : (
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-navy-50 text-navy-500">
              <tr>
                <th className="px-4 py-3 font-medium">Tanggal</th>
                <th className="px-4 py-3 font-medium">Nama</th>
                <th className="px-4 py-3 font-medium">WhatsApp</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Kelas</th>
                <th className="px-4 py-3 font-medium">Program</th>
                <th className="px-4 py-3 font-medium">Pesan</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-100">
              {registrations.map((reg) => (
                <tr key={reg.id} className="align-top">
                  <td className="whitespace-nowrap px-4 py-3 text-navy-500">
                    {reg.createdAt.toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 font-medium text-navy-800">{reg.name}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://wa.me/${reg.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-navy-700 underline hover:text-gold-600"
                    >
                      {reg.phone}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-navy-600">{reg.email || "-"}</td>
                  <td className="px-4 py-3 text-navy-600">{reg.studentClass || "-"}</td>
                  <td className="px-4 py-3 text-navy-600">{reg.programInterest || "-"}</td>
                  <td className="max-w-[200px] px-4 py-3 text-navy-600">
                    {reg.message || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusSelect id={reg.id} status={reg.status} />
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DeleteButton
                      action={deleteRegistration.bind(null, reg.id)}
                      confirmText={`Hapus data pendaftaran "${reg.name}"?`}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
