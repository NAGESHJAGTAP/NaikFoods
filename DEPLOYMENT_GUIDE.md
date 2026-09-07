# Naik Foods Backend Deployment Guide

This guide provides step-by-step instructions to deploy the Naik Foods Node.js Express backend directly from your GitHub repository:
https://github.com/NAGESHJAGTAP/NaikFoods

---

## Option 1: Deploy on Render (Recommended - 100% Free & Simplest)

Render is the standard cloud platform for Node.js Express backends, providing free automatic SSL (HTTPS) and continuous deployment on every Git push.

### Step-by-Step Instructions:

1. **Create an Account on Render**:
   - Go to [https://render.com](https://render.com) and click **Sign Up** (or log in with your GitHub account).

2. **Connect GitHub Repository**:
   - In the Render Dashboard, click the **New +** button in the top right.
   - Select **Web Service**.
   - Under "Connect a repository", select or search for `NAGESHJAGTAP/NaikFoods`.

3. **Configure the Web Service Settings**:
   - **Name**: `naikfoods-backend` (or any name you prefer)
   - **Region**: Singapore (Southeast Asia) or Frankfurt (choose nearest to India)
   - **Branch**: `main`
   - **Root Directory**: Leave blank (runs from project root)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server/server.js`
   - **Instance Type**: `Free` ($0/month)

4. **Environment Variables (Optional)**:
   Under Advanced -> Environment Variables, you can add:
   - `PORT`: `5000`
   - `JWT_SECRET`: `swadyatra_admin_secret_2026`
   - `USER_JWT_SECRET`: `swadyatra_user_secret_2026`

5. **Deploy**:
   - Click **Create Web Service**.
   - Render will clone the repository, run `npm install`, and start `node server/server.js`.
   - Once deployment completes, Render will provide a live URL such as:
     `https://naikfoods-backend.onrender.com`

6. **Verify Deployment**:
   - Open `https://your-service-name.onrender.com/` in your browser.
   - You will see:
     ```json
     {
       "status": "online",
       "service": "Naik Foods Backend API",
       "version": "1.0.0",
       "endpoints": {
         "products": "/api/products",
         "categories": "/api/categories",
         "recipes": "/api/recipes",
         "orders": "/api/orders",
         "health": "/api/health"
       }
     }
     ```

---

## Option 2: Deploy on Railway (railway.app)

1. Open [https://railway.app](https://railway.app) and sign in with GitHub.
2. Click **New Project** -> **Deploy from GitHub repo**.
3. Select `NAGESHJAGTAP/NaikFoods`.
4. Railway will automatically detect Node.js and run `npm start` (`node server/server.js`).
5. Under service settings, click **Generate Domain** to get your public HTTPS URL.

---

## Connecting Frontend to the Live Backend

Once your backend is deployed and you have your live URL (for example: `https://naikfoods-backend.onrender.com`):

In your frontend application (`frontend/src/services/api.js` or environment configuration):
```javascript
// Change local API URL:
// const API_BASE_URL = 'http://localhost:5000/api';

// To your deployed live backend URL:
const API_BASE_URL = 'https://naikfoods-backend.onrender.com/api';
```
This allows the frontend (whether running locally or on Vercel) to communicate with the live cloud backend.
