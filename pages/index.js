import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="max-w-2xl w-full bg-card text-card-foreground p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">
          Undangan Digital — Starter
        </h1>
        <p className="text-sm text-muted-foreground mb-6">
          Buat undangan sekali pakai cepat. Contoh alur: isi form & dapatkan
          link.
        </p>
        <div className="space-y-3">
          <Link href="/create" legacyBehavior>
            <a className="block w-full text-center py-2 bg-primary text-primary-foreground rounded">
              Buat Undangan Baru
            </a>
          </Link>
          <Link href="/admin" legacyBehavior>
            <a className="block w-full text-center py-2 border border-border text-foreground rounded">
              Admin: Lihat Semua
            </a>
          </Link>
          <Link href="/sample/andi-dina" legacyBehavior>
            <a className="block w-full text-center py-2 border border-border text-foreground rounded">
              Contoh: andi-dina
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
