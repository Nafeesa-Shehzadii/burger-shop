@echo off
REM Burger Shop - Splash Screen Generator Script (Windows)

echo.
echo 🍔 Burger Shop - Splash Screen Generator
echo ========================================
echo.

REM Check if logo file exists
if not exist "assets\logo.png" (
    echo ❌ Error: assets\logo.png not found!
    echo.
    echo Please create your logo first:
    echo 1. Design a 1200x1200px PNG logo
    echo 2. Save it as: assets\logo.png
    echo 3. Run this script again
    echo.
    echo 📖 See GENERATE_SPLASH.md for detailed instructions
    pause
    exit /b 1
)

echo ✅ Logo found: assets\logo.png
echo.

REM Generate splash screen
echo 🎨 Generating splash screen assets...
echo.
echo Configuration:
echo   - Logo: assets\logo.png
echo   - Background: #FFFFFF (white)
echo   - Logo width: 200px
echo.

npx react-native-generate-bootsplash assets/logo.png --background-color=FFFFFF --logo-width=200 --assets-path=assets --flavor=main

if %errorlevel% equ 0 (
    echo.
    echo ✅ Splash screen generated successfully!
    echo.
    echo 📱 Next steps:
    echo 1. Clean build folders:
    echo    cd android ^&^& gradlew clean ^&^& cd ..
    echo.
    echo 2. Rebuild your app:
    echo    npx react-native run-android
    echo.
    echo 🎉 Your new splash screen is ready!
) else (
    echo.
    echo ❌ Error generating splash screen
    echo Please check the error messages above
)

echo.
pause
