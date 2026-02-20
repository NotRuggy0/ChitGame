# 🚀 Complete Deployment Guide for Beginners

## What You'll Need

Before starting, make sure you have:
- [ ] A GitHub account (free) - [Sign up here](https://github.com/signup)
- [ ] A Vercel account (free) - [Sign up here](https://vercel.com/signup)
- [ ] A Railway account (free) - [Sign up here](https://railway.app)
- [ ] Git installed on your computer - [Download here](https://git-scm.com/downloads)

---

## 📋 Overview: What We're Doing

Your game has **two parts**:
1. **Frontend** (the website users see) → Deploy to **Vercel**
2. **Backend** (WebSocket server for real-time communication) → Deploy to **Railway**

Think of it like this:
- Vercel = The game's interface (what players interact with)
- Railway = The game's brain (handles all the real-time game logic)

---

# PART 1: Upload Your Code to GitHub

## Step 1: Install Git (if not installed)

1. Download Git from: https://git-scm.com/downloads
2. Run the installer (keep all default settings)
3. Open **Command Prompt** or **PowerShell** and type:
   ```powershell
   git --version
   ```
   You should see something like `git version 2.43.0`

## Step 2: Create a GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the **"+"** button in the top-right corner
3. Click **"New repository"**
4. Fill in:
   - **Repository name**: `chit-assignment-game` (or any name you like)
   - **Description**: "Real-time role assignment game"
   - **Privacy**: Choose "Public" (required for free Vercel/Railway)
   - **DO NOT** check "Add a README file" (your project already has one)
5. Click **"Create repository"**

## Step 3: Upload Your Code to GitHub

1. **Open PowerShell** in your project folder (where your code is)
   - Navigate to your project folder in File Explorer
   - Type `powershell` in the address bar and press Enter

2. **Initialize Git** (run these commands one by one):

   ```powershell
   git init
   ```
   This creates a new Git repository in your folder.

3. **Add your files:**
   ```powershell
   git add .
   ```
   This stages all your files for commit.

4. **Commit your files:**
   ```powershell
   git commit -m "Initial commit - Chit Assignment Platform"
   ```
   This saves a snapshot of your code.

5. **Connect to GitHub:**
   
   Replace `YOUR-USERNAME` with your actual GitHub username and `chit-assignment-game` with your repository name:
   
   ```powershell
   git remote add origin https://github.com/YOUR-USERNAME/chit-assignment-game.git
   git branch -M main
   ```

6. **Push to GitHub:**
   ```powershell
   git push -u origin main
   ```
   
   **Important:** You'll be asked to sign in to GitHub:
   - Username: Your GitHub username
   - Password: Use a **Personal Access Token** (not your regular password)
   
   **How to create a Personal Access Token:**
   - Go to: https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name like "Deployment Token"
   - Check the box for "repo" (full control of private repositories)
   - Click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)
   - Paste it when PowerShell asks for a password

7. **Verify Upload:**
   - Go to your GitHub repository page: `https://github.com/YOUR-USERNAME/chit-assignment-game`
   - You should see all your files there!

---

# PART 2: Deploy the WebSocket Server (Backend) to Railway

## Step 1: Sign Up for Railway

1. Go to [Railway.app](https://railway.app)
2. Click **"Login"** in the top-right
3. Click **"Sign in with GitHub"**
4. Authorize Railway to access your GitHub account

## Step 2: Create a New Project on Railway

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. If asked, click **"Configure GitHub App"**
4. Select your repository: `chit-assignment-game`
5. Click **"Deploy Now"**

## Step 3: Configure the Railway Deployment

Railway will automatically detect your project, but we need to tell it to run the server:

1. Click on your deployed service (it should say "Building...")
2. Go to the **"Settings"** tab
3. Scroll down to **"Deploy"** section
4. Click **"Add Custom Start Command"**
5. Enter:
   ```
   npm run server
   ```
6. Click **"Deploy"**

## Step 4: Get Your WebSocket Server URL

1. Wait for deployment to finish (you'll see a green checkmark ✓)
2. Go to the **"Settings"** tab
3. Scroll to **"Networking"** section
4. Click **"Generate Domain"**
5. Railway will give you a URL like: `your-app-name.up.railway.app`
6. **COPY THIS URL** - you'll need it for the next part!

   **Important:** Your WebSocket URL will be:
   ```
   wss://your-app-name.up.railway.app
   ```
   (Notice the `wss://` at the beginning - this is secure WebSocket)

---

# PART 3: Deploy the Frontend to Vercel

## Step 1: Sign Up for Vercel

1. Go to [Vercel.com](https://vercel.com/signup)
2. Click **"Continue with GitHub"**
3. Authorize Vercel to access your GitHub account

## Step 2: Import Your Project

1. Click **"Add New..."** → **"Project"**
2. Find your repository: `chit-assignment-game`
3. Click **"Import"**

## Step 3: Configure Environment Variables

**This is the most important step!** This tells your frontend where to find the backend.

1. Before clicking "Deploy", expand **"Environment Variables"**
2. Add a new variable:
   - **Name:** `NEXT_PUBLIC_WS_URL`
   - **Value:** `wss://your-app-name.up.railway.app` (your Railway URL from Part 2, Step 4)
   
   ⚠️ **Make sure to use `wss://` (secure WebSocket), not `ws://`**

3. Keep all other settings as default
4. Click **"Deploy"**

## Step 4: Wait for Deployment

1. Vercel will build and deploy your app (takes 1-2 minutes)
2. You'll see a **"Congratulations!"** screen with confetti 🎉
3. Click **"Visit"** to see your live website!

Your game is now live at: `https://your-project-name.vercel.app`

---

# 🎮 Testing Your Deployed Game

## Step 1: Create a Game

1. Open your Vercel URL: `https://your-project-name.vercel.app`
2. Click **"Create New Game"**
3. Set max players to 3
4. You'll get a 6-character code (e.g., "ABC123")
5. Add some roles:
   - Role 1: "Detective" - "Find the mafia"
   - Role 2: "Mafia" - "Eliminate others"
   - Role 3: "Civilian" - "Survive"

## Step 2: Join as Other Players

1. Open the same URL on your phone or in a new browser (incognito mode)
2. Click **"Join Game"**
3. Enter the game code
4. Enter a different name
5. Click **"Ready Up"**

## Step 3: Start the Game

1. Go back to the host window
2. Once all players are ready, click **"Start Game"**
3. Each player will see their assigned role!

**🎉 Congratulations! Your game is now live and playable online!**

---

# 🔧 Troubleshooting

## Problem: "WebSocket connection failed"

**Solution:**
1. Go to your Vercel project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Verify `NEXT_PUBLIC_WS_URL` is set correctly
4. Make sure it starts with `wss://` (not `ws://`)
5. Make sure it matches your Railway domain
6. After fixing, redeploy:
   - Go to **"Deployments"** tab
   - Click the three dots on the latest deployment
   - Click **"Redeploy"**

## Problem: Railway deployment failed

**Solution:**
1. Go to Railway deployment logs
2. Check if there are errors
3. Make sure `npm run server` is set as the start command
4. Railway should auto-detect port 8080 (used in `server/index.ts`)

## Problem: Can't push to GitHub - Authentication failed

**Solution:**
1. Create a Personal Access Token (see Part 1, Step 3, substep 6)
2. Use the token instead of your password when pushing

## Problem: Players can't join my game

**Solution:**
1. Check browser console for errors (Press F12)
2. Verify Railway server is running (check Railway dashboard)
3. Test WebSocket connection by visiting: `wss://your-railway-url.up.railway.app`

---

# 📱 Sharing Your Game

Now that your game is online, share it with friends:

1. **Your Game URL:** `https://your-project-name.vercel.app`
2. Send this link to anyone
3. They can create or join games from anywhere in the world!

**Tips:**
- The game works on phones, tablets, and computers
- Players need a stable internet connection
- The game is free to host (Vercel and Railway have free tiers)

---

# 🔄 Making Updates Later

When you want to update your game:

1. Make changes to your code locally
2. Commit and push to GitHub:
   ```powershell
   git add .
   git commit -m "Description of changes"
   git push
   ```
3. **Both Vercel and Railway will automatically redeploy!** ✨

No need to manually redeploy - it's automatic!

---

# 💰 Cost Information

Both services offer generous free tiers:

**Vercel (Free Plan):**
- ✓ Unlimited deployments
- ✓ Automatic HTTPS
- ✓ Perfect for this project

**Railway (Free Plan):**
- ✓ $5 free credit per month
- ✓ Should be enough for moderate usage
- ✓ WebSocket support included

**Note:** If your game becomes very popular, you might need to upgrade to paid plans, but for personal use and small groups, free tiers are perfect!

---

# ✅ Quick Checklist

- [ ] Git installed
- [ ] Code uploaded to GitHub
- [ ] Railway account created
- [ ] Backend deployed to Railway
- [ ] Railway domain copied
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] Environment variable `NEXT_PUBLIC_WS_URL` set correctly
- [ ] Game tested with multiple players
- [ ] Game URL shared with friends!

---

# 🆘 Need More Help?

If you get stuck, check:
1. **Vercel Logs:** Vercel Dashboard → Your Project → Deployment → "View Logs"
2. **Railway Logs:** Railway Dashboard → Your Service → "View Logs"
3. **Browser Console:** Press F12 in your browser to see errors

**Common beginner mistakes:**
- Forgetting to set the environment variable
- Using `ws://` instead of `wss://`
- Not waiting for Railway deployment to finish before deploying to Vercel

---

**Good luck! 🚀 You're about to have your game running online!**
