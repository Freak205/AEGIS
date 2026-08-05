CREATE TABLE `conversations` (
	`id` text PRIMARY KEY NOT NULL,
	`customer_name` text NOT NULL,
	`initials` text NOT NULL,
	`email` text NOT NULL,
	`issue` text NOT NULL,
	`tag` text NOT NULL,
	`sentiment` text NOT NULL,
	`priority` text NOT NULL,
	`status` text DEFAULT 'ai_active' NOT NULL,
	`assigned_to` text,
	`summary` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `evaluation_runs` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text NOT NULL,
	`overall_score` real NOT NULL,
	`total_cases` integer NOT NULL,
	`passed_cases` integer NOT NULL,
	`results_json` text NOT NULL,
	`triggered_by` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `knowledge_sources` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`object_key` text,
	`source_url` text,
	`file_type` text NOT NULL,
	`size_bytes` integer DEFAULT 0 NOT NULL,
	`page_count` integer DEFAULT 1 NOT NULL,
	`chunk_count` integer DEFAULT 0 NOT NULL,
	`status` text DEFAULT 'ready' NOT NULL,
	`coverage` integer DEFAULT 0 NOT NULL,
	`extracted_text` text DEFAULT '' NOT NULL,
	`owner_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`conversation_id` text NOT NULL,
	`role` text NOT NULL,
	`body` text NOT NULL,
	`citations_json` text DEFAULT '[]' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `notifications` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`body` text NOT NULL,
	`kind` text DEFAULT 'info' NOT NULL,
	`is_read` integer DEFAULT false NOT NULL,
	`user_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `security_events` (
	`id` text PRIMARY KEY NOT NULL,
	`severity` text NOT NULL,
	`type` text NOT NULL,
	`detail` text NOT NULL,
	`status` text DEFAULT 'blocked' NOT NULL,
	`actor_id` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `support_actions` (
	`id` text PRIMARY KEY NOT NULL,
	`conversation_id` text NOT NULL,
	`type` text NOT NULL,
	`status` text NOT NULL,
	`actor_id` text NOT NULL,
	`details_json` text DEFAULT '{}' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
