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

export const experiments: Experiment[] = [];

export function getExperiment(slug: string) {
  return experiments.find((experiment) => experiment.slug === slug);
}
