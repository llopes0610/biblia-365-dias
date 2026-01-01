"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    church: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("As senhas não conferem");
      return;
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      alert(data.error || "Erro ao criar conta");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-emerald-700">
            Bíblia 365 Dias
          </h1>
          <p className="text-sm text-zinc-600">
            Crie sua conta e acompanhe sua leitura bíblica
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Nome completo"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-600"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-600"
            required
          />

          <input
            name="phone"
            placeholder="Telefone (opcional)"
            value={form.phone}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 text-sm"
          />

          <input
            name="church"
            placeholder="Igreja (opcional)"
            value={form.church}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 text-sm"
          />

          <input
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-600"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirmar senha"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-600"
            required
          />

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 py-3 text-white font-medium hover:bg-emerald-700 transition"
          >
            Criar conta
          </button>
        </form>

        <p className="text-center text-sm text-zinc-600">
          Já tem conta?{" "}
          <Link
            href="/login"
            className="text-emerald-700 font-medium hover:underline"
          >
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
