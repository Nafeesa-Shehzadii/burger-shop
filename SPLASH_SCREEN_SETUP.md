# Burger Shop - Splash Screen Setup Guide

## Theme Colors
- Primary Blue: `#3D5CFF`
- Orange/Yellow: `#FFB800`
- Red: `#FF6B6B`
- Background: `#FFFFFF`

## Step 1: Create Logo Design

### Design Specifications:
1. **Logo Size**: 1200x1200px (square)
2. **Format**: PNG with transparent background
3. **Design Elements**:
   - Burger icon or stylized "B" letter
   - Modern, minimalist design
   - Use theme colors (Primary Blue #3D5CFF with Orange #FFB800 accent)
   - Clean, professional look

### Design Tools (Choose one):
- Figma (recommended)
- Canva
- Adobe Illustrator
- Photoshop

### Logo Design Concept:
```
Option 1: Burger Icon
- Stylized burger with layers
- Primary color: #3D5CFF
- Accent color: #FFB800 (for cheese/bun)
- Simple, modern lines

Option 2: Letter "B" with Burger
- Large "B" letter in #3D5CFF
- Small burger icon integrated
- Clean typography

Option 3: Circular Badge
- Circle with burger icon inside
- Border in #3D5CFF
- Icon in #FFB800
```

## Step 2: Use Bootsplash Generator

### Online Tool:
Visit: https://zoontek.gumroad.com/l/bootsplash-generator

### Steps:
1. Upload your logo (1200x1200px PNG)
2. Select background color: `#FFFFFF` (white)
3. Choose logo size: Medium or Large
4. Download the generated files

### OR Use CLI Tool:

```bash
# Install the CLI tool globally
npm install -g react-native-bootsplash

# Generate splash screen assets
npx react-native-generate-bootsplash assets/logo.png \
  --background-color=FFFFFF \
  --logo-width=200 \
  --assets-path=assets \
  --flavor=main
```

## Step 3: Implementation

### Files to Replace:
1. `assets/bootsplash_logo_original.png` - Your new logo
2. Android drawable folders (auto-generated)
3. iOS storyboard (auto-generated)

### Manual Steps After Generation:

1. **Place your logo**:
   - Save as: `assets/logo.png` (1200x1200px)

2. **Run the generator** (if using CLI):
   ```bash
   npx react-native-generate-bootsplash assets/logo.png \
     --background-color=FFFFFF \
     --logo-width=200
   ```

3. **Clean and rebuild**:
   ```bash
   # Android
   cd android && ./gradlew clean && cd ..
   npx react-native run-android

   # iOS
   cd ios && pod install && cd ..
   npx react-native run-ios
   ```

## Step 4: Remove Old Splash Screen

The old custom splash screen component will be removed and replaced with the native bootsplash implementation.

## Color Palette Reference

```
Primary Blue:   #3D5CFF
Orange/Gold:    #FFB800
Red Accent:     #FF6B6B
Background:     #FFFFFF
Text Dark:      #333333
Text Light:     #999999
```

## Quick Logo Creation (If you need help):

### Using Canva (Free):
1. Go to Canva.com
2. Create custom size: 1200x1200px
3. Add burger icon from elements
4. Apply colors: #3D5CFF and #FFB800
5. Download as PNG (transparent background)

### Using Figma (Free):
1. Create 1200x1200px frame
2. Design burger icon or letter "B"
3. Use color palette above
4. Export as PNG

## Need a Quick Logo?

I can provide you with a simple SVG code that you can convert to PNG using any online SVG to PNG converter.
