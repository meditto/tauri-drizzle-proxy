import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "sqlite",
	schema: "./src/db/schema",
	out: "./src-tauri/migrations",
	verbose: false,
	strict: true,
});
