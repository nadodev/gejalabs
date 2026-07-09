export type ExperimentStatus = "running" | "stable" | "planned" | "failed";

export interface Experiment {
  id: string;
  slug: string;
  index: string;
  title: string;
  summary: string;
  status: ExperimentStatus;
  progress: number;
  tech: string[];
  overview: string;
  architecture: string;
  decisions: string[];
  challenges: string[];
  lessons: string[];
  repo: string;
}

export const experiments: Experiment[] = [
  {
    id: "001",
    slug: "cms-platform",
    index: "EXPERIMENT #001",
    title: "Headless CMS Platform",
    summary:
      "A modular content platform exploring clean architecture and a decoupled editing experience.",
    status: "running",
    progress: 80,
    tech: ["Laravel", "Next.js", "PostgreSQL", "Redis"],
    overview:
      "A headless CMS built to test how far Domain-Driven Design can be pushed in a content-heavy product while keeping the authoring experience fast and predictable.",
    architecture:
      "Modular monolith on the backend exposing a versioned API, consumed by a Next.js front-end with incremental static regeneration. Redis handles caching and queue fan-out.",
    decisions: [
      "Modular monolith over microservices to reduce operational overhead early.",
      "Domain events for decoupling content lifecycle side effects.",
      "API-first contract validated with schema tests before UI work.",
    ],
    challenges: [
      "Keeping preview rendering consistent between draft and published states.",
      "Cache invalidation across nested content relationships.",
    ],
    lessons: [
      "Boundaries matter more than layers: modules beat generic services.",
      "Investing in a typed API contract paid off across every consumer.",
    ],
    repo: "https://github.com/gejalabs/cms-platform",
  },
  {
    id: "002",
    slug: "ai-rag-engine",
    index: "EXPERIMENT #002",
    title: "AI RAG Engine",
    summary:
      "Retrieval-augmented generation pipeline for grounded answers over private documents.",
    status: "running",
    progress: 55,
    tech: ["Python", "FastAPI", "pgvector", "OpenAI"],
    overview:
      "A retrieval-augmented generation service that indexes private knowledge and answers questions with citations, focused on latency and answer traceability.",
    architecture:
      "Ingestion workers chunk and embed documents into pgvector. A FastAPI service performs hybrid retrieval, re-ranking, and streams grounded completions back to clients.",
    decisions: [
      "pgvector over a dedicated vector DB to keep the stack unified.",
      "Hybrid search with semantic and keyword retrieval for rare terms.",
      "Streaming responses to reduce perceived latency.",
    ],
    challenges: [
      "Chunking strategy strongly affects answer quality.",
      "Preventing hallucinations without over-constraining the model.",
    ],
    lessons: [
      "Evaluation harnesses are non-negotiable for RAG quality.",
      "Retrieval quality dominates model choice for grounded tasks.",
    ],
    repo: "https://github.com/gejalabs/ai-rag-engine",
  },
  {
    id: "003",
    slug: "design-system",
    index: "EXPERIMENT #003",
    title: "Design System Kit",
    summary:
      "A token-driven component library exploring theming and accessibility at scale.",
    status: "stable",
    progress: 100,
    tech: ["React", "TypeScript", "Tailwind", "Storybook"],
    overview:
      "A token-first design system testing how far semantic tokens can drive consistency across products without per-component overrides.",
    architecture:
      "Design tokens compiled into CSS variables, consumed by headless primitives with variant APIs. Documented and visually tested in Storybook.",
    decisions: [
      "Semantic tokens over raw color values in every component.",
      "Headless primitives with composable variants.",
      "Visual regression tests as part of CI.",
    ],
    challenges: [
      "Balancing flexibility with a strict, opinionated API.",
      "Dark-mode parity across every state.",
    ],
    lessons: [
      "Tokens are a contract: treat changes like API changes.",
      "Accessibility is cheaper when built in from the primitive up.",
    ],
    repo: "https://github.com/gejalabs/design-system",
  },
  {
    id: "004",
    slug: "event-driven-core",
    index: "EXPERIMENT #004",
    title: "Event-Driven Core",
    summary:
      "An experiment in event sourcing and CQRS for auditable, scalable domains.",
    status: "planned",
    progress: 15,
    tech: ["Go", "Kafka", "PostgreSQL", "gRPC"],
    overview:
      "A backend core exploring event sourcing and CQRS to build fully auditable domains with independent read models.",
    architecture:
      "Commands produce immutable events on Kafka; projectors build read models in PostgreSQL. Services communicate over gRPC.",
    decisions: [
      "Event sourcing for a complete, replayable audit trail.",
      "Separate read/write models to scale queries independently.",
    ],
    challenges: [
      "Schema evolution of events over time.",
      "Eventual consistency in the user experience.",
    ],
    lessons: [
      "Start with the projections you actually need.",
      "Versioning events early avoids painful migrations.",
    ],
    repo: "https://github.com/gejalabs/event-driven-core",
  },
];

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug);
}
