#!/bin/bash

# Burger Shop - Splash Screen Generator Script
# This script helps you generate splash screen assets

echo "🍔 Burger Shop - Splash Screen Generator"
echo "========================================"
echo ""

# Check if logo file exists
if [ ! -f "assets/logo.png" ]; then
    echo "❌ Error: assets/logo.png not found!"
    echo ""
    echo "Please create your logo first:"
    echo "1. Design a 1200x1200px PNG logo"
    echo "2. Save it as: assets/logo.png"
    echo "3. Run this script again"
    echo ""
    echo "📖 See GENERATE_SPLASH.md for detailed instructions"
    exit 1
fi

echo "✅ Logo found: assets/logo.png"
echo ""

# Check if react-native-bootsplash is installed
if ! command -v react-native-generate-bootsplash &> /dev/null; then
    echo "📦 Installing react-native-bootsplash CLI..."
    npm install -g react-native-bootsplash
    echo ""
fi

# Generate splash screen
echo "🎨 Generating splash screen assets..."
echo ""
echo "Configuration:"
echo "  - Logo: assets/logo.png"
echo "  - Background: #FFFFFF (white)"
echo "  - Logo width: 200px"
echo ""

npx react-native-generate-bootsplash assets/logo.png \
  --background-color=FFFFFF \
  --logo-width=200 \
  --assets-path=assets \
  --flavor=main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Splash screen generated successfully!"
    echo ""
    echo "📱 Next steps:"
    echo "1. Clean build folders:"
    echo "   cd android && ./gradlew clean && cd .."
    echo ""
    echo "2. Rebuild your app:"
    echo "   npx react-native run-android"
    echo "   npx react-native run-ios"
    echo ""
    echo "🎉 Your new splash screen is ready!"
else
    echo ""
    echo "❌ Error generating splash screen"
    echo "Please check the error messages above"
    exit 1
fi
