"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/app/today", label: "Hoje", icon: "📖" },
  { href: "/app/history", label: "Histórico", icon: "📚" },
  { href: "/app/donate", label: "Contribuir", icon: "🙏" },
  { href: "/app/profile", label: "Perfil", icon: "👤" },
  { href: "/app/confissao", label: "Confissão", icon: "📜" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto flex max-w-md justify-around px-2 py-2">
        {items.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex min-w-[64px] flex-col items-center gap-1 rounded-lg py-2 text-xs transition-all active:scale-95 ${
                active
                  ? "text-emerald-700 font-semibold"
                  : "text-zinc-500"
              }`}
            >
              <span
                className={`text-lg transition ${
                  active ? "scale-110" : ""
                }`}
              >
                {item.icon}
              </span>
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
