export const metadata = {
  title: "Política de Privacidade | Bíblia365",
  description:
    "Política de Privacidade do aplicativo Bíblia365. Saiba como seus dados são utilizados, armazenados e protegidos.",
};

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">
        Política de Privacidade – Bíblia365
      </h1>

      <p className="mb-8 text-sm text-muted-foreground">
        Última atualização: 05 de janeiro de 2026
      </p>

      <section className="space-y-6 leading-relaxed text-foreground">
        <p>
          O aplicativo <strong>Bíblia365</strong> respeita a sua privacidade e
          está comprometido em proteger os dados pessoais de seus usuários. Esta
          Política de Privacidade descreve como coletamos, utilizamos,
          armazenamos e protegemos as informações ao utilizar nosso aplicativo e
          site.
        </p>

        <p>
          Ao utilizar o <strong>Bíblia365</strong>, você concorda com os termos
          descritos nesta Política.
        </p>

        <h2 className="text-xl font-semibold">1. Informações coletadas</h2>

        <p>O Bíblia365 pode coletar as seguintes informações:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong>Informações fornecidas pelo usuário:</strong> nome, e-mail
            (quando houver cadastro ou login), preferências de leitura e
            progresso bíblico.
          </li>
          <li>
            <strong>Informações coletadas automaticamente:</strong> dados de uso
            do aplicativo, informações do dispositivo (modelo, sistema
            operacional, idioma) e dados técnicos anônimos para fins de
            estatística e melhoria da experiência.
          </li>
        </ul>

        <h2 className="text-xl font-semibold">2. Uso das informações</h2>

        <p>As informações coletadas são utilizadas para:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Garantir o funcionamento correto do aplicativo</li>
          <li>Salvar progresso de leitura e preferências do usuário</li>
          <li>Melhorar a experiência e desempenho do app</li>
          <li>Enviar notificações, quando autorizadas</li>
          <li>Garantir segurança e estabilidade da plataforma</li>
          <li>Cumprir obrigações legais</li>
        </ul>

        <p>
          O <strong>Bíblia365</strong> não vende, aluga ou comercializa dados
          pessoais de seus usuários.
        </p>

        <h2 className="text-xl font-semibold">3. Compartilhamento de dados</h2>

        <p>
          Os dados coletados podem ser compartilhados apenas quando necessário
          com:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Serviços de infraestrutura e hospedagem</li>
          <li>Serviços de análise e monitoramento de desempenho</li>
          <li>Autoridades legais, quando exigido por lei</li>
        </ul>

        <p>
          Sempre buscamos trabalhar com parceiros que adotam boas práticas de
          segurança e privacidade.
        </p>

        <h2 className="text-xl font-semibold">4. Armazenamento e segurança</h2>

        <p>
          Adotamos medidas técnicas e organizacionais adequadas para proteger os
          dados pessoais contra acesso não autorizado, perda, alteração ou
          divulgação indevida.
        </p>

        <h2 className="text-xl font-semibold">
          5. Direitos do usuário (LGPD)
        </h2>

        <p>
          Em conformidade com a Lei Geral de Proteção de Dados (Lei nº
          13.709/2018), você tem o direito de:
        </p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Acessar seus dados pessoais</li>
          <li>Solicitar correção de dados incorretos ou incompletos</li>
          <li>Solicitar a exclusão de seus dados</li>
          <li>Revogar consentimentos concedidos</li>
        </ul>

        <p>
          Para exercer seus direitos, entre em contato pelos canais indicados ao
          final desta Política.
        </p>

        <h2 className="text-xl font-semibold">6. Permissões do aplicativo</h2>

        <p>O Bíblia365 pode solicitar permissões como:</p>

        <ul className="list-disc pl-6 space-y-2">
          <li>Acesso à internet</li>
          <li>Envio de notificações</li>
        </ul>

        <p>
          Essas permissões são utilizadas exclusivamente para as funcionalidades
          do aplicativo e podem ser gerenciadas nas configurações do dispositivo.
        </p>

        <h2 className="text-xl font-semibold">7. Privacidade de crianças</h2>

        <p>
          O Bíblia365 é um aplicativo cristão e bíblico, adequado para todas as
          idades. Não coletamos intencionalmente dados pessoais de crianças sem o
          consentimento dos responsáveis legais.
        </p>

        <h2 className="text-xl font-semibold">8. Alterações nesta política</h2>

        <p>
          Esta Política de Privacidade pode ser atualizada periodicamente.
          Recomendamos que o usuário revise este documento regularmente.
        </p>

        <h2 className="text-xl font-semibold">9. Contato</h2>

        <p>
          Em caso de dúvidas, solicitações ou questões relacionadas à
          privacidade, entre em contato conosco:
        </p>

        <p className="mt-2">
          📧 <strong>E-mail:</strong> contato@biblia365dias.com.br
          <br />
          🌐 <strong>Site:</strong>{" "}
          <a
            href="https://biblia365dias.com.br"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://biblia365dias.com.br
          </a>
        </p>

        <p className="italic text-sm text-muted-foreground mt-8">
          “Santifica-os na verdade; a tua palavra é a verdade.” — João 17:17
        </p>
      </section>
    </main>
  );
}
