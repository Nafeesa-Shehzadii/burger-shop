# Icon Migration - react-native-vector-icons

## Summary
All emojis in the app have been replaced with icons from `react-native-vector-icons`.

## Changes Made

### 1. Package Installation
- Installed `react-native-vector-icons@10.3.0`
- Installed `@types/react-native-vector-icons` for TypeScript support

### 2. Android Configuration
- Added `apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"` to `android/app/build.gradle`

### 3. Icon Libraries Used
- **Ionicons**: Used for most UI icons (home, search, cart, person, star, etc.)
- **MaterialCommunityIcons**: Used for food-related icons (hamburger, french-fries, pizza, noodles, etc.)

### 4. Components Updated

#### BottomNavigation (`src/components/bottomNavigation/index.tsx`)
- 🏠 → `<Icon name="home" />`
- 🔍 → `<Icon name="search" />`
- 🛒 → `<Icon name="cart" />`
- 👤 → `<Icon name="person" />`

#### DrawerNavigator (`src/navigation/DrawerNavigator.tsx`)
- 🍔 → `<Icon name="fast-food" />` (header)
- 🏠 → `<Icon name="home" />`
- 🍔 → `<MaterialCommunityIcons name="hamburger" />`
- 🍕 → `<Icon name="pizza" />`
- 🥤 → `<Icon name="beer" />`
- 🍟 → `<MaterialCommunityIcons name="french-fries" />`
- 🍰 → `<Icon name="ice-cream" />`
- 👤 → `<Icon name="person" />`
- 📦 → `<Icon name="receipt" />`
- ❤️ → `<Icon name="heart" />`
- 📍 → `<Icon name="location" />`
- 💬 → `<Icon name="chatbubbles" />`
- ⚙️ → `<Icon name="settings" />`
- ℹ️ → `<Icon name="information-circle" />`
- 🚪 → `<Icon name="log-out" />`

#### MenuScreen (`src/screens/menuscreen/index.tsx`)
- ☰ → `<Icon name="menu" />`
- 🔍 → `<Icon name="search" />`
- Category emojis → Dynamic icons based on category type
- 🍟 → `<MaterialCommunityIcons name="french-fries" />`
- 🍔 → `<MaterialCommunityIcons name="hamburger" />`
- ⭐ → `<Icon name="star" />`

#### ProductDetailsScreen (`src/screens/productdetails/index.tsx`)
- ← → `<Icon name="arrow-back" />`
- 🤍 → `<Icon name="heart-outline" />`
- 🍔 → `<MaterialCommunityIcons name="hamburger" />`
- ⭐ → `<Icon name="star" />`
- 🌶️ → `<MaterialCommunityIcons name="chili-hot" />`
- 🥬 → `<MaterialCommunityIcons name="leaf" />`
- 🍄 → `<MaterialCommunityIcons name="mushroom" />`
- ✓ → `<Icon name="checkmark" />`

#### CartScreen (`src/screens/cartscreen/index.tsx`)
- 🍔 → `<MaterialCommunityIcons name="hamburger" />`
- 🍜 → `<MaterialCommunityIcons name="noodles" />`

## Next Steps - IMPORTANT!

### For Android:
1. **Clean the build**:
   ```bash
   cd android
   ./gradlew clean
   cd ..
   ```

2. **Rebuild the app**:
   ```bash
   npm run android
   ```

### For iOS (if you plan to support it):
1. **Install pods**:
   ```bash
   cd ios
   pod install
   cd ..
   ```

2. **Rebuild the app**:
   ```bash
   npm run ios
   ```

## Icon Customization
All icons can be customized with:
- `size`: Number (e.g., `24`, `32`)
- `color`: String (e.g., `"#FF6B6B"`, `"#999"`)

Example:
```tsx
<Icon name="home" size={24} color="#FF6B6B" />
```

## Available Icon Sets
You can explore more icons at:
- Ionicons: https://ionic.io/ionicons
- Material Community Icons: https://pictogrammers.com/library/mdi/

## Troubleshooting
If icons don't appear:
1. Make sure you've run `./gradlew clean` in the android folder
2. Rebuild the app completely
3. Clear Metro bundler cache: `npm start -- --reset-cache`
