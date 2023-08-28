# iMessy

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

For generate supersecret key, type in CMD:
- openssl genrsa 2048 *(not sure if does it run in Ubuntu)*
This will enable the **NEXTAUTH_SECRET** variable in the *env* file.
