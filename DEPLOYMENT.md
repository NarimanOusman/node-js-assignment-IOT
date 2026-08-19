# Vercel Deployment Guide

This guide will help you deploy your MERN application to Vercel.

## Prerequisites
- GitHub account with your project pushed
- Vercel account (free tier available)
- MongoDB Atlas account for the database

## Deployment Steps

### Step 1: Prepare MongoDB
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster or use an existing one
3. Copy your connection string (include username and password)
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database`

### Step 2: Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Click "Import"
5. In the build settings, Vercel should auto-detect it's a monorepo
   - **Root Directory**: Select root folder or leave empty
   - **Build Command**: Leave as suggested or use: `npm install && cd client && npm run build`
   - **Output Directory**: `client/dist`

#### Step 3: Set Environment Variables in Vercel Dashboard
1. Go to your project settings → Environment Variables
2. Add the following variables:
   ```
   MONGO_URI = mongodb+srv://username:password@cluster.mongodb.net/database
   VITE_API_URL = https://your-vercel-deployment.vercel.app/api
   ```
   (Replace with your actual Vercel domain)

3. Make sure variables are set for all environments (Production, Preview, Development)

#### Step 4: Deploy Server Separately
⚠️ **Important**: Vercel's serverless environment isn't ideal for long-running Express servers.

**Recommended alternatives for backend:**
- **Railway.app** (Recommended - easy integration)
- **Render.com** (Free tier available)
- **Heroku** (has some limitations on free tier)

**Alternative: Use Vercel with API Routes**
If you want to keep everything on Vercel:
1. Convert your Express routes to Vercel API routes
2. Move server code to `api/` folder
3. Update frontend `VITE_API_URL` to point to your Vercel domain

### Step 5: Update Client Configuration
The client now uses environment variables for API URLs:
- Local development: `http://localhost:3000`
- Production: Your deployed server URL

### Step 6: Test Your Deployment
1. Visit your Vercel deployment URL
2. Test create, read, update, delete operations
3. Check browser console for any CORS errors

## Environment Variables Reference

**Client (.env files)**
```
VITE_API_URL=http://localhost:3000  # Local development
VITE_API_URL=https://your-api.vercel.app  # Production
```

**Server (.env file)**
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/database
```

## Troubleshooting

### Icons not showing
- Ensure CSP headers allow Iconify: `https://code.iconify.design`
- Check browser console for CSP errors

### CORS errors
- Update your Express server to allow requests from your Vercel domain
- Add this to your server/index.js:
  ```javascript
  const allowedOrigins = [
    'http://localhost:5173', // Vite local
    'http://localhost:3000',
    'https://your-vercel-domain.vercel.app'
  ];
  app.use(cors({ origin: allowedOrigins }));
  ```

### MongoDB connection fails
- Verify connection string is correct
- Check MongoDB Atlas whitelist allows Vercel IP addresses
- Use `0.0.0.0/0` to allow all IPs (less secure)

## Recommended Deployment Architecture

```
Frontend (Client)          Backend (Server)
  ↓                           ↓
Vercel             Railway/Render/Heroku
(Static + CDN)     (Node.js Server)
  ↓                           ↓
  └─────────── API Calls ──────┘
```

## Next Steps
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy backend to Railway/Render
4. Update `VITE_API_URL` environment variable
5. Test all features work in production

## Need Help?
- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com
