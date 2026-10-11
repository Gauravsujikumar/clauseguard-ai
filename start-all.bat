@echo off
echo ===================================================
echo Starting ClauseGuard AI (Backend + Frontend)
echo ===================================================

echo [1/2] Launching Backend Server on http://127.0.0.1:8000 ...
start "ClauseGuard AI - Backend (Port 8000)" cmd /k "cd /d %~dp0backend && .\venv\Scripts\python.exe -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Launching Frontend Server on http://localhost:5173 ...
start "ClauseGuard AI - Frontend (Port 5173)" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers are launching in separate windows!
echo - Frontend: http://localhost:5173
echo - Backend API Docs: http://127.0.0.1:8000/docs
echo ===================================================
pause
