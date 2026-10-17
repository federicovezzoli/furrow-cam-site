---
name: solve-issue
description: >
  Pick up an already-filed GitHub issue in furrow-cam-site and start work on it manually:
  fetch the issue, sync `main`, create a `<type>/issue-<n>` branch, summarize the issue as
  working context, then implement it following this repo's conventions (Astro, Tailwind,
  `pnpm build` as the check). Use when the user says to work on, solve, fix, or pick up a
  specific issue number. Never commits, pushes, or opens a PR itself; it hands back a
  suggested commit message and PR title/body and leaves committing, pushing, and opening
  the PR to the user. For a fully automated version that also commits, pushes, opens the
  PR, and handles Copilot review, use auto-solve-issue instead.
---

# Solving a filed issue (manual)

Second half of this repo's investigate → solve workflow (see `investigate-issue` for
the first half). Expects an issue number as input (e.g. `/solve-issue 9`). If none was
given, ask.

## 1. Fetch the issue

```bash
gh issue view <n> --json number,title,body,labels,url
```

Read the body fully, including any linked app-repo docs or releases.

Stay in discussion mode instead of branching/coding when:

- the title starts with `[Scoping]`, or
- the issue still needs a decision (e.g. copy or design not yet agreed, or an open
  question in the body). Propose the decision, get the user's answer, then record it by
  **editing the issue body** (`gh issue edit <n> --body ...`), never as a comment: the
  body is the single source of truth for agreed scope. Then start coding.

Also check dependencies: if the body references other open issues it builds on, say so
and ask whether to proceed.

## 2. Sync and branch

- `git status` — if the working tree isn't clean, stop and ask before doing anything
  that could discard work.
- `git checkout main && git pull`
- Branch type prefix, derived from labels and content: `bug` label → `fix`;
  docs-only, deployment or tooling work → `chore`; everything else → `feat`.
- `git checkout -b <type>/issue-<n>`

## 3. Hand off with context, then implement

Summarize: the issue's goal, the acceptance criteria and the files likely involved. Then
implement it following the conventions in `README.md`:

- Static HTML, no client-side JavaScript shipped, no tracking.
- The app's visual language: JetBrains Mono, greys, square corners; light and dark theme
  via the system preference (`src/styles/global.css`).
- Outbound URLs live in `src/lib/links.ts`, not inline in components.
- Facts on the page must match what the app actually ships — check the furrow-cam README
  and releases when changing them.
- Update `README.md` if the layout or workflow changes.

Before calling it done, this must pass (it runs `astro check` and the build):

```bash
pnpm build
```

For visual changes, also check the page in `pnpm dev` at phone and desktop widths, in
both light and dark mode.

## 4. When the work is ready

Do not run `git commit`, `git push`, or `gh pr create` — the user commits and pushes
themselves. Stop once the change is ready, and hand back:

- Commit message(s) following this repo's convention: one short line, `type: description`
  (`feat:`, `fix:`, `chore:`, `docs:`), split by concern — see recent `git log` for tone.
- A PR title/body suggestion: PR to `main`, body with `Closes #<n>`, a short `## What`
  section and how it was checked.
