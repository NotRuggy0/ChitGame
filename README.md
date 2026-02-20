# Chit Assignment Platform

A premium, real-time role assignment platform for games. Built with world-class design standards and smooth interactions.

## Features

### Core Functionality
- **Host Game Sessions**: Create games with unique 6-character join codes
- **Real-time Lobby**: Players join instantly and appear in real-time
- **Role Management**: Create, edit, and remove roles (chits) with names and descriptions
- **Secure Assignment**: Randomly assign roles privately to each player
- **Player Ready System**: All players must confirm readiness before game start
- **Host Reassignment**: Automatic host transfer if the original host leaves

### Premium Design
- **Modern Typography**: Clean, readable Inter font family
- **Luxury Color Palette**: Deep blacks, soft grays, and refined indigo accent
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Glass Morphism**: Backdrop blur effects and subtle transparency
- **Responsive Layout**: Mobile-first design that scales beautifully
- **Real-time Updates**: Instant synchronization across all players

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom luxury theme
- **Animations**: Framer Motion
- **Real-time**: WebSocket (ws library)
- **Backend**: Node.js WebSocket server

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies**
```bash
npm install
```

2. **Create environment file**
```bash
cp .env.local.example .env.local
```

3. **Start the WebSocket server** (in one terminal)
```bash
npm run server
```

4. **Start the Next.js development server** (in another terminal)
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Creating a Game

1. Click **"Create New Game"**
2. Set the maximum number of players (2-20)
3. Share the generated 6-character code with players
4. Add roles using the role manager
5. Wait for players to join and ready up
6. Click **"Start Game"** when ready

### Joining a Game

1. Click **"Join Game"**
2. Enter the game code
3. Enter your display name
4. Click **"Ready Up"** when you're ready
5. Wait for the host to start the game
6. Receive your private role assignment

### Role Management (Host Only)

- **Add Role**: Click "Add Role" and enter name and optional description
- **Edit Role**: Hover over a role and click the edit icon
- **Remove Role**: Hover over a role and click the delete icon
- **Note**: Role count must equal player count to start the game

## Game Flow

```
Home → Create/Join → Lobby → Game Started → Role Revealed
```

### Validation Rules

- Minimum 2 players required
- All players must be ready
- Chit count must equal player count
- Only the host can start the game

## Architecture

### WebSocket Messages

**Client to Server:**
- `create_game`: Create a new game session
- `join_game`: Join an existing game
- `toggle_ready`: Toggle player ready state
- `add_chit`: Add a new role
- `edit_chit`: Edit existing role
- `remove_chit`: Remove a role
- `start_game`: Begin the game and assign roles
- `leave_game`: Leave the current session

**Server to Client:**
- `game_created`: Game created successfully
- `joined_game`: Successfully joined game
- `session_update`: Broadcast session state changes
- `game_started`: Game started with role assignment
- `error`: Error message
- `host_changed`: New host assigned
- `player_left`: Player disconnected

### Security Features

- Roles are assigned server-side using secure randomization
- Each player only receives their own role
- No player (including host) can see other players' roles
- WebSocket connections are validated for each action

## Customization

### Colors
Edit `tailwind.config.js` to customize the luxury color palette:
```js
colors: {
  luxury: {
    black: '#0A0A0A',
    accent: '#6366F1',
    // ... more colors
  }
}
```

### Animations
Adjust animation timing in `tailwind.config.js`:
```js
animation: {
  'fade-in': 'fadeIn 0.4s ease-out',
}
```

## Production Deployment

### Environment Variables
Set `NEXT_PUBLIC_WS_URL` to your WebSocket server URL:
```
NEXT_PUBLIC_WS_URL=wss://your-ws-server.com
```

### Build
```bash
npm run build
npm start
```

### WebSocket Server
Deploy the WebSocket server separately:
```bash
npm run server
```

Consider using PM2 or similar for process management.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## License

MIT

## Credits

Built with precision and care for the best possible user experience.
