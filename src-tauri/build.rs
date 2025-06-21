use std::{
    env, fs,
    path::{Path, PathBuf},
};

fn main() {
    let out_dir = PathBuf::from(env::var("OUT_DIR").unwrap());
    let out_file = out_dir.join("generated_migrations.rs");
    let migrations_dir = Path::new("migrations");

    println!("cargo:rerun-if-changed=src-tauri/migrations");

    let mut contents = String::from(
        "use tauri_plugin_sql::{Migration, MigrationKind};\n\n\
         pub fn load_migrations() -> Vec<Migration> {\n    vec![\n",
    );

    for entry in fs::read_dir(migrations_dir).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();

        if path.extension().and_then(|e| e.to_str()) != Some("sql") {
            continue;
        }

        let file_name = path.file_name().unwrap().to_str().unwrap().to_owned();
        let stem = path.file_stem().unwrap().to_str().unwrap();
        let version = stem
            .split('_')
            .next()
            .and_then(|v| v.parse::<i64>().ok())
            .unwrap_or(0);
        let description = "init"; // 🛠 always use "init"

        // Copy the .sql file into OUT_DIR
        let dest_path = out_dir.join(&file_name);
        fs::copy(&path, &dest_path).expect("❌ Failed to copy SQL migration to OUT_DIR");

        // Include the copied file (now relative path is valid)
        contents.push_str(&format!(
            "        Migration {{ version: {}, description: \"{}\", sql: include_str!(\"{}\"), kind: MigrationKind::Up }},\n",
            version,
            description,
            dest_path.file_name().unwrap().to_str().unwrap()
        ));
    }

    contents.push_str("    ]\n}\n");

    fs::write(&out_file, contents).expect("❌ Failed to write generated_migrations.rs");
    println!("✅ Generated: {:?}", out_file);

    tauri_build::build();
}
