# Drawer Navigation Setup

## Changes Made

### 1. Installed Dependencies
- `@react-navigation/drawer@^6.7.2`
- `react-native-gesture-handler@^2.28.0`
- `react-native-reanimated@3.15.0` (downgraded from 4.x to avoid worklets dependency issues)

### 2. Created DrawerNavigator
- **File**: `src/navigation/DrawerNavigator.tsx`
- Custom drawer with burger shop-specific menu items:
  - **Menu Section**: Home, Burgers, Pizza, Drinks, Sides, Desserts
  - **Account Section**: My Profile, My Orders, Favorites, Delivery Address
  - **Support Section**: Help & Support, Settings, About Us
  - **Logout Button** at the bottom

### 3. Updated Navigation Structure
- **RootNavigator**: Now uses `DrawerNav` instead of `MainTabs`
- **Navigation Types**: Added `DrawerParamList` type
- **SplashScreen**: Updated to navigate to `DrawerNav`

### 4. Updated MenuScreen
- Added hamburger menu icon (☰) on the left side
- Menu icon opens the drawer when clicked
- Cart icon remains on the right side
- Header title is now centered

### 5. Configuration Files
- **App.tsx**: Added `react-native-gesture-handler` import at the top
- **babel.config.js**: Added `react-native-reanimated/plugin`

## How to Use

1. **Open Drawer**: Click the hamburger menu icon (☰) in the MenuScreen header
2. **Navigate**: Select any menu item from the drawer
3. **Close Drawer**: Swipe left or tap outside the drawer

## Important Notes

⚠️ **After these changes, you need to:**
1. Clear the cache: `npm start -- --reset-cache`
2. Rebuild the app:
   - Android: `npm run android`
   - iOS: `npm run ios`

This is required because we added new native dependencies (gesture-handler and reanimated) and modified babel.config.js.
