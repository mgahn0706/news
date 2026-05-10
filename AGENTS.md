# AGENTS.md - News Stand Project

This document applies to the entire `/Users/teseuteu/news-stand/news` repository.
If the user gives a direct instruction, follow that first. Otherwise, use this document as the default working policy.

## Project Overview

A desktop-first web UI project inspired by Naver News Stand.
Users can browse a press-outlet grid, subscribe or unsubscribe to outlets, and inspect grouped article lists by category in list view.

- Design spec: `docs/docs-design-spec.pdf`
- Design system: `docs/docs-design-system.pdf`
- Implementation checklist: `docs/checklist.md`
- Coding convention: `docs/coding-convention.md`
- Coding behavior: `docs/coding-behavior.md`

If a task affects UI, layout, interaction, typography, color, or spacing, check the relevant PDFs first and implement against them.
When a guess conflicts with the docs, the docs win.

## Document Usage

- When editing implementation files, always reference `docs/coding-convention.md`.
- For working style, validation, review, questions, and reporting, always reference `docs/coding-behavior.md`.
- For UI validation, always use `docs/checklist.md`.
- If documents conflict, interpret them in this order: user request, design PDFs, checklist, then the detailed rule documents.

## Main Commands

```bash
npm run dev      # Start the dev server
npm run build    # Type-check and build for production
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```
