# Vercel Deployment Guide - Full Stack (Client + Server)

This guide explains how to deploy your entire MERN application (client + server) to a single Vercel project.

## Project Structure for Vercel

```
MERN-Assignment/
├── client/                 # React frontend (Vite)
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── api/                    # Express server (as Vercel serverless functions)
│   └── index.js
├── server/                 # Keep for local development
│   └── model/
│       └── Users.model.js
├── vercel.json            # Vercel configuration
├── package.json           # Root package.json
└── .env                   # Environment variables (DO NOT COMMIT)
```

## Prerequisites

1. **GitHub Account** - Project must be on GitHub
2. **Vercel Account** - Free at [vercel.com](https://vercel.com)
3. **MongoDB Atlas** - Free database at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
4. **MongoDB Connection String** - From MongoDB Atlas

## Step 1: Add MONGO_URI to MongoDB Atlas Whitelist

1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com)
2. Click "Network Access" (left sidebar)
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (for Vercel)
5. Click "Confirm"

## Step 2: Deploy to Vercel

### Option 1: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Select your GitHub repository
4. **Configure Project:**
   - **Root Directory**: Leave empty (or select root)
   - **Framework Preset**: Other
   - **Build Command**: `cd client && npm install && npm run build`
   - **Output Directory**: `client/dist`
   - **Install Command**: Leave empty

5. Click **"Deploy"**

### Option 2: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

## Step 3: Add Environment Variables in Vercel

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project name
3. Go to **Settings → Environment Variables**
4. Add the following variables:

| Variable Name | Value | Environments |
|---|---|---|
| `MONGO_URI` | `mongodb+srv://your-username:your-password@cluster.mongodb.net/CRUD?appName=Cluster0` | All |
| `VITE_API_URL` | `https://your-vercel-domain.vercel.app/api` | Production, Preview |

5. Click **"Save"**

### For Production:
```
VITE_API_URL=https://your-vercel-domain.vercel.app/api
```

### For Preview/Development:
```
VITE_API_URL=http://localhost:3000
```

## Step 4: Test Locally Before Deploying

```bash
# Terminal 1: Start the server
cd server
npm install
npm run dev

# Terminal 2: Start the client
cd client
npm install
npm run dev
```

Visit `http://localhost:5173` (Vite default port)

## Step 5: Push Changes and Deploy

```bash
# Make sure you've created the api/index.js file
git add .
git commit -m "Setup for Vercel deployment"
git push origin main
```

Vercel will automatically deploy when you push!

## API Routes on Vercel

Your API endpoints are now accessible at:
- Production: `https://your-vercel-domain.vercel.app/api/getUsers`
- Production: `https://your-vercel-domain.vercel.app/api/createUser`
- Production: `https://your-vercel-domain.vercel.app/api/updateUser/:id`
- Production: `https://your-vercel-domain.vercel.app/api/deleteUser/:id`

The client automatically uses these routes via the `VITE_API_URL` environment variable.

## Troubleshooting

### "MONGO_URI not found"
- Add `MONGO_URI` to Vercel Environment Variables
- Make sure MongoDB Atlas allows Vercel IPs (Network Access → Allow from Anywhere)

### CORS Errors
- Update `cors()` in `api/index.js` to allow Vercel domain:
  ```javascript
  app.use(cors({
    origin: [
      'http://localhost:5173',
      'https://your-vercel-domain.vercel.app'
    ]
  }));
  ```

### Icons Not Showing
- CSP headers already configured in `client/index.html`
- Check browser console for CSP errors

### "Cannot find module" errors
- Ensure all dependencies are in `client/package.json` and `server/package.json`
- Run `npm install` in both directories

### API calls returning 404
- Verify `VITE_API_URL` environment variable is set correctly
- Check Vercel build logs for errors
- Ensure `api/index.js` exists

## Redeploying

After making changes:

```bash
git add .
git commit -m "Your message"
git push origin main
```

Vercel will automatically redeploy!

## Useful Commands

```bash
# View Vercel logs
vercel logs [function-name]

# Redeploy specific version
vercel --prod

# View environment variables
vercel env pull
```

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy to Vercel
3. ✅ Add environment variables
4. ✅ Test all features (Create, Read, Update, Delete)
5. ✅ Monitor Vercel logs if issues occur

## Deployment Checklist

- [ ] GitHub repository created and pushed
- [ ] Vercel project created and connected to GitHub
- [ ] `MONGO_URI` environment variable added
- [ ] `VITE_API_URL` environment variable added (production value)
- [ ] MongoDB Atlas whitelist allows Vercel
- [ ] Build successful (check Vercel dashboard)
- [ ] Test create/read/update/delete operations
- [ ] Check browser console for errors
- [ ] Monitor Vercel dashboard for issues

## Support

- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Express Docs: https://expressjs.com
- React/Vite Docs: https://vitejs.dev

Good luck! 🚀
