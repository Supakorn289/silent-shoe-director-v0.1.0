# Vercel compatibility repair for Silent Shoe Director 0.1.4

This is a source-compatible adaptation of the existing Node HTTP server, NOT a replacement frontend and NOT a new app.

- Existing local CLI `npm run dev` is unchanged.
- Added four entry points in `api/`: health, models, vision, direct.
- Server request listener extracted as `handleRequest` without changing its route logic.
- Supports pre-parsed body from Vercel Functions as well as Node raw streams.
- Includes `skills/**` in both Gemini function bundles so `readFile()` does not fail in serverless.
- AI sends a compressed COPY of reference images if needed. Original image stays in browser's local project, preserving local export/import fidelity.
- Enforces a 4.2M UTF-16-character upper bound for API requests; still monitor actual UTF-8 byte size for non-Latin JSON, as API can reject requests sooner.
- Config uses 60s for Gemini, 15s for read-only health/models; external Gemini requests have 22s per fetch, with one 503 retry.
- Return codes matter: 413 payload, 504 timeout, 500 invocation failure. A generic 500 does not establish OOM.

## Settings in Vercel
- Framework Preset: Other (framework:null)
- Root Directory: repository root
- Output Directory: public
- Node version: 22.x
- Environment Variables: GEMINI_API_KEY and optional GEMINI_MODEL (do NOT commit secrets)
- Redeploy after committing the changes.

## Safe verification
1. `npm run check` and `npm test` in local repo.
2. `node --check api/vision.mjs` and `node --check lib/vercel-dispatch.mjs`.
3. `vercel dev` (if CLI is authenticated) and GET `/api/health`.
4. Verify static `/`, `/app.mjs` and `/planner.mjs`.
5. With a Gemini key set on Vercel, use a small real product image on `/api/vision` and check Function Runtime Logs.
6. Confirm Export/Import, SH_01/SH_02, End Frame and deterministic prompts still work.

If a Vercel project already has configuration, inspect and reconcile it before running this patch. The installer refuses to overwrite preexisting config or API function files.
