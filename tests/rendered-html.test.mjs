import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFile(new URL(path, root), "utf8");

test("Next.js production build is deployable", async () => {
  await access(new URL(".next/BUILD_ID", root));
  const manifest = JSON.parse(await read(".next/routes-manifest.json"));
  assert.ok(Array.isArray(manifest.dynamicRoutes));
});

test("Vercel deployment contract is explicit", async () => {
  const config = JSON.parse(await read("vercel.json"));
  assert.equal(config.framework, "nextjs");
  assert.equal(config.installCommand, "npm ci");
  assert.equal(config.buildCommand, "npm run build");

  const env = await read(".env.example");
  assert.match(env, /UPSTASH_REDIS_REST_URL/);
  assert.match(env, /UPSTASH_REDIS_REST_TOKEN/);
  assert.match(env, /BLOB_READ_WRITE_TOKEN/);
  assert.match(env, /AEGIS_DEMO_MODE/);
});

test("API uses Vercel-compatible durable storage with a safe demo fallback", async () => {
  const api = await read("app/api/aegis/route.ts");
  assert.match(api, /from "@upstash\/redis"/);
  assert.match(api, /from "@vercel\/blob"/);
  assert.match(api, /UPSTASH_REDIS_REST_URL/);
  assert.match(api, /BLOB_READ_WRITE_TOKEN/);
  assert.match(api, /__aegisWorkspace/);
  assert.doesNotMatch(api, /cloudflare:workers|D1Database|R2Bucket/);
});

test("all operational actions remain wired", async () => {
  const [api, page] = await Promise.all([read("app/api/aegis/route.ts"), read("app/page.tsx")]);
  for (const action of [
    "send_message",
    "approve_replacement",
    "escalate",
    "take_over",
    "close_conversation",
    "retry_activation",
    "carrier_escalation",
    "run_evaluation",
    "simulate_attack",
    "connect_url",
    "delete_source",
    "mark_notifications_read",
  ]) {
    assert.match(api, new RegExp(`"${action}"`));
  }
  assert.match(page, /\/api\/aegis/);
});

test("repository includes automated GitHub verification", async () => {
  const workflow = await read(".github/workflows/ci.yml");
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm run lint/);
  assert.match(workflow, /npm run typecheck/);
  assert.match(workflow, /npm test/);
});
