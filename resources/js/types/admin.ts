export interface PersonalProject {
  id: number;
  title: string;
  slug: string;
  status: "running" | "stable" | "planned" | "failed";
  progress: number;
  summary: string;
  tech: string[] | null;
  overview: string | null;
  architecture: string | null;
  decisions: string[] | null;
  challenges: string[] | null;
  lessons: string[] | null;
  repo_url: string | null;
  live_url: string | null;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ProfessionalProject {
  id: number;
  company: string;
  period: string | null;
  role: string;
  title: string;
  summary: string;
  tech: string[] | null;
  modules: string[] | null;
  contributions: string[] | null;
  challenges: string[] | null;
  lessons: string[] | null;
  is_published: boolean;
}

export interface TechnicalNote {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  summary: string;
  content: string | null;
  tags: string[] | null;
  is_published: boolean;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  author: string;
  cover_path: string | null;
  description: string;
  content: string;
  tags: string[] | null;
  is_published: boolean;
  published_at: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read_at: string | null;
  created_at: string;
}

export interface AboutPage {
  id: number;
  eyebrow: string;
  title: string;
  intro: string;
  principles: { title: string; detail: string }[] | null;
  contact_title: string;
  contact_text: string;
  github_url: string | null;
  linkedin_url: string | null;
  resume_path: string | null;
  resume_original_name: string | null;
}

export interface WorkExperience {
  id: number;
  company: string;
  role: string;
  description: string;
  tags: string[] | null;
  started_at: string;
  ended_at: string | null;
  is_current: boolean;
  sort_order: number;
}

export interface AboutBook {
  id: number;
  title: string;
  author: string;
  description: string;
  image_path: string | null;
  sort_order: number;
  is_published: boolean;
}

export interface AboutCuriosity {
  id: number;
  title: string;
  description: string;
  sort_order: number;
  is_published: boolean;
}

export interface AboutGalleryPhoto {
  id: number;
  image_path: string;
  caption: string | null;
  sort_order: number;
  is_published: boolean;
}

export interface KnowledgeItem {
  id: number;
  type: "timeline" | "node";
  label: string | null;
  year: string | null;
  title: string;
  description: string;
  accent: "primary" | "info" | "warning";
  sort_order: number;
  is_published: boolean;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: "todo" | "doing" | "done" | "blocked";
  priority: "low" | "medium" | "high";
  due_date: string | null;
  tags: string[] | null;
}
