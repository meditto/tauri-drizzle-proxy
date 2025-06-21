import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import comment from "./comment";
import user from "./user";

const post = sqliteTable("post", {
	id: integer("id").primaryKey().unique(),
	title: text("title").notNull(),
	content: text("content").notNull(),

	user_id: integer("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),

	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`)
});

export const postRelations = relations(post, ({ one, many }) => ({
	author: one(user, {
		fields: [post.user_id],
		references: [user.id]
	}),
	comments: many(comment)
}));

export default post;
