import { reset } from 'drizzle-seed';
import * as schema from '@/db/schema';
import db from './database';

const users = [
    {
        name: 'John Doe',
        email: 'johndoe@example.com',
        age: 30,
        city: 'New York',
        posts: [
            {
                title: 'First Post',
                content: 'This is the content of the first post.',
                comments: [
                    {
                        content: 'Great post!'
                    },
                    {
                        content: 'Thanks for sharing!'
                    }
                ]
            }
        ]
    }
];
export default async function seed() {
    // @ts-ignore
    await reset(db, schema);
    for (const user of users) {
        const [insertedUser] = await db
            .insert(schema.user)
            .values({
                name: user.name,
                email: user.email,
                age: user.age,
                city: user.city
            })
            .returning();
        console.log(`Inserted user: ${insertedUser.name} with ID: ${insertedUser.id}`);

        for (const post of user.posts) {
            const [insertedPost] = await db
                .insert(schema.post)
                .values({
                    title: post.title,
                    content: post.content,
                    user_id: insertedUser.id
                })
                .returning();

            for (const comment of post.comments) {
                await db.insert(schema.comment).values({
                    content: comment.content,
                    user_id: insertedUser.id,
                    post_id: insertedPost.id
                });
            }
        }
    }
}
