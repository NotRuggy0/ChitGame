# Quick Start Guide

## Installation & Setup

### Option 1: Using the Start Script (Recommended)

**Windows:**
```powershell
.\start.ps1
```

**Linux/Mac:**
```bash
chmod +x start.sh
./start.sh
```

### Option 2: Manual Start

1. **Install dependencies:**
```bash
npm install
```

2. **Start the WebSocket server** (Terminal 1):
```bash
npm run server
```

3. **Start the Next.js app** (Terminal 2):
```bash
npm run dev
```

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## Testing the Full Game Flow

### 1. Create a Game (Host)
- Open http://localhost:3000
- Click "Create New Game"
- Set max players (e.g., 3)
- Note the 6-character game code
- Add roles (chits):
  - Example: "Mafia" with description "Eliminate townspeople"
  - Example: "Detective" with description "Find the mafia"
  - Example: "Civilian" with description "Survive the game"

### 2. Join as Players (Open in New Tabs/Windows)
- Open http://localhost:3000 in 2 more browser tabs
- Click "Join Game"
- Enter the game code
- Enter different display names (e.g., "Alice", "Bob")
- Click "Ready Up" for each player

### 3. Start the Game (Host)
- In the host window, wait for all players to be ready
- Verify role count matches player count (3 = 3)
- Click "Start Game"

### 4. View Assigned Roles
- Each browser window will show a different, randomly assigned role
- No player can see other players' roles
- Roles are assigned server-side for security

## Features to Test

### Host Features
✓ Create game with custom player count  
✓ Add/edit/remove roles  
✓ See all players in real-time  
✓ Start game when conditions are met  
✓ Cannot start if roles ≠ players  
✓ Cannot start if not all players ready  

### Player Features
✓ Join with game code  
✓ See other players join in real-time  
✓ Toggle ready status  
✓ View roles (read-only)  
✓ Receive private role assignment  

### System Features
✓ Real-time synchronization via WebSocket  
✓ Auto-reconnect on disconnect  
✓ Host reassignment if host leaves  
✓ Game cleanup when empty  
✓ Error messages for invalid actions  

## Architecture Overview

```
┌─────────────────┐         WebSocket          ┌─────────────────┐
│   Next.js App   │ ◄─────────────────────────► │   WS Server     │
│   (Frontend)    │      (Port 3000/8080)       │   (Backend)     │
└─────────────────┘                             └─────────────────┘
        │                                               │
        │                                               │
    React State                                  Game Sessions
    + Framer Motion                              + Secure Logic
```

## Tech Highlights

- **Next.js 14** - App Router with React Server Components
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling with custom luxury theme
- **Framer Motion** - Smooth animations and transitions
- **WebSocket** - Real-time bidirectional communication
- **Secure RNG** - Server-side role shuffling

## Common Issues

### WebSocket Connection Failed
- Ensure the WebSocket server is running on port 8080
- Check `.env.local` has `NEXT_PUBLIC_WS_URL=ws://localhost:8080`

### Port Already in Use
```bash
# Kill process on port 8080 (Windows)
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Styles Not Loading
```bash
npm run dev
# If issues persist, delete .next folder and restart
```

## Production Deployment

1. **Build the Next.js app:**
```bash
npm run build
npm start
```

2. **Deploy WebSocket server separately:**
- Use PM2, Forever, or similar process manager
- Expose port 8080 (or custom port)
- Update `NEXT_PUBLIC_WS_URL` environment variable

3. **Recommended Hosting:**
- Frontend: Vercel, Netlify
- WebSocket: Railway, Render, DigitalOcean

## Next Steps

- Customize the luxury color palette in `tailwind.config.js`
- Add persistence with a database (optional)
- Add game timer functionality
- Implement chat between players
- Add role reveal animation sequences

Enjoy your premium chit assignment platform! 🎮✨
