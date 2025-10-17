# 🍔 Burger Shop - Beautiful Splash Screen Setup

## ✅ What's Been Done

1. **Removed old custom splash screen** - The manual "Get Started" screen is gone
2. **Updated navigation** - App now starts directly at the menu
3. **Created logo templates** - SVG designs ready for you to use
4. **Prepared scripts** - Easy commands to generate splash assets

---

## 🎨 Quick Start (3 Easy Steps)

### Step 1: Create Your Logo (Choose One Method)

#### Method A: Use Online Tool (Easiest) ⭐
1. Go to **Canva**: https://www.canva.com
2. Create **1200 x 1200 pixels** canvas
3. Design your burger logo using these colors:
   - Blue: `#3D5CFF`
   - Orange: `#FFB800`
   - Red: `#FF6B6B`
4. Download as **PNG with transparent background**
5. Save as: `assets/logo.png`

#### Method B: Use Provided SVG Templates
1. Open `assets/logo-design.svg` or `assets/logo-simple.svg` in browser
2. Convert to PNG (1200x1200px) using: https://cloudconvert.com/svg-to-png
3. Save as: `assets/logo.png`

#### Method C: Use Figma (Professional)
1. Create 1200x1200px frame
2. Design burger icon with theme colors
3. Export as PNG
4. Save as: `assets/logo.png`

### Step 2: Generate Splash Screen

#### Option A: Use Online Generator (Recommended)
1. Visit: https://zoontek.gumroad.com/l/bootsplash-generator
2. Upload your `logo.png`
3. Set background: `FFFFFF` (white)
4. Set logo width: `200`
5. Download and extract the generated files
6. Follow instructions in the downloaded package

#### Option B: Use Command Line
```bash
# Install the tool
npm install -g react-native-bootsplash

# Generate assets
npx react-native-generate-bootsplash assets/logo.png --background-color=FFFFFF --logo-width=200
```

#### Option C: Use Provided Script (Windows)
```bash
# Just double-click:
generate-splash.bat
```

### Step 3: Rebuild Your App
```bash
# Clean Android build
cd android
gradlew clean
cd ..

# Run the app
npx react-native run-android
```

---

## 🎨 Design Guidelines

### Logo Specifications:
- **Size**: 1200 x 1200 pixels (square)
- **Format**: PNG
- **Background**: Transparent
- **Style**: Simple, clean, modern

### Color Palette:
```
Primary Blue:   #3D5CFF  (Main brand color)
Orange/Gold:    #FFB800  (Accent, food warmth)
Red Accent:     #FF6B6B  (Energy, appetite)
White:          #FFFFFF  (Background)
Dark Gray:      #333333  (Text)
```

### Design Tips:
✅ Keep it simple - avoid too many details  
✅ Use 2-3 colors maximum  
✅ Center the design  
✅ Leave padding around edges  
✅ Test at different sizes  
✅ Make it recognizable at small sizes  

---

## 📁 Project Structure

### New Files Created:
```
burgershop/
├── assets/
│   ├── logo-design.svg          # Detailed burger logo template
│   ├── logo-simple.svg          # Minimalist logo template
│   └── logo.png                 # YOUR LOGO GOES HERE (create this)
├── GENERATE_SPLASH.md           # Detailed generation guide
├── SPLASH_MIGRATION.md          # What changed and why
├── README_SPLASH.md             # This file
├── generate-splash.bat          # Windows script
└── generate-splash.sh           # Mac/Linux script
```

### Files Removed:
```
❌ src/screens/splashscreen/SplashScreen.tsx
❌ src/screens/splashscreen/styles.ts
❌ Splash route from navigation
```

---

## 🚀 How It Works Now

### Old Flow (Removed):
```
App Icon → Native Splash → Custom Splash → "Get Started" Button → Menu
```

### New Flow (Better UX):
```
App Icon → Beautiful Native Splash (1 sec) → Menu
```

**Benefits:**
- ⚡ Faster app startup
- 🎨 Professional appearance
- 📱 Native platform integration
- 🔥 Better user experience

---

## 🎯 Logo Design Ideas

### Idea 1: Minimalist Burger
- Simple burger icon
- Blue background circle
- Orange/gold for bun
- Clean, flat design

### Idea 2: Letter Badge
- Large "B" letter
- Burger icon inside/beside
- Blue and orange colors
- Modern typography

### Idea 3: Stacked Layers
- Stylized burger layers
- Each layer different color
- Geometric, modern look
- Centered composition

---

## 🔧 Customization

### Change Splash Duration (App.tsx):
```typescript
// Current: 1 second
setTimeout(() => {
  BootSplash.hide({ fade: true });
}, 1000);

// Change to 2 seconds:
setTimeout(() => {
  BootSplash.hide({ fade: true });
}, 2000);
```

### Change Background Color:
When generating, use different color:
```bash
# White background (current)
--background-color=FFFFFF

# Blue background
--background-color=3D5CFF

# Orange background
--background-color=FFB800
```

### Change Logo Size:
```bash
# Smaller logo
--logo-width=150

# Current size
--logo-width=200

# Larger logo
--logo-width=250
```

---

## 🐛 Troubleshooting

### Splash not showing?
```bash
# Clean everything
cd android
gradlew clean
cd ..
rm -rf node_modules
npm install
npx react-native run-android
```

### Logo looks blurry?
- Make sure your logo is 1200x1200px
- Use PNG format, not JPG
- Don't scale up a small image

### Wrong colors?
- Regenerate with correct hex color (no # symbol)
- Example: Use `FFFFFF` not `#FFFFFF`

### Build errors?
```bash
# iOS
cd ios
pod install
cd ..

# Android
cd android
gradlew clean
cd ..
```

---

## 📚 Resources

### Design Tools (Free):
- **Canva**: https://www.canva.com
- **Figma**: https://www.figma.com
- **Photopea**: https://www.photopea.com

### Icon Resources:
- **Flaticon**: https://www.flaticon.com
- **Icons8**: https://icons8.com
- **Noun Project**: https://thenounproject.com

### Converters:
- **SVG to PNG**: https://cloudconvert.com/svg-to-png
- **Image Resize**: https://www.iloveimg.com/resize-image

### Bootsplash:
- **Generator**: https://zoontek.gumroad.com/l/bootsplash-generator
- **Documentation**: https://github.com/zoontek/react-native-bootsplash

---

## ✨ Next Steps

1. **Create your logo** (1200x1200px PNG)
2. **Save as** `assets/logo.png`
3. **Run** `generate-splash.bat` (Windows) or use online generator
4. **Rebuild** your app
5. **Test** and enjoy! 🎉

---

## 💡 Need Help?

Check these files for more details:
- `GENERATE_SPLASH.md` - Step-by-step generation guide
- `SPLASH_MIGRATION.md` - Technical details about changes
- `assets/logo-design.svg` - Example logo design
- `assets/logo-simple.svg` - Minimalist logo example

---

## 🎉 Summary

✅ Old splash screen removed  
✅ Native bootsplash ready to use  
✅ Logo templates provided  
✅ Scripts ready for generation  
✅ App starts directly at menu  
✅ Better performance and UX  

**You're all set! Just create your logo and generate the splash screen.** 🚀
