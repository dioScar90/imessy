# iMessy

To clear database, type *flushall* on the **Upstash CLI**.

For button?:
- npm i class-variance-authority

For icons:
- npm install lucide-react

For classes:
- npm install clsx tailwind-merge

Create account (if not having yet) and a database in Upstash and copy/past both *UPSTASH_REDIS_REST_URL* and *UPSTASH_REDIS_REST_TOKEN* to your *.env.local* file.
- npm i @upstash/redis

For authentication:
- npm install --save next-auth

For authOptions:
- npm install @next-auth/upstash-redis-adapter

For toast notification:
- npm install react-hot-toast

For Tailwind CSS Forms:
- npm install @tailwindcss/forms
Then add *require('@tailwindcss/forms')* to *plugins* property in *tailwind.config.ts*.

For handling forms:
- npm install react-hook-form @hookform/resolvers zod axios

For useful Textarea:
- npm install react-textarea-autosize

For id generation:
- npm install nanoid

For date:
- npm install date-fns
 
For push notifications;
- npm install pusher pusher-js
...and then create or login with your account in the [Pusher WebSite](https://pusher.com). Create your project and then go to *App Keys*. There are everything you need. Paste these variables in you *.env.local* and rename this way:

| After | Before |
| -------- | ------- |
| app_id | PUSHER_APP_ID |
| key | NEXT_PUBLIC_PUSHER_APP_KEY |
| secret | PUSHER_APP_SECRET |

The 'cluster' variable will also be used but it's not necessary to create it in *.env.local*, you can use it directly where you must use because it's not sensible data at all.

Modules we must install I don't know why at all:
- npm i incoming (6:22:10)

For components loading:
- npm install react-loading-skeleton

For Headless UI:
- npm i @headlessui/react

### NEXTAUTH_URL && NEXTAUTH_SECRET
If environment variable **NEXTAUTH_URL** is missing, you must set it in your *.env* or *.env.local* file. Note: On Vercel deployments, the VERCEL_URL environment variable will be read, so you won't need to define NEXTAUTH_URL.
Here's NEXTAUTH_URL types, if necessary:

For **development** (looks like):
- NEXTAUTH_URL=http://localhost:3000/

For **production** (looks like):
- NEXTAUTH_URL=http://myofficialwebsite.dev

For generate supersecret key, type in CMD:
- openssl genrsa 2048 *(not sure if it runs in Ubuntu)*
This will enable the **NEXTAUTH_SECRET** variable in the *env* file.
