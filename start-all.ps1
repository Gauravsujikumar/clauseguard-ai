Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "Starting ClauseGuard AI (Backend + Frontend)" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Cyan

$root = $PSScriptRoot

Write-Host "[1/2] Starting Backend Server on http://127.0.0.1:8000 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; & '.\venv\Scripts\python.exe' -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

Write-Host "[2/2] Starting Frontend Server on http://localhost:5173 ..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; npm run dev"

Write-Host ""
Write-Host "Both servers launched successfully!" -ForegroundColor Green
Write-Host "- Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "- Backend:  http://127.0.0.1:8000/docs" -ForegroundColor White
Write-Host "===================================================" -ForegroundColor Cyan
