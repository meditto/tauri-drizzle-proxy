# 🦀 Tauri + 🧃 Drizzle + 🧩 SQLite Proxy

This project is a modern fullstack template using:

- **Tauri v2** for building secure and native cross-platform desktop apps.
- **Drizzle ORM** for type-safe database access.
- **SQLite** as the local database, accessed via a **custom Rust proxy**.

## 📦 Features

- Fully async database access using `sqlx` and Tauri commands.
- Auto-generated SQL migrations from Drizzle.
- Seamless integration with `drizzle-orm/sqlite-proxy`.

## 🚀 Getting Started

1. **Install dependencies**:

   ```bash
   git clone https://github.com/meditto/tauri-drizzle-proxy.git
   cd tauri-drizzle-proxy
   pnpm install
   ```

2. **Generate database types & migrations**:

   ```bash
   pnpm db:generate
   ```

3. **Run the app** (this will automatically run pending migrations):

   ```bash
   pnpm tauri dev
   ```

   > 🛠 Migrations will automatically apply when running the app.

4. **Update schema**:

   If you modify the schema (in `src/db/schema`), make sure to regenerate migrations/types:

   ```bash
   pnpm db:generate
   ```

## 📎 Related Links

- [Tauri v2 Docs](https://tauri.app/v2/)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [Tauri Plugin SQL](https://github.com/tauri-apps/plugins-workspace/tree/dev/plugins/sql)
- [Drizzle ORM SQLite Proxy Issue #4113](https://github.com/drizzle-team/drizzle-orm/issues/4113)
