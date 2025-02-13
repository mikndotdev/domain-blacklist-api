import { Elysia } from 'elysia';
import fs from 'node:fs';

const blacklist = fs.readFileSync('./blacklist.txt', 'utf-8').split('\n');

const app = new Elysia()

app.get('/', (req) => {
  const url = req.query.url
    if (!url) return new Response('No URL provided', { status: 400 });
    const domain = new URL(url).hostname;
    if (blacklist.includes(domain)) return new Response('URL is blacklisted', { status: 403 });
    return new Response('URL is not blacklisted', { status: 200 });
});

app.listen(process.env.PORT || 3000);

console.log(`Listening on ${app.server!.url}`);

