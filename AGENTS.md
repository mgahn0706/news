# AGENTS.md

Guidance for Codex and similar coding agents working in this repository.

## Scope

- This file applies to the entire repository.
- Follow direct user instructions first. Use this file as the default repo contract when the user has not specified a different workflow.

## Project Context

- Stack: Vite, React, TypeScript.
- Entry points: `src/main.tsx`, `src/App.tsx`.
- Static assets live under `public/` and `src/assets/`.

## Working Rules

- Preserve user changes. The worktree may already be dirty; do not revert unrelated edits.
- Keep changes minimal and local to the request.
- Prefer updating existing files over adding new abstractions unless the change clearly benefits from extraction.
- Match the existing style in the touched area before introducing new patterns.
- Use ASCII by default unless a file already relies on non-ASCII text.
- Add comments only when the code would otherwise be hard to follow.

## React And TypeScript

- Use function components and idiomatic React 19 patterns.
- Prefer clear state flow over premature optimization.
- Do not add `useMemo` or `useCallback` by default; only add them when there is a concrete need.
- Keep TypeScript types explicit when inference would be unclear to a reader.

## Styling

- Preserve the current visual language unless the user asks for a redesign.
- Prefer editing the existing CSS files in `src/` instead of introducing a new styling system.

## Verification

- Run targeted checks after changes when possible.
- Primary commands:
  - `npm run build`
  - `npm run lint`
- If a check cannot be run, state that clearly in the final response.

## Response Expectations

- Report what changed and any verification performed.
- Call out assumptions, blockers, or notable risks briefly and directly.
