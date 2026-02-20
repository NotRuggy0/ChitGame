# ✅ Quick Deployment Checklist

Use this checklist to track your progress as you deploy your game!

## Before You Start
- [ ] I have a GitHub account
- [ ] I have Git installed on my computer
- [ ] I have my project folder ready
- [ ] I have read the DEPLOYMENT_GUIDE.md

---

## Part 1: GitHub Upload ⬆️

### Step 1: Git Setup
- [ ] Opened PowerShell in my project folder
- [ ] Ran `git --version` to verify Git is installed

### Step 2: Create GitHub Repository
- [ ] Logged into GitHub.com
- [ ] Created new repository named: `____________________`
- [ ] Set repository to Public
- [ ] Did NOT add README (my project already has one)
- [ ] Copied repository URL: `____________________`

### Step 3: Upload Code
- [ ] Ran `git init`
- [ ] Ran `git add .`
- [ ] Ran `git commit -m "Initial commit - Chit Assignment Platform"`
- [ ] Ran `git remote add origin [MY-REPO-URL]`
- [ ] Ran `git branch -M main`
- [ ] Created GitHub Personal Access Token (if needed)
- [ ] Ran `git push -u origin main`
- [ ] Verified files appear on GitHub

**✅ GitHub Upload Complete!**

---

## Part 2: Railway Backend Deployment 🚂

### Step 1: Railway Account
- [ ] Signed up at Railway.app
- [ ] Connected with GitHub account

### Step 2: Deploy Server
- [ ] Clicked "New Project"
- [ ] Selected "Deploy from GitHub repo"
- [ ] Chose my repository: `____________________`
- [ ] Clicked "Deploy Now"
- [ ] Waited for build to complete (green checkmark ✓)

### Step 3: Get WebSocket URL
- [ ] Went to Settings tab
- [ ] Found "Networking" section
- [ ] Clicked "Generate Domain"
- [ ] Copied my Railway URL: `____________________`
- [ ] Added `wss://` prefix: `wss://____________________`

**My WebSocket URL:** `wss://____________________`

**✅ Railway Backend Complete!**

---

## Part 3: Vercel Frontend Deployment 🚀

### Step 1: Vercel Account
- [ ] Signed up at Vercel.com
- [ ] Connected with GitHub account

### Step 2: Import Project
- [ ] Clicked "Add New..." → "Project"
- [ ] Found my repository
- [ ] Clicked "Import"

### Step 3: Environment Variables (IMPORTANT!)
- [ ] Expanded "Environment Variables" section
- [ ] Added variable:
  - Name: `NEXT_PUBLIC_WS_URL`
  - Value: `wss://____________________` (my Railway URL)
- [ ] Double-checked it starts with `wss://`
- [ ] Clicked "Deploy"

### Step 4: Deployment Success
- [ ] Waited for build to complete (1-2 minutes)
- [ ] Saw "Congratulations!" message 🎉
- [ ] Clicked "Visit" button
- [ ] Copied my game URL: `____________________`

**My Game URL:** `https://____________________`

**✅ Vercel Frontend Complete!**

---

## Part 4: Testing 🎮

### Test 1: Create Game
- [ ] Opened my game URL
- [ ] Clicked "Create New Game"
- [ ] Set max players to 3
- [ ] Got game code: `______`
- [ ] Added 3 roles (Detective, Mafia, Civilian)

### Test 2: Join as Player
- [ ] Opened game URL in new tab/phone
- [ ] Clicked "Join Game"
- [ ] Entered game code
- [ ] Entered player name
- [ ] Clicked "Ready Up"

### Test 3: Start Game
- [ ] Returned to host window
- [ ] Verified all players ready
- [ ] Clicked "Start Game"
- [ ] Each player received a role ✅

**✅ Game Works! Time to celebrate! 🎉**

---

## Troubleshooting Checklist

### If WebSocket Connection Fails:
- [ ] Checked Vercel environment variable is correct
- [ ] Verified it starts with `wss://` not `ws://`
- [ ] Checked Railway server is running (green status)
- [ ] Redeployed Vercel after fixing env var

### If Railway Build Fails:
- [ ] Checked Railway logs for errors
- [ ] Verified start command is `npm run server`
- [ ] Checked that package.json has "server" script

### If Can't Push to GitHub:
- [ ] Created Personal Access Token
- [ ] Used token as password (not regular password)
- [ ] Checked repository is public

---

## Sharing Your Game 🌍

**My Game Link:** `https://____________________`

Share this with:
- [ ] Friends
- [ ] Family
- [ ] Gaming groups
- [ ] Social media

**Tips for players:**
- Works on phones, tablets, and computers
- Need stable internet connection
- Free to play, no downloads needed

---

## Making Updates Later 🔄

When I want to change my game:

```powershell
# Make code changes, then:
git add .
git commit -m "Description of what I changed"
git push
```

- [ ] Both Vercel and Railway auto-redeploy! ✨

---

## Important URLs to Save 📝

| Service | URL | Notes |
|---------|-----|-------|
| **My Game (Vercel)** | https://____________ | Share this with players |
| **WebSocket (Railway)** | wss://____________ | For env variable |
| **GitHub Repo** | https://github.com/____________ | My source code |
| **Vercel Dashboard** | https://vercel.com/dashboard | Manage deployments |
| **Railway Dashboard** | https://railway.app/dashboard | Monitor server |

---

## Success! 🎉

- [ ] My game is LIVE and working!
- [ ] I tested it with multiple players
- [ ] I shared the link with friends
- [ ] I bookmarked my Vercel and Railway dashboards
- [ ] I saved my game URL somewhere safe

**Congratulations! You're now a game developer with a live online game!** 🚀

---

## Next Steps (Optional)

Want to customize your game?
- [ ] Change colors in `tailwind.config.js`
- [ ] Modify game rules
- [ ] Add new features
- [ ] Create different game modes

Remember: After any changes, just `git push` and it auto-deploys! ✨
