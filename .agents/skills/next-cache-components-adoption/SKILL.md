---
name: next-cache-components-adoption
description: Skill for next-cache-components-adoption
---

# next-cache-components-adoption


Enable Cache Components on an app and walk it to a passing build. This skill sequences the work; per-error recipes live in the dev overlay fix cards and the build's terminal output. The [migrating to Cache Components guide](https://nextjs.org/docs/app/guides/migrating-to-cache-components) is the canonical reference for the concepts and per-API recipes this skill applies — consult it whenever the skill steps reference a pattern (`"use cache"`, `cacheLife`, `<Suspense>` placement, etc.) and you want the full explanation.


## requires




App Router project. Cache Components is an App Router feature; `cacheComponents: true` does nothing for `pages/` routes. If the project has a `pages/` or `src/pages/` tree but no `app/` or `src/app/` tree, stop and tell the user — Pages → App migration is its own project, not part of this skill. A hybrid app (both `pages/` and `app/`) is fine: the flag affects the `app/` routes; `pages/` routes are unaffected and don't need opt-outs.




A resolved app directory. Locate `next.config.{js,ts,mjs,cjs}` first: that's the project root, and an agent invoked from a subdirectory would otherwise test for `app/` against the wrong `cwd` and find nothing. Look for `app/` and `src/app/` under it, and treat every command and glob in this skill as relative to whichever one exists. If both exist, Next.js builds `app/` and never looks at `src/app/`, so its routes are shadowed and unbuilt — tell the user that and ask which tree to migrate instead of picking one.




A runnable app. The whole loop verifies against `next dev` and a browser, so the app has to boot. If it reads a database or required env at import (e.g. an `env.ts` that throws on a missing `DATABASE_URL`), confirm it actually starts — with the real environment, or local data you stand up — before step 1. Adoption can't be verified against an app that won't run.




Next.js 16.3 or later. That release is where the pieces this skill relies on land: top-level `cacheComponents`, `export const instant`, the dev-overlay instant-navigation validation warnings, and the `cache-components-instant-false` codemod. If `next --version` reports below 16.3, upgrade first:



- `npx @next/codemod@latest upgrade latest` to apply the version-to-version codemods.

- Read the relevant [version upgrade guide](https://nextjs.org/docs/app/guides/upgrading) (e.g. [Version 16](https://nextjs.org/docs/app/guides/upgrading/version-16)) for what the codemod doesn't cover.





No incompatible config keys. `cacheComponents: true` errors on any file that still exports `dynamic`, `revalidate`, or `fetchCache`. Translate, don't delete. Each export encodes behavior the route needs to keep doing; migrate each one to its Cache Components equivalent via the [migration guide's per-key sections](https://nextjs.org/docs/app/guides/migrating-to-cache-components#enable-cache-components). The exception is `dynamic = 'force-dynamic'`: under Cache Components every route is already dynamic by default, so the migration guide removes it outright rather than translating it — don't overthink a batch of identical `force-dynamic` deletions. `revalidate` and `fetchCache` still need real translation. If a value can't be cleanly translated yet, leave a `// TODO: Cache Components adoption — restore revalidate = 3600` comment so the loop picks it up. The `cache-components-instant-false` codemod does not touch these.




`experimental.dynamicIO` is fatal. It was renamed to top-level `cacheComponents` and the old key now aborts before any build can run — remove it (or replace with `cacheComponents: true`) first. `experimental.useCache` is still accepted as a deprecated alias; redundant once `cacheComponents: true` is set, so remove it for clarity.
