"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email ou senha inválidos");
    } else {
      window.location.href = "/app/today";
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-emerald-700">
            Bíblia 365 Dias
          </h1>
          <p className="text-sm text-zinc-600">
            Leia a Palavra de Deus todos os dias
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 py-3 text-white font-medium hover:bg-emerald-700 transition"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600">
          Não tem conta?{" "}
          <Link
            href="/register"
            className="text-emerald-700 font-medium hover:underline"
          >
            Criar conta
          </Link>
        </p>
      </div>
    </div>
  );
}
