import "./app.css";
import { useEffect } from "react";
import { CodeRunner } from "@/components/code-runner";
import db from "@/db/database";
import seed from "@/db/seed";

const userQueryCode = `const user = await db.query.user.findFirst({
with: { 
	posts: {
		with: { 
			comments: true
		}
	}
},
});`;

const postQueryCode = `const posts = await db.query.post.findMany({
with: {
author: true
}
});`;

function App() {
	async function runUserQuery() {
		const user = await db.query.user.findFirst({
			with: {
				posts: {
					with: {
						comments: true
					}
				}
			}
		});
		return JSON.stringify(user, null, 2);
	}

	async function runPostQuery() {
		const posts = await db.query.post.findMany({
			with: { author: true }
		});
		return JSON.stringify(posts, null, 2);
	}

	useEffect(() => {
		async function runSeeder() {
			try {
				await seed();
				console.log("Database seeded successfully");
			} catch (error) {
				console.error("Error seeding database:", error);
			}
		}
		runSeeder();
	}, []);

	return (
		<main className="container">
			<h1>Welcome to Tauri + React + Drizzle</h1>

			<CodeRunner
				title="Fetch first user with posts"
				code={userQueryCode}
				onRun={runUserQuery}
			/>

			<CodeRunner
				title="Fetch all posts with authors"
				code={postQueryCode}
				onRun={runPostQuery}
			/>
		</main>
	);
}

export default App;
