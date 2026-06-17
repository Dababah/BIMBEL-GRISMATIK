"use client";

export default function DeleteButton({
  action,
  confirmText = "Yakin ingin menghapus data ini?",
  label = "Hapus",
}: {
  action: () => void;
  confirmText?: string;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
      >
        {label}
      </button>
    </form>
  );
}
