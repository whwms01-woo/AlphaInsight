@echo off
title Alpha Insight - Real-Time Server Launcher
color 0b
clear

echo ===================================================
echo   ALPHA INSIGHT: REAL-TIME SERVER LAUNCHER
echo ===================================================
echo.
echo [*] Checking Python installation...
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [E] Python is not installed or not added to your system PATH!
    echo     Please install Python from https://www.python.org/
    echo     and ensure to check "Add Python to PATH" during installation.
    echo.
    pause
    exit /b
)

echo [*] Python detected successfully.
echo [*] Installing/Verifying required libraries (fastapi, uvicorn, yfinance, pandas)...
echo     (This may take a moment on the first run)
echo.
pip install fastapi uvicorn yfinance pandas

if %errorlevel% neq 0 (
    echo.
    echo [W] Some dependencies failed to install. 
    echo     Please run: 'pip install fastapi uvicorn yfinance pandas' manually.
    echo.
)

echo.
echo [*] Starting Alpha Insight real-time stock API server...
echo [*] Server will be available at http://localhost:8000
echo.
python server.py

echo.
echo [!] Server stopped.
pause
