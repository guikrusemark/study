# Copilot Instructions for AI Agents

## Core Commands

- **Install dependencies:**
  - `npm install`
- **Run development server:**
  - `npm run dev`
- **Build application:**
  - `npm run build`
- **Start production server:**
  - `npm start`
- **Lint & format:**
  - `npm run lint` (uses Biome, auto-fixes and formats)
- **Infrastructure (Terraform):**
  - `cd terraform`
  - `terraform init`, `terraform plan`, `terraform apply`

## Architecture Overview

- **Frontend:** Next.js app (`src/`)
  - App router in `src/app/`
  - UI components in `src/components/`
- **Infrastructure:** Terraform (`terraform/`)
  - Provisions AWS (VPC, EC2, S3, IAM, Security Groups)
  - Integrates with MongoDB Atlas, Neon PostgreSQL, Upstash Redis
- **Static assets:** `public/`

## Style & Coding Rules

- **Formatting:**
  - Enforced by Biome (`biome.json`):
    - Tabs for indentation
    - Double quotes for JS/TS
    - Organize imports automatically
- **Linting:**
  - Biome linter, strict mode enabled
- **TypeScript:**
  - Strict mode (`tsconfig.json`)
  - No JS files allowed
  - Use `@/*` alias for imports from `src/`
- **Naming:**
  - Use descriptive, camelCase for variables/functions
  - PascalCase for React components
- **Error Handling:**
  - Prefer explicit error handling, especially for async ops
- **Imports:**
  - Use absolute imports via `@/` alias

## Agent Rules

- No `.cursor`, `.cursorrules`, `AGENTS.md`, or similar agent-specific rules detected.
- No existing Copilot instructions file found.

## Docs & References

- See root `README.md` and `terraform/README.md` for project and infra details.
- Do not copy boilerplate; summarize and reference docs as needed.

---
For more: https://aka.ms/vscode-instructions-docs
