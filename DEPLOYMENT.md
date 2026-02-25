# Dakoti Bakers - Deployment Guide

This guide details the steps to take your artisan confectionery website live!

## 1. Production Database (MongoDB Atlas)
1. Sign in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (the free shared tier is fine).
3. Under **Network Access**, add `0.0.0.0/0` (standard for cloud hosting like Railway).
4. Under **Database Access**, create a user with `Read and Write to any database`.
5. Get your connection string (format: `mongodb+srv://<user>:<password>@cluster0.abcde.mongodb.net/dakoti_bakers?retryWrites=true&w=majority`).

## 2. Backend Deployment (Railway/Render)
We recommend **Railway** for its simplicity.
1. Create a new project on Railway and select **Deploy from GitHub repo** or use **Deploy from CLI**.
2. Add the following Environment Variables in the Railway dashboard:
   - `PORT`: `5000` (Railway will assign this automatically, but good to have).
   - `MONGODB_URI`: *Your Atlas Connection String*.
   - `JWT_SECRET`: *A long random string*.
   - `FRONTEND_URL`: *Your final Vercel URL* (e.g. `https://dakoti-bakers.vercel.app`).
3. Deploy the `server` directory.

## 3. Frontend Deployment (Vercel)
1. Install Vercel CLI: `npm i -g vercel`.
2. In the project root, run `vercel`.
3. Follow the prompts to link the project.
4. Add the following Environment Variable in the Vercel dashboard:
   - `VITE_API_URL`: *Your Railway backend URL* (e.g. `https://dakoti-bakers-production.up.railway.app/api`).
5. Run `vercel --prod` to deploy to production.

## 4. Final Verification
1. Access your Vercel URL.
2. Visit `/admin` and log in with the default credentials:
   - **Username**: `admin`
   - **Password**: `dakoti2002`
3. Update your admin password immediately in the database or via a manual script for security.

Congratulations! Your bakery is now open for business online! 🍰🚀
