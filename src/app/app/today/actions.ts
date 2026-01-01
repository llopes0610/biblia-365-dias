"use server";

import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function markDayAsCompleted(planDayId: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error("Não autenticado");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    throw new Error("Usuário não encontrado");
  }

  // Evita duplicidade (além do @@unique)
  const alreadyCompleted = await prisma.userCompletion.findUnique({
    where: {
      userId_planDayId: {
        userId: user.id,
        planDayId,
      },
    },
  });

  if (alreadyCompleted) {
    return { ok: true, already: true };
  }

  await prisma.userCompletion.create({
    data: {
      userId: user.id,
      planDayId,
      points: 10,
    },
  });

  return { ok: true, already: false };
}
