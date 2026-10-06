@echo off
chcp 65001 >nul
echo ========================================================
echo   🧬 THE BIODISPATCH — AUTONOMOUS DISPATCH ENGINE
echo   Giám đốc Học thuật: TS. Hoàng Xuân Chiến
echo ========================================================
echo.
echo [1/3] Đang quét Radar & Khởi tạo bài viết y sinh song ngữ tiếp theo...
cd /d "%~dp0"
"c:\Hoang's projects\nodejs\node.exe" scripts/generate-daily-dispatch.mjs
if %ERRORLEVEL% NEQ 0 (
  echo ❌ Lỗi khi sinh bài mới!
  pause
  exit /b %ERRORLEVEL%
)

echo.
echo [2/3] Đang nén và tạo Thumbnail/Cover chuẩn WebP...
"c:\Hoang's projects\nodejs\node.exe" scripts/make-thumbs.mjs

echo.
echo [3/3] Đang commit, push Git và Deploy Production lên Vercel...
"c:\Hoang's projects\nodejs\node.exe" publish.cjs "content(auto-dispatch): publish scheduled bilingual dispatch"

echo.
echo ========================================================
echo   ✅ HOÀN TẤT XUẤT BẢN THÀNH CÔNG!
echo   Xem trực tiếp tại: https://the-biodispatch.vercel.app
echo ========================================================
pause
