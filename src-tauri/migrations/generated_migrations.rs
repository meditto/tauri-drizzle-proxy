use tauri_plugin_sql::{Migration, MigrationKind};

pub fn load_migrations() -> Vec<Migration> {
    vec![
        Migration { version: 0, description: "init", sql: include_str!("./0000_init.sql"), kind: MigrationKind::Up },
    ]
}
