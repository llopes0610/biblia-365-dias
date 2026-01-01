"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="w-full rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-medium text-red-700 hover:bg-red-100 transition"
    >
      Sair da conta
    </button>
  );
}
