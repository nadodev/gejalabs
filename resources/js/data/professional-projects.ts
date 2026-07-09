export interface ProfessionalProject {
  id: string;
  company: string;
  period: string;
  role: string;
  title: string;
  summary: string;
  tech: string[];
  modules: string[];
  contributions: string[];
  challenges: string[];
  lessons: string[];
}

export const professionalProjects: ProfessionalProject[] = [
  {
    id: "pro-001",
    company: "Empresa / Cliente confidencial",
    period: "Período a definir",
    role: "Desenvolvedor",
    title: "Sistema corporativo interno",
    summary:
      "Atuação em funcionalidades, manutenção evolutiva, correções e melhorias técnicas em ambiente corporativo.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "APIs"],
    modules: ["Cadastros", "Relatórios", "Integrações", "Regras de negócio"],
    contributions: [
      "Contribuição em funcionalidades novas e ajustes de fluxos existentes.",
      "Apoio na manutenção de módulos críticos usados por usuários internos.",
      "Melhorias pontuais de performance, organização de código e experiência de uso.",
    ],
    challenges: [
      "Evoluir funcionalidades sem expor dados internos ou quebrar processos existentes.",
      "Entender regras de negócio já consolidadas e adaptar soluções com segurança.",
    ],
    lessons: [
      "Importância de comunicação clara com áreas de negócio.",
      "Valor de código previsível, manutenção cuidadosa e documentação de decisões.",
    ],
  },
  {
    id: "pro-002",
    company: "Empresa / Projeto profissional",
    period: "Período a definir",
    role: "Desenvolvedor",
    title: "Integrações e automações de processos",
    summary:
      "Participação em rotinas e integrações para reduzir trabalho manual, melhorar consistência de dados e apoiar operações.",
    tech: ["PHP", "Laravel", "REST APIs", "SQL", "Filas"],
    modules: ["Importação de dados", "Sincronização", "Validações", "Logs operacionais"],
    contributions: [
      "Implementação e manutenção de pontos de integração entre sistemas.",
      "Tratamento de erros, validações e ajustes em fluxos de dados.",
      "Apoio na análise de problemas de produção e correções incrementais.",
    ],
    challenges: [
      "Lidar com dados inconsistentes de fontes externas.",
      "Garantir rastreabilidade sem divulgar detalhes sensíveis de infraestrutura.",
    ],
    lessons: [
      "Integrações precisam de observabilidade e mensagens de erro úteis.",
      "Soluções simples e bem monitoradas reduzem custo de manutenção.",
    ],
  },
];
