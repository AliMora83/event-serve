# Document cleanup

Run this before Sprint 1.1 Task 3. Documentation and repo hygiene only — no
application code, and do not install the scaffold.

Your Steps 1–3 are already done. This picks up from there.

---

## Rulings on the six conflicts you flagged

All six were correct. Here's how each resolves:

**1. `Master.md` — keep it.** `CLAUDE.md` was right, `SPRINT-1.1.md` Decision B
was stale and has been patched. MACP is the convention across this workspace
and namka-control expects the file. It stays, rewritten.

**2. `PROJECT-SYNC.json` — disable, don't delete.** Your reading of the workflow
is right: it hardcodes `pass.namka.org`, the wrong stack, and a repo name that
doesn't match the remote. But we don't know whether namka-control reads
`PROJECT-SYNC.json` or `Master.md`. Deleting the wrong one drops this project
off the dashboard silently. Rename the workflow to `.disabled` and delete the
stale JSON. Permanent removal waits until someone checks namka-control.

**3. The heading-match instruction was wrong.** You proved the committed
original fails both CI regexes. Matching it would mean matching something
already broken. That instruction has been removed from `Master.md`; the new
format stands.

**4. `eventserve-scaffold.zip` — correct, already extracted.** §3.3 becomes
"move `eventserve/*` up after `legacy/` exists." Collision warning still applies.

**5. `public/images/` stubs — dropped.** The scaffold now ships `src/assets/`
with a README instead. Fixed at source.

**6. `.gitignore` gap — fixed in §3 below, before any `.env` can appear.**

---

## 1. Pull first

`main` is 3 commits behind `origin/main`. Do this before the tree grows.

```bash
git stash -u
git pull
git stash pop
```

## 2. Archive the recovered Master.md

`/tmp` clears on reboot, so this is the urgent one.

Move `/tmp/Master.recovered.md` to:

```
~/dev/AntiG/EventSAAS/Master.recovered-from-events-website.md
```

It describes a QR check-in and pass-generation product with Phase 1 marked
complete and Phase 2 half-done. If that work is real it belongs to EventSAAS,
which is the closest match in the workspace. **Do not merge it into anything
there** — just park it and flag it to me. Whoever owns EventSAAS decides
whether it's live status or an abandoned branch of thinking.

## 3. Repo hygiene

- [ ] `.gitignore` at root: add `.astro/` and `.env`. It currently has neither,
      and `.env.example` is now sitting at root inviting a `.env` beside it
- [ ] Commit the `AGENT-ONBOARDING.md` deletion — `CLAUDE.md` replaces its role
- [ ] Delete `yarn.lock` (npm is the de-facto manager, per your audit)
- [ ] Delete the stale Feb-2026 `dist/`
- [ ] Review the uncommitted `AI_CHANGELOG.md` edits — report what's in them
      before committing, given what happened to `Master.md`

## 4. Workflows

Both bot-commit to `main` on every push and will fight every sprint-closing
push.

- [ ] `generate-project-sync.yml` → `generate-project-sync.yml.disabled`
- [ ] `update-master-date.yml` → `update-master-date.yml.disabled`
      (it was never committed — stage the rename, not a new file)
- [ ] Delete the stale `PROJECT-SYNC.json`
- [ ] Add a comment at the top of each disabled workflow saying why and when
      to revisit: after v1.0, once someone has checked what namka-control reads

Verify no other workflow pushes to `main`.

## 5. Branch check

`temp-doc-sync-eventswebsite` exists locally. Given `Master.md` was truncated by
something that claimed to preserve content, a branch named "temp doc sync" is
a plausible culprit.

- [ ] Report what's on it and when it was last touched. Do not delete it yet

## Definition of done

- `main` current with origin, working tree clean
- Recovered `Master.md` archived outside this repo
- `.gitignore` covers all five entries
- Both workflows disabled with a comment explaining why
- `PROJECT-SYNC.json` gone
- `temp-doc-sync-eventswebsite` reported on

## Closing

```bash
git checkout -b sprint/1.1-docs
git add -A
git commit -m "docs: correct project metadata, add CLAUDE.md, disable stale workflows"
git checkout main && git merge --no-ff sprint/1.1-docs
git push origin main
```

No tag. This is preparatory — `v0.1.1` comes at the end of Sprint 1.1 proper.

Append an `AI_CHANGELOG.md` entry recording that `Master.md` previously
described an unrelated QR check-in product, that the contact form never
delivered a message, and where the recovered file was archived. Someone will
rediscover all three otherwise.
