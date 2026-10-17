---
name: investigate-issue
description: >
  Investigate a suspected bug, gap or new piece of work on the furrow-cam-site landing
  page and file a GitHub issue for it in this repo's issue format (context, acceptance
  criteria, links to exact lines on `main`, one type label). Use when the user reports
  something broken or out of date on the site, asks to "look into" or "investigate" a
  problem, or wants a finding or idea turned into a tracked issue. Investigation and
  filing only — it does not change code; use solve-issue (manual) or auto-solve-issue
  (automated, opens a PR) to work on an already-filed issue.
---

# Investigating and filing an issue

This repo's workflow is: investigate first, file a GitHub issue, then a separate pass
(`solve-issue` or `auto-solve-issue`) branches off `main` and implements it. Stay in
investigate-only mode here — don't edit code, don't open a PR.

## 1. Investigate

- Trace the actual root cause by reading the code, not by guessing from the symptom.
  Note exact file paths and line ranges as you go.
- Identify the affected part of the site (see `README.md` → Layout):
  - `src/pages/index.astro` — page assembly
  - `src/components/` — Header, Hero, Features, Machines, OpenSource, Footer
  - `src/layouts/Layout.astro` — `<head>`: title, description, Open Graph
  - `src/lib/links.ts` — every outbound URL
  - `src/styles/global.css` — Tailwind theme, colours, dark mode
- Facts on the page (features, machine presets, supported controllers) must match what
  the app ships. If the finding is about content accuracy, check the app's README and
  releases in [furrow-cam](https://github.com/federicovezzoli/furrow-cam) and link the
  source of truth.
- If you're not confident you've found the real cause, say so in the issue rather than
  presenting a guess as settled fact.

## 2. Draft the issue, matching existing conventions

If the repo already has issues, skim a couple for tone and format before drafting:
`gh issue list --limit 10 --state all`, then `gh issue view <n>` on one or two.

**Title:** concise and specific, e.g. `Machines grid overflows at 360px width`.
Prefix with `[Scoping]` only for an open design question that needs discussion before
any code is written (`auto-solve-issue` refuses these).

**Body**, in English (the repo is public), using only the sections that apply:

- A short opening paragraph — what's wrong or what's needed, and why.
- Code links as permalinks: `https://github.com/<owner>/<repo>/blob/main/<path>#L<start>-L<end>`
  (get owner/repo from `gh repo view --json nameWithOwner`), plus the relevant snippet in
  a fenced code block.
- `### Impact` — for bugs: the concrete, visible consequence (viewport, theme, browser).
- `### Suggested fix` — a concrete direction, if you have one.
- `### Acceptance criteria` — a checklist (`- [ ] ...`) that defines done.
- `### Notes` — related issues (`#n`), app-repo references, how it was found.

**Labels:** one of `bug`, `enhancement`, `documentation`; add `accessibility` when the
issue is a barrier for people with disabilities.

## 3. Confirm, then file

Show the user the drafted title, body and labels before creating anything — filing an
issue on a public repo is a visible, shared action and needs explicit confirmation first.

Once confirmed:

```bash
gh issue create --title "..." --label "..." [--label accessibility] --body "$(cat <<'EOF'
...
EOF
)"
```

Report back the issue number/URL that `gh issue create` returns.
