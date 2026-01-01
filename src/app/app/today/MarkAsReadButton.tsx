"use client";

import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { markDayAsCompleted } from "./actions";

interface Props {
  planDayId: string;
  completed: boolean;
}

export default function MarkAsReadButton({
  planDayId,
  completed,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showMessage, setShowMessage] = useState(false);

  if (completed) {
    return (
      <button
        disabled
        className="w-full rounded-xl bg-zinc-200 py-3 text-sm font-medium text-zinc-500"
      >
        Leitura concluída ✔
      </button>
    );
  }

  function celebrate() {
    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.65 },
      colors: ["#16a34a", "#22c55e", "#4ade80"],
    });
  }

  function handleClick() {
    startTransition(async () => {
      await markDayAsCompleted(planDayId);

      // 🎉 Confetti
      celebrate();

      // 📖 Mensagem bíblica
      setShowMessage(true);

      // ⏳ tempo para sentir a conquista
      setTimeout(() => {
        router.refresh();
      }, 1400);
    });
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handleClick}
        disabled={isPending}
        className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-700 transition disabled:opacity-60"
      >
        {isPending
          ? "Registrando leitura..."
          : "Marcar como lido"}
      </button>

      {showMessage && (
        <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-sm text-emerald-800 text-center">
          📖 <strong>“Antes, tem o seu prazer na lei do Senhor”</strong>
          <br />
          <span className="text-xs text-emerald-700">
            Salmos 1:2
          </span>
        </div>
      )}
    </div>
  );
}
