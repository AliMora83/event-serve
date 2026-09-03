# EventServe Website

Version: 2.0.0
Last updated: 2026-09-03

> **Note on this file's history.** Earlier versions described a "Mobile Check-in
> & Passes" product — QR scanning, PDF ticket generation, staff auth, EventSaaS
> sync. None of that exists in this repository and never did. That metadata
> arrived from another project. This file has been rewritten to describe the
> actual product. The previous content is archived outside the repo and
> recoverable via `git show <pre-rewrite-sha>:Master.md`.
>
> **On format:** this file deliberately does NOT match the previous heading
> structure. The original used `**Version:** 1.0.1` bold-bullet fields and had
> no `Last updated:` line, which meant it failed both CI regexes in
> `.github/workflows/`. The plain `Version:` / `Last updated:` fields below
> match what the workflows actually parse. If namka-control expects something
> different, change it there and record why.

## Status

| Field | Value |
|---|---|
| Owner | AliMora83 |
| Status | In progress |
| Priority | 1 |
| Progress | 5% |
| Stack | Astro 5 / vanilla CSS / static |
| Repo | AliMora83/event-serve |
| Deploy | HostAfrica shared cPanel (Apache) |
| Staging | staging.eventserve.co.za |
| Live | eventserve.co.za |
| Next step | Sprint 1.1 — audit complete, foundation in progress |
| Blocker | Client content: founder name, 8 service descriptions, logo permissions |

## Project vision

A marketing website for EventServe, a South African event management company
operating in Johannesburg, Cape Town, Durban and Bloemfontein. The site's job
is to win enquiries from two audiences: organisations booking event delivery,
and brands considering sponsorship partnerships.

Replaces a single-page React/Vite build that had a non-functional contact form,
contradictory statistics, and no route structure.

## Roadmap

Full detail in `PROJECT.md`. Summary:

**Phase 1 — Foundation and core site**
- Sprint 1: Repo, tokens, shell, deploy pipeline
- Sprint 2: Home page
- Sprint 3: About, Services, Contact

**Phase 2 — Partnerships, motion, launch**
- Sprint 4: Partnerships page
- Sprint 5: Motion layer and performance
- Sprint 6: Audit, content sign-off, launch

## Known issues carried from the previous build

| Issue | Resolution |
|---|---|
| Contact form never delivered a message (Netlify Forms on non-Netlify host) | Web3Forms, Sprint 1.1 |
| "15+ years" vs "since 2020" contradiction | Reframed as founder experience |
| Unverifiable 98% satisfaction stat | Replaced with 70% repeat clients |
| 500+ events claim | Corrected to 150+ |
| Single crimson used for both fills and type, failing contrast | Three-token split |
| 46MB of unoptimised PNGs | `astro:assets`, AVIF/WebP |
| 29MB self-hosted video | Moved to Vimeo |
| No route structure, dead page components | Five real routes |
