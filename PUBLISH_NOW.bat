@echo off
chcp 65001 >nul
echo ========================================================
echo   🚀 THE BIODISPATCH - AUTOMATED PUBLISHER (DR. HOANG)
echo ========================================================
cd /d "%~dp0"
"c:\Hoang's projects\nodejs\node.exe" publish.cjs %*
pause
