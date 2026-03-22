# JM's Personal Secretary

Visit the chatbot: [Chat with my AI Assistant](https://agentic-jym.vercel.app/)


A public-facing AI knowledge assistant that answers questions about my background, projects, research, coursework, and technical interests using a retrieval-augmented generation (RAG) pipeline.

This project is being built as a separate website and repository, with the option to integrate or link it from my main GitHub Pages portfolio later. The system uses a JavaScript/TypeScript frontend for the web interface and a Python backend for retrieval, ingestion, and LLM orchestration.

## Project Goal

The goal of this project is to build a deployable personal knowledge assistant that can:

- answer questions about my research, projects, and academic background,
- retrieve relevant information from curated personal documents,
- ground responses in source material,
- present cited, portfolio-ready answers through a public web interface.

Rather than training a language model from scratch, this project uses an existing LLM and focuses on the core applied AI engineering tasks involved in a modern RAG system:
- document ingestion,
- chunking and indexing,
- semantic retrieval,
- context construction,
- grounded generation,
- deployment as a web application.

## Why This Project

This project serves several purposes at once:

- an interactive extension of my portfolio,
- a practical demonstration of LLM + RAG engineering,
- a foundation for future expansion into a research copilot or technical writing assistant,
- a reusable workflow for future AI applications with a JS frontend and Python backend.

## Planned Architecture

### Frontend
The frontend will be built with Next.js and TypeScript.

Responsibilities:
- public-facing website interface,
- chat UI with rate limits,
- displaying responses and sources,
- calling the backend API,
- eventual deployment as the standalone chatbot website.

### Backend
The backend will be built with FastAPI in Python.

Responsibilities:
- document ingestion and preprocessing,
- chunking and metadata handling,
- embedding and retrieval pipeline,
- prompt construction,
- LLM calls,
- returning grounded responses and source references.

### Data / Retrieval Layer
The retrieval system will store curated source documents and indexed chunks for semantic search.

Planned source types include:
- project descriptions,
- README files,
- resume content,
- research summaries,
- selected notes,
- selected papers or writeups,
- coursework summaries.

## Initial Scope

The first version of the system will focus on a curated, high-value set of public or portfolio-relevant materials rather than an unbounded personal archive.

The assistant should be able to answer questions in four broad categories:

### 1. About Me
Examples:
- Who is Jonathan Ma?
- What are his academic interests?
- What technical areas does he work in?

### 2. Projects
Examples:
- What projects has he built?
- Which projects are related to time series analysis or machine learning?
- What tools were used in a given project?

### 3. Research
Examples:
- What is his thesis about?
- What research directions is he exploring?
- How do his interests connect Bayesian methods, optimization, and forecasting?

### 4. Career / Fit Questions
Examples:
- What roles is he best aligned with?
- Which projects are most relevant to quantitative research or data science?
- How does his coursework support his background?

## Planned Features

### MVP
- separate public chatbot website,
- Next.js frontend with chat page,
- FastAPI backend with chat endpoint,
- curated document corpus,
- ingestion and chunking pipeline,
- semantic retrieval,
- grounded answers,
- source list returned with each answer.

### Phase 2
- metadata filtering,
- improved retrieval quality,
- better source citations,
- prompt templates by question type,
- suggested prompts in the UI.

### Phase 3
- admin/update workflow,
- document re-indexing,
- more advanced retrieval and evaluation,
- possible domain-specific extensions.

## Tech Stack

### Frontend
- Next.js
- TypeScript
- React

### Backend
- FastAPI
- Python
- Pydantic

### AI / Retrieval
- existing LLM API
- embeddings-based retrieval
- vector database or retrieval store
- custom ingestion and chunking pipeline

## Design Principles

This project is being built around the following principles:

### 1. Grounded Responses
Answers should be based on retrieved source material rather than unsupported generation.

### 2. Curated Knowledge Base
Higher-quality inputs are more valuable than large amounts of noisy data.

### 3. Expandable Architecture
The system should support future additions without requiring a full rewrite.

### 4. Separation of Concerns
The frontend handles user interaction and presentation.  
The backend handles ingestion, retrieval, and model orchestration.

### 5. Portfolio Readiness
The final deployed system should function as both a useful tool and a public-facing project demonstration.

## Repository Plan

This repository will contain both the frontend and backend in a single project, while keeping them structurally separate.

- `frontend/` contains the web app,
- `backend/` contains the API and retrieval pipeline,
- `data/` contains local source material for development and ingestion,
- `infra/` contains infrastructure and database setup artifacts.

## Development Roadmap

### Phase 1: Project Setup
- initialize repository structure,
- configure frontend and backend environments,
- set up local development workflow,
- define document schema and metadata structure.

### Phase 2: Backend MVP
- build FastAPI app,
- create health and chat endpoints,
- implement basic ingestion pipeline,
- implement chunking and retrieval.

### Phase 3: Frontend MVP
- build chat interface,
- connect frontend to backend,
- render responses and sources,
- deploy first public version.

### Phase 4: Retrieval Improvements
- improve chunking strategy,
- add source metadata filtering,
- refine prompts and response formats,
- evaluate answer quality.

### Phase 5: Expansion
- add more curated documents,
- add admin or ingestion workflows,
- explore research-copilot extensions,
- potentially integrate or link more tightly with the main GitHub Pages site.

## Long-Term Direction

This project begins as a Personal Knowledge OS, but the architecture is intentionally designed so it can later support more specialized systems, such as:

- a research copilot for technical papers,
- a project and portfolio recommender,
- a writing assistant grounded in my own materials,
- a broader AI layer connected to my main portfolio site.

## Structure

```text
agentic-jym/
├── README.md
├── .gitignore
├── .env.example
├── .vscode/
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.ts
│   ├── .env.local
│   ├── public/
│   │   ├── favicon.ico
│   │   └── images/
│   └── src/
│       ├── app/
│       │   ├── layout.tsx
│       │   ├── page.tsx
│       │   ├── ask/
│       │   │   └── page.tsx
│       │   └── api/
│       │       └── health/
│       │           └── route.ts
│       ├── components/
│       │   ├── chat/
│       │   │   ├── ChatWindow.tsx
│       │   │   ├── ChatInput.tsx
│       │   │   ├── MessageBubble.tsx
│       │   │   └── SourceList.tsx
│       │   ├── layout/
│       │   │   ├── Navbar.tsx
│       │   │   └── Footer.tsx
│       │   └── ui/
│       ├── lib/
│       │   ├── api.ts
│       │   ├── env.ts
│       │   └── types.ts
│       └── styles/
├── backend/
│   ├── pyproject.toml
│   ├── requirements.txt
│   ├── .env
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   │   └── routes/
│   │   │       ├── health.py
│   │   │       ├── chat.py
│   │   │       └── ingest.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── logging.py
│   │   ├── db/
│   │   │   ├── client.py
│   │   │   └── queries.py
│   │   ├── services/
│   │   │   ├── ingestion.py
│   │   │   ├── chunking.py
│   │   │   ├── embeddings.py
│   │   │   ├── retrieval.py
│   │   │   ├── prompting.py
│   │   │   └── llm.py
│   │   ├── schemas/
│   │   │   ├── chat.py
│   │   │   ├── source.py
│   │   │   └── document.py
│   │   └── utils/
│   ├── scripts/
│   │   ├── ingest_docs.py
│   │   ├── reindex.py
│   │   └── seed_metadata.py
│   └── tests/
│       ├── test_health.py
│       ├── test_chat.py
│       └── test_retrieval.py
├── data/
│   ├── raw/
│   │   ├── resume/
│   │   ├── projects/
│   │   ├── research/
│   │   └── notes/
│   ├── processed/
│   └── sample_docs/
├── infra/
│   ├── sql/
│   │   ├── 001_enable_extensions.sql
│   │   ├── 002_create_documents_table.sql
│   │   └── 003_create_chunks_table.sql
│   └── docs/
└── docs/
    ├── architecture.md
    ├── roadmap.md
    └── api.md
```

Disclaimer: This chatbot has only access to professional information about me. Other views/opinions that might be expressed by the chatbot are not mine. Also, LLMs are known to hallucinate and responses might not always be accurate.
