# Start script for Chit Assignment Platform
Write-Host "Starting Chit Assignment Platform..." -ForegroundColor Cyan

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
}

# Start WebSocket server in background
Write-Host "`nStarting WebSocket server on port 8080..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npm run server"

# Wait a bit for server to start
Start-Sleep -Seconds 3

# Start Next.js dev server
Write-Host "Starting Next.js development server on port 3000..." -ForegroundColor Green
Write-Host "`nOpen http://localhost:3000 in your browser`n" -ForegroundColor Cyan
npm run dev
