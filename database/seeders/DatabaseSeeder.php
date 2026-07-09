<?php

namespace Database\Seeders;

use App\Models\AboutPage;
use App\Models\KnowledgeItem;
use App\Models\PersonalProject;
use App\Models\ProfessionalProject;
use App\Models\Task;
use App\Models\User;
use App\Models\WorkExperience;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => env('ADMIN_EMAIL', 'admin@gejalabs.local')],
            [
                'name' => env('ADMIN_NAME', 'Administrador'),
                'password' => Hash::make(env('ADMIN_PASSWORD', 'password')),
            ],
        );

        AboutPage::updateOrCreate(
            ['id' => 1],
            [
                'eyebrow' => '// readme',
                'title' => 'About the lab',
                'intro' => 'GejaLabs is a personal software engineering laboratory: a place to run experiments in architecture, artificial intelligence, backend systems and developer experience.',
                'principles' => [
                    ['title' => 'Architecture first', 'detail' => 'Boundaries and contracts before frameworks. Design decisions are documented, not implied.'],
                    ['title' => 'AI as a tool', 'detail' => 'Grounded, evaluated and traceable: intelligence that serves the system, not the hype.'],
                    ['title' => 'Continuous evolution', 'detail' => 'Every experiment feeds the next. Lessons compound; nothing is thrown away.'],
                ],
                'contact_title' => 'Get in touch',
                'contact_text' => 'The lab is open. Explore the experiments, read the reports, or reach out through the repository.',
                'github_url' => 'https://github.com/gejalabs',
            ],
        );

        WorkExperience::updateOrCreate(
            ['company' => 'Company / Client', 'role' => 'Software Developer'],
            [
                'description' => 'Professional work on business systems, maintenance, integrations, performance improvements and feature evolution while respecting confidentiality boundaries.',
                'tags' => ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'APIs'],
                'started_at' => '2024-01-01',
                'ended_at' => null,
                'is_current' => true,
                'sort_order' => 0,
            ],
        );

        PersonalProject::updateOrCreate(
            ['slug' => 'cms-platform'],
            [
                'title' => 'Headless CMS Platform',
                'status' => 'running',
                'progress' => 80,
                'summary' => 'A modular content platform exploring clean architecture and a decoupled editing experience.',
                'tech' => ['Laravel', 'React', 'PostgreSQL', 'Redis'],
                'overview' => 'A headless CMS built to test how far Domain-Driven Design can be pushed in a content-heavy product while keeping the authoring experience fast and predictable.',
                'architecture' => 'Modular monolith on the backend exposing a versioned API, consumed by a React front-end with Inertia. Redis handles caching and queue fan-out.',
                'decisions' => ['Modular monolith over microservices to reduce operational overhead early.', 'Domain events for decoupling content lifecycle side effects.', 'API-first contract validated with schema tests before UI work.'],
                'challenges' => ['Keeping preview rendering consistent between draft and published states.', 'Cache invalidation across nested content relationships.'],
                'lessons' => ['Boundaries matter more than layers: modules beat generic services.', 'Investing in a typed API contract paid off across every consumer.'],
                'repo_url' => 'https://github.com/gejalabs/cms-platform',
                'is_published' => true,
            ],
        );

        PersonalProject::updateOrCreate(
            ['slug' => 'ai-rag-engine'],
            [
                'title' => 'AI RAG Engine',
                'status' => 'running',
                'progress' => 55,
                'summary' => 'Retrieval-augmented generation pipeline for grounded answers over private documents.',
                'tech' => ['Python', 'FastAPI', 'pgvector', 'OpenAI'],
                'overview' => 'A retrieval-augmented generation service that indexes private knowledge and answers questions with citations, focused on latency and answer traceability.',
                'architecture' => 'Ingestion workers chunk and embed documents into pgvector. A FastAPI service performs hybrid retrieval, re-ranking, and streams grounded completions back to clients.',
                'decisions' => ['pgvector over a dedicated vector DB to keep the stack unified.', 'Hybrid search with semantic and keyword retrieval for rare terms.', 'Streaming responses to reduce perceived latency.'],
                'challenges' => ['Chunking strategy strongly affects answer quality.', 'Preventing hallucinations without over-constraining the model.'],
                'lessons' => ['Evaluation harnesses are non-negotiable for RAG quality.', 'Retrieval quality dominates model choice for grounded tasks.'],
                'repo_url' => 'https://github.com/gejalabs/ai-rag-engine',
                'is_published' => true,
            ],
        );

        PersonalProject::updateOrCreate(
            ['slug' => 'design-system'],
            [
                'title' => 'Design System Kit',
                'status' => 'stable',
                'progress' => 100,
                'summary' => 'A token-driven component library exploring theming and accessibility at scale.',
                'tech' => ['React', 'TypeScript', 'Tailwind', 'Storybook'],
                'overview' => 'A token-first design system testing how far semantic tokens can drive consistency across products without per-component overrides.',
                'architecture' => 'Design tokens compiled into CSS variables, consumed by headless primitives with variant APIs. Documented and visually tested in Storybook.',
                'decisions' => ['Semantic tokens over raw color values in every component.', 'Headless primitives with composable variants.', 'Visual regression tests as part of CI.'],
                'challenges' => ['Balancing flexibility with a strict, opinionated API.', 'Dark-mode parity across every state.'],
                'lessons' => ['Tokens are a contract: treat changes like API changes.', 'Accessibility is cheaper when built in from the primitive up.'],
                'repo_url' => 'https://github.com/gejalabs/design-system',
                'is_published' => true,
            ],
        );

        ProfessionalProject::updateOrCreate(
            ['company' => 'Company / Confidential client', 'title' => 'Internal business system'],
            [
                'period' => 'To be defined',
                'role' => 'Software Developer',
                'summary' => 'Work on features, maintenance, fixes and technical improvements in a corporate environment.',
                'tech' => ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'APIs'],
                'modules' => ['Records', 'Reports', 'Integrations', 'Business rules'],
                'contributions' => ['Contributed to new features and adjustments to existing flows.', 'Supported maintenance of critical modules used by internal users.', 'Improved performance, code organization and user experience in focused areas.'],
                'challenges' => ['Evolving features without exposing internal data or breaking existing processes.', 'Understanding established business rules and adapting solutions carefully.'],
                'lessons' => ['Clear communication with business areas matters.', 'Predictable code, careful maintenance and decision documentation create long-term value.'],
                'is_published' => true,
            ],
        );

        foreach ([
            ['year' => '2024', 'title' => 'Java Foundations', 'description' => 'OOP, JVM internals and the fundamentals of backend engineering.', 'sort_order' => 10],
            ['year' => '2025', 'title' => 'Laravel & Architecture', 'description' => 'Domain-Driven Design, modular monoliths and API-first products.', 'sort_order' => 20],
            ['year' => '2026', 'title' => 'AI + Architecture', 'description' => 'Retrieval-augmented systems, event-driven cores and developer experience.', 'sort_order' => 30],
        ] as $item) {
            KnowledgeItem::updateOrCreate(
                ['type' => 'timeline', 'year' => $item['year'], 'title' => $item['title']],
                $item + ['type' => 'timeline', 'label' => null, 'accent' => 'primary', 'is_published' => true],
            );
        }

        foreach ([
            ['label' => 'Architecture', 'title' => 'Architecture', 'accent' => 'primary', 'sort_order' => 10],
            ['label' => 'Laravel', 'title' => 'Laravel', 'accent' => 'info', 'sort_order' => 20],
            ['label' => 'DDD', 'title' => 'Domain-Driven Design', 'accent' => 'primary', 'sort_order' => 30],
            ['label' => 'PostgreSQL', 'title' => 'PostgreSQL', 'accent' => 'info', 'sort_order' => 40],
            ['label' => 'Redis', 'title' => 'Redis', 'accent' => 'warning', 'sort_order' => 50],
            ['label' => 'AI / RAG', 'title' => 'AI / RAG', 'accent' => 'primary', 'sort_order' => 60],
            ['label' => 'React', 'title' => 'React', 'accent' => 'info', 'sort_order' => 70],
        ] as $node) {
            KnowledgeItem::updateOrCreate(
                ['type' => 'node', 'label' => $node['label']],
                $node + ['type' => 'node', 'year' => null, 'description' => 'A current technology or concept used across the lab.', 'is_published' => true],
            );
        }

        Task::updateOrCreate(
            ['title' => 'Review public content'],
            [
                'description' => 'Keep projects, About, resume and knowledge entries updated from the admin dashboard.',
                'status' => 'todo',
                'priority' => 'medium',
                'due_date' => null,
                'tags' => ['admin', 'content'],
            ],
        );
    }
}
