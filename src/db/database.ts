import { invoke } from "@tauri-apps/api/core";
import { drizzle } from "drizzle-orm/sqlite-proxy";
import * as schema from "./schema";

type Row = {
	columns: string[];
	values: string[];
};
const db = drizzle(
	async (sql, params, method) => {
		try {
			const rows = await invoke<Row[]>("run_sql", {
				query: { sql, params }
			});
			if (rows.length === 0 && method === "get") {
				/**
				 * 🛠 Workaround for Drizzle ORM SQLite Proxy `.get()` bug
				 *
				 * `.get()` with no results throws due to Drizzle trying to destructure `undefined`.
				 * See: https://github.com/drizzle-team/drizzle-orm/issues/4113
				 *
				 * Until fixed upstream, we return `{}` when rows are empty to avoid crashes.
				 */
				return {} as { rows: string[] };
			}
			return method === "get"
				? { rows: rows[0].values }
				: { rows: rows.map((r) => r.values) };
		} catch (e: unknown) {
			console.error("Error from sqlite proxy server: ", e);
			return { rows: [] };
		}
	},
	{
		schema,
		logger: true
	}
);

export default db;
