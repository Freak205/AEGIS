CREATE INDEX `idx_conversations_status_updated` ON `conversations` (`status`,`updated_at`);--> statement-breakpoint
CREATE INDEX `idx_knowledge_status_updated` ON `knowledge_sources` (`status`,`updated_at`);--> statement-breakpoint
CREATE INDEX `idx_messages_conversation_created` ON `messages` (`conversation_id`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_notifications_user_read` ON `notifications` (`user_id`,`is_read`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_security_created` ON `security_events` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_actions_conversation_created` ON `support_actions` (`conversation_id`,`created_at`);