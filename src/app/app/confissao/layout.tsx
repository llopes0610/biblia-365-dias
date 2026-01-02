import BottomNav from "@/components/BottomNav";

export default function ConfissaoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 pb-24">
      {children}

      {/* 🧭 MENU */}
      <BottomNav />
    </div>
  );
}
