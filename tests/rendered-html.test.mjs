import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

const read = (path) => readFile(new URL(path, root), "utf8");

test("build emits the Aegis worker", async () => {
  await access(new URL("dist/server/index.js", root));
  const worker = await read("dist/server/index.js");
  assert.match(worker, /Aegis/);
  assert.match(worker, /api\/aegis/);
});

test("hosting configuration provisions durable database and object storage", async () => {
  const hosting = JSON.parse(await read(".openai/hosting.json"));
  assert.equal(hosting.d1, "DB");
  assert.equal(hosting.r2, "KNOWLEDGE");
  assert.match(hosting.project_id, /^appgprj_/);
});

test("database schema covers every operational workflow", async () => {
  const schema = await read("db/schema.ts");
  for (const table of [
    "conversations",
    "messages",
    "support_actions",
    "knowledge_sources",
    "evaluation_runs",
    "security_events",
    "notifications",
  ]) {
    assert.match(schema, new RegExp(`sqliteTable\\("${table}"`));
  }

  const initialMigration = await read("drizzle/0000_heavy_old_lace.sql");
  const indexMigration = await read("drizzle/0001_handy_shooting_star.sql");
  assert.match(initialMigration, /CREATE TABLE `messages`/);
  assert.match(initialMigration, /CREATE TABLE `knowledge_sources`/);
  assert.match(indexMigration, /idx_messages_conversation_created/);
});

test("API exposes conversations, search, uploads and audited actions", async () => {
  const api = await read("app/api/aegis/route.ts");
  assert.match(api, /export async function GET/);
  assert.match(api, /export async function POST/);
  assert.match(api, /formData\(\)/);
  assert.match(api, /bucket\.put/);

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
});

test("interface wires every major workspace to live mutations", async () => {
  const page = await read("app/page.tsx");
  for (const view of [
    "overview",
    "inbox",
    "knowledge",
    "evaluations",
    "security",
    "analytics",
    "team",
  ]) {
    assert.match(page, new RegExp(`"${view}"`));
  }
  assert.match(page, /\/api\/aegis/);
  assert.match(page, /webkitSpeechRecognition/);
  assert.match(page, /run_evaluation/);
  assert.match(page, /simulate_attack/);
  assert.match(page, /carrier_escalation/);
});
