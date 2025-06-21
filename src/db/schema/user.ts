import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import comment from "./comment";
import post from "./post";

const user = sqliteTable("user", {
	id: integer("id").primaryKey().unique(),
	name: text("name"),
	email: text("email").unique(),
	age: integer("age").default(18),
	city: text("city").default("NULL"),

	created_at: text("created_at").default(sql`CURRENT_TIMESTAMP`),
	updated_at: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const userRelations = relations(user, ({ many }) => ({
	posts: many(post),
	comments: many(comment),
}));

export default user;
