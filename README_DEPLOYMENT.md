# 🚀 Deploy This Game Online - Quick Guide

## What You Need
- GitHub account (free)
- Vercel account (free)
- Railway account (free)
- 15-20 minutes

## Three Simple Steps

### 1️⃣ Upload to GitHub
```powershell
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

### 2️⃣ Deploy Backend to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. After deployment, go to Settings → Networking → "Generate Domain"
6. **Copy your Railway URL** (e.g., `my-app.up.railway.app`)

### 3️⃣ Deploy Frontend to Vercel
1. Go to [Vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your repository
5. **Add Environment Variable:**
   - Name: `NEXT_PUBLIC_WS_URL`
   - Value: `wss://YOUR-RAILWAY-URL` (from step 2)
6. Click "Deploy"

## 🎉 Done!

Your game is now live at: `https://your-project.vercel.app`

## Need Help?

📖 **Full detailed guide:** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)  
✅ **Step-by-step checklist:** See [QUICK_START_CHECKLIST.md](QUICK_START_CHECKLIST.md)

## Quick Troubleshooting

**WebSocket connection failed?**
- Make sure your Vercel environment variable uses `wss://` (not `ws://`)
- Check that Railway server is running

**Can't push to GitHub?**
- Use a Personal Access Token instead of your password
- Create one at: https://github.com/settings/tokens

---

**Questions?** Check the browser console (F12) for error messages.
