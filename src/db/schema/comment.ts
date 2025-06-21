import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import post from "./post";
import user from "./user";

const comment = sqliteTable("comment", {
	id: integer("id").primaryKey().unique(),
	content: text("content").notNull(),

	user_id: integer("user_id")
		.notNull()
		.references(() => user.id),
	post_id: integer("post_id")
		.notNull()
		.references(() => post.id, { onDelete: "cascade" }),

	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const commentRelations = relations(comment, ({ one }) => ({
	author: one(user, {
		fields: [comment.user_id],
		references: [user.id],
	}),
	post: one(post, {
		fields: [comment.post_id],
		references: [post.id],
	}),
}));

export default comment;
