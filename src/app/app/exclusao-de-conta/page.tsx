export const metadata = {
  title: "Exclusão de Conta e Dados | Bíblia 365",
  description:
    "Solicitação de exclusão de conta e dados pessoais do aplicativo Bíblia 365.",
};

export default function ExclusaoDeContaPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">
        Exclusão de Conta e Dados — Bíblia 365
      </h1>

      <p className="mb-4">
        Os usuários do aplicativo <strong>Bíblia 365</strong> podem solicitar a
        exclusão da conta e dos dados pessoais a qualquer momento, conforme a
        legislação aplicável de proteção de dados.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Como solicitar a exclusão
      </h2>

      <p className="mb-4">
        Envie um e-mail para:
        <br />
        <strong>📧 contato@biblia365dias.com.br</strong>
      </p>

      <p className="mb-4">
        No assunto, informe:
        <br />
        <strong>“Exclusão de conta – Bíblia 365”</strong>
      </p>

      <p className="mb-4">
        No corpo do e-mail, informe:
      </p>

      <ul className="list-disc list-inside mb-6">
        <li>E-mail cadastrado no aplicativo</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Dados que serão excluídos
      </h2>

      <ul className="list-disc list-inside mb-6">
        <li>Conta do usuário</li>
        <li>Endereço de e-mail</li>
        <li>Progresso de leitura</li>
        <li>Preferências associadas à conta</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        Prazo para exclusão
      </h2>

      <p className="mb-4">
        A exclusão será realizada em até <strong>30 dias</strong> após a
        solicitação.
      </p>

      <p className="text-sm text-gray-600">
        Alguns dados poderão ser mantidos apenas quando exigidos por obrigação
        legal ou regulatória.
      </p>
    </main>
  );
}
