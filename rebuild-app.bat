@echo off
echo.
echo 🍔 Burger Shop - Clean and Rebuild
echo ===================================
echo.

echo Step 1: Cleaning Android build...
cd android
call gradlew clean
cd ..

echo.
echo Step 2: Clearing Metro cache...
call npm start -- --reset-cache &

timeout /t 3 /nobreak > nul

echo.
echo Step 3: Building and installing app...
call npm run android

echo.
echo Done!
pause
