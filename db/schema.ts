import { sql } from "drizzle-orm";
import { index, integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const conversations = sqliteTable("conversations", {
  id: text("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  initials: text("initials").notNull(),
  email: text("email").notNull(),
  issue: text("issue").notNull(),
  tag: text("tag").notNull(),
  sentiment: text("sentiment").notNull(),
  priority: text("priority").notNull(),
  status: text("status").notNull().default("ai_active"),
  assignedTo: text("assigned_to"),
  summary: text("summary").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_conversations_status_updated").on(table.status, table.updatedAt)]);

export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id").notNull(),
  role: text("role").notNull(),
  body: text("body").notNull(),
  citationsJson: text("citations_json").notNull().default("[]"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_messages_conversation_created").on(table.conversationId, table.createdAt)]);

export const supportActions = sqliteTable("support_actions", {
  id: text("id").primaryKey(),
  conversationId: text("conversation_id").notNull(),
  type: text("type").notNull(),
  status: text("status").notNull(),
  actorId: text("actor_id").notNull(),
  detailsJson: text("details_json").notNull().default("{}"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_actions_conversation_created").on(table.conversationId, table.createdAt)]);

export const knowledgeSources = sqliteTable("knowledge_sources", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  objectKey: text("object_key"),
  sourceUrl: text("source_url"),
  fileType: text("file_type").notNull(),
  sizeBytes: integer("size_bytes").notNull().default(0),
  pageCount: integer("page_count").notNull().default(1),
  chunkCount: integer("chunk_count").notNull().default(0),
  status: text("status").notNull().default("ready"),
  coverage: integer("coverage").notNull().default(0),
  extractedText: text("extracted_text").notNull().default(""),
  ownerId: text("owner_id").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_knowledge_status_updated").on(table.status, table.updatedAt)]);

export const evaluationRuns = sqliteTable("evaluation_runs", {
  id: text("id").primaryKey(),
  status: text("status").notNull(),
  overallScore: real("overall_score").notNull(),
  totalCases: integer("total_cases").notNull(),
  passedCases: integer("passed_cases").notNull(),
  resultsJson: text("results_json").notNull(),
  triggeredBy: text("triggered_by").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const securityEvents = sqliteTable("security_events", {
  id: text("id").primaryKey(),
  severity: text("severity").notNull(),
  type: text("type").notNull(),
  detail: text("detail").notNull(),
  status: text("status").notNull().default("blocked"),
  actorId: text("actor_id"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_security_created").on(table.createdAt)]);

export const notifications = sqliteTable("notifications", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  kind: text("kind").notNull().default("info"),
  isRead: integer("is_read", { mode: "boolean" }).notNull().default(false),
  userId: text("user_id").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("idx_notifications_user_read").on(table.userId, table.isRead, table.createdAt)]);
