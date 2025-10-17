# Generate Beautiful Splash Screen - Step by Step

## Your App Theme Colors
- **Primary Blue**: `#3D5CFF`
- **Orange/Gold**: `#FFB800`  
- **Red Accent**: `#FF6B6B`
- **White Background**: `#FFFFFF`

---

## Option 1: Use Online Generator (Easiest) ⭐ RECOMMENDED

### Step 1: Create Your Logo
1. **Go to Canva** (free): https://www.canva.com
2. Create custom size: **1200 x 1200 pixels**
3. Design your burger logo:
   - Use a burger icon or letter "B"
   - Primary color: `#3D5CFF` (blue)
   - Accent color: `#FFB800` (orange/gold)
   - Keep it simple and clean
4. **Download as PNG** with transparent background

### Step 2: Generate Splash Assets
1. **Visit**: https://zoontek.gumroad.com/l/bootsplash-generator
2. **Upload** your logo (1200x1200 PNG)
3. **Settings**:
   - Background color: `#FFFFFF` (white)
   - Logo width: `200px` (or adjust to preference)
4. **Download** the generated zip file
5. **Extract** and follow the instructions in the zip

---

## Option 2: Use CLI Tool (Advanced)

### Step 1: Install CLI
```bash
npm install -g react-native-bootsplash
```

### Step 2: Prepare Your Logo
- Save your logo as: `assets/logo.png`
- Size: 1200x1200 pixels
- Format: PNG with transparent background

### Step 3: Generate Assets
```bash
npx react-native-generate-bootsplash assets/logo.png \
  --background-color=FFFFFF \
  --logo-width=200 \
  --assets-path=assets \
  --flavor=main
```

### Step 4: Rebuild Your App
```bash
# For Android
cd android
./gradlew clean
cd ..
npx react-native run-android

# For iOS
cd ios
pod install
cd ..
npx react-native run-ios
```

---

## Quick Logo Design Ideas

### Design 1: Minimalist Burger Icon
```
- Circular blue background (#3D5CFF)
- Stylized burger layers in center
- Orange/gold for bun (#FFB800)
- Simple, clean lines
```

### Design 2: Letter Badge
```
- Large letter "B" in blue (#3D5CFF)
- Small burger icon integrated
- White or transparent background
- Modern typography
```

### Design 3: Flat Icon
```
- Flat burger illustration
- Blue and orange color scheme
- No shadows, clean design
- Centered composition
```

---

## Logo Resources (Free)

### Create Logo Online:
1. **Canva**: https://www.canva.com (easiest)
2. **Figma**: https://www.figma.com (professional)
3. **Photopea**: https://www.photopea.com (Photoshop alternative)

### Find Icons:
1. **Flaticon**: https://www.flaticon.com (search "burger")
2. **Icons8**: https://icons8.com
3. **Noun Project**: https://thenounproject.com

### Convert SVG to PNG:
- **CloudConvert**: https://cloudconvert.com/svg-to-png
- Set size to 1200x1200 pixels

---

## I've Created SVG Templates For You!

Check these files in your `assets` folder:
- `logo-design.svg` - Detailed burger design
- `logo-simple.svg` - Minimalist design

### To Use These:
1. Open the SVG file in a browser
2. Take a screenshot or use an SVG to PNG converter
3. Resize to 1200x1200 pixels
4. Use in the splash generator

---

## Testing Your Splash Screen

### Android:
```bash
npx react-native run-android
```

### iOS:
```bash
npx react-native run-ios
```

The splash screen will show when you launch the app!

---

## Troubleshooting

### Splash not showing?
1. Clean build folders
2. Rebuild the app completely
3. Check if bootsplash assets were generated correctly

### Wrong colors?
- Make sure you used hex color without `#` in the generator
- Example: Use `FFFFFF` not `#FFFFFF`

### Logo too small/large?
- Adjust `--logo-width` parameter (try 150, 200, or 250)
- Regenerate the assets

---

## Need Help?

The old custom splash screen has been removed. The app now uses the native bootsplash implementation which is faster and more professional.

Your app will show:
1. **Native splash screen** (bootsplash) - when app launches
2. **Directly to Menu** - no custom splash screen component

This provides a better user experience! 🎉
