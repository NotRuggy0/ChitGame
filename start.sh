#!/bin/bash
# Start script for Chit Assignment Platform

echo "Starting Chit Assignment Platform..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Start WebSocket server in background
echo "Starting WebSocket server on port 8080..."
npm run server &

# Wait a bit for server to start
sleep 3

# Start Next.js dev server
echo "Starting Next.js development server on port 3000..."
echo ""
echo "Open http://localhost:3000 in your browser"
echo ""
npm run dev
