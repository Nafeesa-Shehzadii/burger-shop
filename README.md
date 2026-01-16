This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Firebase Authentication Setup

This app uses Firebase Authentication for user management. Follow these steps to set it up:

## 1. Install Dependencies

```bash
npm install
```

## 2. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the wizard
3. Enable **Email/Password** authentication:
   - Go to Authentication → Sign-in method
   - Enable Email/Password
4. Enable **Google Sign-In**:
   - In the same Sign-in method page
   - Enable Google
   - Enter support email
   - Click Save
5. Get your **Web Client ID**:
   - Go to Project Settings (gear icon) → General
   - Scroll to "Your apps" section
   - Find "Web API Key" or add a Web app if needed
   - Copy the Web Client ID (looks like: `xxxxx.apps.googleusercontent.com`)

## 3. Configure Android

1. In Firebase Console, add an Android app
2. Package name: `com.burgershop`
3. Download `google-services.json`
4. Place it in: `android/app/google-services.json`
5. Rebuild the app:
   ```bash
   cd android
   gradlew clean
   cd ..
   npm run android
   ```

## 4. Configure iOS

1. In Firebase Console, add an iOS app
2. Bundle ID: `com.burgershop`
3. Download `GoogleService-Info.plist`
4. Open Xcode: `open ios/burgershop.xcworkspace`
5. Drag `GoogleService-Info.plist` into the project (check "Copy items if needed")
6. Install pods and run:
   ```bash
   cd ios
   pod install
   cd ..
   npm run ios
   ```

## 5. Test Authentication

- Open the app
- Sign up with email and password
- Verify user appears in Firebase Console → Authentication → Users
- Test login and logout

## Important Notes

⚠️ **Security:** Add these files to `.gitignore`:

```
android/app/google-services.json
ios/GoogleService-Info.plist
```

## 6. Configure Google Sign-In

1. Open `App.tsx`
2. Replace `YOUR_WEB_CLIENT_ID_HERE` with your actual Web Client ID from Firebase
3. The Web Client ID looks like: `123456789-abcdefg.apps.googleusercontent.com`

**For Android SHA-1 (Required for Google Sign-In):**

Get your debug SHA-1:

```bash
cd android
gradlew signingReport
```

Copy the SHA-1 from the debug variant and add it to Firebase:

1. Go to Firebase Console → Project Settings
2. Select your Android app
3. Click "Add fingerprint"
4. Paste the SHA-1
5. Download the new `google-services.json` and replace the old one

## Features Implemented

- ✅ Email/Password Sign Up
- ✅ Email/Password Login
- ✅ **Google Sign-In** (One-tap authentication)
- ✅ Logout
- ✅ Session persistence
- ✅ Error handling with user-friendly messages

## Troubleshooting

**Android: "google-services.json is missing"**

- Ensure file is in `android/app/` directory
- Run `cd android && gradlew clean`

**iOS: "GoogleService-Info.plist not found"**

- Make sure file is added to Xcode project
- Run `cd ios && pod install`

**"Default FirebaseApp is not initialized"**

- Check that Google Services plugin is applied
- Verify config files are in correct locations
- Clean and rebuild

For detailed setup instructions, see [React Native Firebase Docs](https://rnfirebase.io/).

---

# Firebase Firestore Database Setup

This guide will help you integrate Firebase Firestore for storing and managing app data.

## 1. Install Firestore Package

```bash
npm install @react-native-firebase/firestore
```

### For Android

No additional setup needed if Firebase Auth is already configured.

### For iOS

```bash
cd ios && pod install && cd ..
```

## 2. Enable Firestore in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click on "Firestore Database" in the left menu
4. Click "Create database"
5. Choose "Start in test mode" (for development)
6. Select a location for your database

## 3. Set Up Security Rules

In Firebase Console → Firestore Database → Rules, add:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Menu items - anyone can read, authenticated users can write
    match /menuItems/{itemId} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Orders - users can read/create their own orders
    match /orders/{orderId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
      allow update: if request.auth != null;
    }

    // Reviews - anyone can read, authenticated users can create
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth != null && resource.data.userId == request.auth.uid;
    }

    // Favorites - users can manage their own
    match /favorites/{favoriteId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 4. Database Structure

### Collections:

#### `users`

- Stores user profile information
- Document ID: Firebase Auth UID

#### `menuItems`

- Stores burger menu items
- Fields: itemName, itemDescription, itemPrice, imageUrl, restaurantID, etc.

#### `orders`

- Stores customer orders
- Fields: userId, items, totalAmount, status, createdAt, etc.

#### `reviews`

- Stores item reviews and ratings
- Fields: userId, itemId, rating, comment, createdAt

#### `favorites`

- Stores user's favorite items
- Document ID: `userId_itemId`

## 5. Create Firebase Service

Create `src/services/firebaseService.ts` with helper functions for database operations.

See the implementation files for:

- User profile management
- Menu items CRUD operations
- Order creation and tracking
- Reviews and ratings
- Favorites management

## 6. Usage Examples

### Sync User Data on Signup

```typescript
import { createOrUpdateUserProfile } from './services/firebaseService';

await createOrUpdateUserProfile(userId, {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1234567890',
});
```

### Fetch Menu Items

```typescript
import { getMenuItems } from './services/firebaseService';

const items = await getMenuItems();
```

### Create an Order

```typescript
import { createOrder } from './services/firebaseService';

const orderId = await createOrder({
  userId: user.id,
  userName: user.name,
  userEmail: user.email,
  items: cartItems,
  totalAmount: 25.99,
  status: 'pending',
});
```

### Real-time Order Updates

```typescript
import { subscribeToUserOrders } from './services/firebaseService';

const unsubscribe = subscribeToUserOrders(userId, orders => {
  console.log('Orders updated:', orders);
});

// Cleanup
return () => unsubscribe();
```

## 7. Features Available

- ✅ User profile sync with Firestore
- ✅ Menu items management
- ✅ Order creation and tracking
- ✅ Real-time order updates
- ✅ Reviews and ratings system
- ✅ Favorites management
- ✅ Offline data persistence (built-in)

## Troubleshooting

**Permission Denied Error:**

- Check Firestore security rules
- Ensure user is authenticated

**Module Not Found:**

- Run `npm install @react-native-firebase/firestore`
- Rebuild the app

**Index Required Error:**

- Firebase will provide a link to create the required index
- Click the link and create the index

---

# Camera Permissions Setup with react-native-permissions

This app uses [`react-native-permissions`](https://www.npmjs.com/package/react-native-permissions) for unified permission handling across iOS and Android. Camera permissions are required for the review feature where users can take photos of their burgers.

## Why react-native-permissions?

- **Unified API**: Single API for iOS, Android, and Windows permissions
- **Better Control**: More granular control over permission states (unavailable, denied, blocked, granted, limited)
- **Settings Integration**: Built-in `openSettings()` to guide users when permissions are blocked
- **Type Safety**: Full TypeScript support with typed permission constants
- **Platform Agnostic**: Automatically handles platform-specific permission flows

## 1. Installation

The package is already installed. If you need to reinstall:

```bash
npm install react-native-permissions
```

## 2. iOS Configuration

### Step 2.1: Update Podfile

The `ios/Podfile` has been configured with the permission setup script:

```ruby
# Transform this into a `node_require` generic function:
def node_require(script)
  # Resolve script with node to allow for hoisting
  require Pod::Executable.execute_command('node', ['-p',
    "require.resolve(
      '#{script}',
      {paths: [process.argv[1]]},
    )", __dir__]).strip
end

# Use it to require both react-native's and this package's scripts:
node_require('react-native/scripts/react_native_pods.rb')
node_require('react-native-permissions/scripts/setup.rb')

platform :ios, min_ios_version_supported
prepare_react_native_project!

# Setup permissions - only Camera is needed for this app
setup_permissions([
  'Camera',
  # 'PhotoLibrary',
  # 'PhotoLibraryAddOnly',
])
```

**Important Notes:**

- Only permissions listed in `setup_permissions([])` will be included in your app
- This keeps your app lightweight and avoids unnecessary permission requests
- Must run `pod install` after any changes to this configuration

### Step 2.2: Install Pods

After updating the Podfile, install the pods:

```bash
cd ios
bundle exec pod install
cd ..
```

### Step 2.3: Info.plist Configuration

The `ios/burgershop/Info.plist` already contains the required usage descriptions:

```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access to let you take photos of your burgers for reviews</string>
<key>NSPhotoLibraryUsageDescription</key>
<string>We need access to your photo library to let you share burger photos in reviews</string>
<key>NSPhotoLibraryAddUsageDescription</key>
<string>We need permission to save burger photos to your library</string>
```

**Best Practices:**

- Keep descriptions clear and user-friendly
- Explain exactly why the permission is needed
- Apple reviews apps for appropriate permission usage

## 3. Android Configuration

### Step 3.1: AndroidManifest.xml

The `android/app/src/main/AndroidManifest.xml` already includes camera permissions:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

**Note:** On Android 6.0+ (API 23+), these permissions are requested at runtime, not just at install time.

## 4. Permission Flow Implementation

### How It Works

The app implements a comprehensive permission flow:

```
┌─────────────────────────┐
│   User Opens Camera     │
└───────────┬─────────────┘
            │
            ▼
┌─────────────────────────┐
│  Check Permission       │
│  (check function)       │
└───────────┬─────────────┘
            │
    ┌───────┴───────┐
    │               │
    ▼               ▼
GRANTED        NOT GRANTED
    │               │
    │       ┌───────┴────────┐
    │       │                │
    │       ▼                ▼
    │   DENIED           BLOCKED
    │       │                │
    │       ▼                ▼
    │   Request         Open Settings
    │   Permission      Dialog
    │       │                │
    │   ┌───┴────┐           │
    │   │        │           │
    │   ▼        ▼           │
    │ GRANT   DENY           │
    │   │        │           │
    └───┴────────┴───────────┘
            │
            ▼
    ┌─────────────┐
    │ Show Camera │
    └─────────────┘
```

### Permission States

The library provides 5 possible permission states:

1. **RESULTS.UNAVAILABLE**: Feature not available on device
2. **RESULTS.DENIED**: Permission not requested yet or denied but can be requested again
3. **RESULTS.BLOCKED**: Permission permanently denied (iOS) or denied with "Don't ask again" (Android)
4. **RESULTS.GRANTED**: Permission granted
5. **RESULTS.LIMITED**: Permission granted with limitations (iOS 14+ Photos)

### Code Implementation

See `src/components/camera/index.tsx` for the full implementation:

```typescript
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

// Platform-specific permission constant
const CAMERA_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.CAMERA,
  android: PERMISSIONS.ANDROID.CAMERA,
});

// Check permission on component mount
const checkCameraPermission = async () => {
  const status = await check(CAMERA_PERMISSION);

  if (status === RESULTS.DENIED) {
    // Auto-request if denied
    const requestStatus = await request(CAMERA_PERMISSION);
    setPermissionStatus(requestStatus);
  }
};

// Handle blocked permissions
if (status === RESULTS.BLOCKED) {
  Alert.alert(
    'Permission Blocked',
    'Camera permission is blocked. Please enable it in your device settings.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Open Settings', onPress: () => openSettings() },
    ],
  );
}
```

## 5. User Experience Flow

### First Time User

1. Opens review screen and taps "Take Photo"
2. Camera component checks permission (DENIED)
3. Automatically requests permission
4. System dialog appears
5. User grants → Camera opens
6. User denies → Shows "Grant Permission" button

### Permission Blocked

1. User previously denied with "Don't ask again" (Android) or denied multiple times (iOS)
2. Shows "Permission Blocked" message
3. "Open Settings" button appears
4. Taps button → Opens app settings
5. User can manually enable camera permission

### Permission Unavailable

1. Device doesn't have a camera (rare)
2. Shows "Camera is not available on this device"
3. Only "Close" button available

## 6. Testing Permissions

### iOS Simulator

- Reset permissions: Device → Erase All Content and Settings
- Or: Settings → General → Reset → Reset Location & Privacy

### Android Emulator

- Settings → Apps → burgershop → Permissions → Camera
- Toggle permissions on/off to test different states

### Physical Devices

- iOS: Settings → burgershop → Camera
- Android: Settings → Apps → burgershop → Permissions → Camera

## 7. Adding More Permissions

If you need additional permissions in the future:

### iOS

1. Add permission to `setup_permissions([])` in Podfile:

```ruby
setup_permissions([
  'Camera',
  'PhotoLibrary',      # Add this
  'Microphone',        # Or this
])
```

2. Run `cd ios && bundle exec pod install`

3. Add usage description to Info.plist

### Android

1. Add permission to AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
```

2. Use in code:

```typescript
import { PERMISSIONS } from 'react-native-permissions';

const MIC_PERMISSION = Platform.select({
  ios: PERMISSIONS.IOS.MICROPHONE,
  android: PERMISSIONS.ANDROID.RECORD_AUDIO,
});
```

## 8. Troubleshooting

**iOS: "Permission not working after pod install"**

- Clean build: `cd ios && rm -rf Pods Podfile.lock && pod install`
- Clean Xcode: Product → Clean Build Folder

**Android: "Permission denied immediately"**

- Check AndroidManifest.xml has the permission declared
- Verify targetSdkVersion is 23 or higher in build.gradle
- On Android 13+, some permissions require additional setup

**"openSettings() not working"**

- This is a platform limitation on some Android versions
- The function will attempt to open settings but may fallback to app info

**"Permission state not updating"**

- Make sure you're using `await` with check/request functions
- State updates are asynchronous

## 9. Available Permissions Reference

### iOS Permissions

- `PERMISSIONS.IOS.CAMERA`
- `PERMISSIONS.IOS.PHOTO_LIBRARY`
- `PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY`
- `PERMISSIONS.IOS.MICROPHONE`
- `PERMISSIONS.IOS.LOCATION_WHEN_IN_USE`
- `PERMISSIONS.IOS.LOCATION_ALWAYS`
- [See full list](https://github.com/zoontek/react-native-permissions#ios)

### Android Permissions

- `PERMISSIONS.ANDROID.CAMERA`
- `PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE`
- `PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE`
- `PERMISSIONS.ANDROID.RECORD_AUDIO`
- `PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION`
- [See full list](https://github.com/zoontek/react-native-permissions#android)

## 10. Best Practices

✅ **DO:**

- Request permissions only when needed (just-in-time)
- Provide clear explanations in usage descriptions
- Handle all permission states (denied, blocked, unavailable)
- Offer "Open Settings" for blocked permissions
- Test on both iOS and Android

❌ **DON'T:**

- Request all permissions on app launch
- Use generic permission descriptions
- Ignore blocked/unavailable states
- Assume permissions are always granted
- Forget to add permissions to Podfile (iOS) or Manifest (Android)

---

# Generating a Signed APK for Production

## What is a Signed APK?

A **Signed APK** is an Android application package that has been cryptographically signed with your release keystore certificate. This signature:

- Verifies the app's authenticity and publisher identity
- Is **required** for Google Play Store distribution
- Ensures the app hasn't been tampered with after signing
- Allows users to trust the app's source

## Dev APK vs Signed APK

| Feature          | Dev/Debug APK                       | Signed/Release APK         |
| ---------------- | ----------------------------------- | -------------------------- |
| **Keystore**     | Auto-generated debug keystore       | Your production keystore   |
| **Purpose**      | Testing and development             | Production distribution    |
| **Optimization** | No minification                     | Optimized and minified     |
| **Play Store**   | ❌ Cannot publish                   | ✅ Required for publishing |
| **Expiry**       | Debug keystore expires after 1 year | Valid for 25+ years        |
| **Security**     | Low (shared debug key)              | High (unique to you)       |

## Step 1: Generate Your Release Keystore

⚠️ **CRITICAL**: Keep your keystore file and passwords safe! If you lose them, you cannot update your app on Play Store.

### Generate the Keystore

Open a terminal in your project root and run:

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore burgershop-release.keystore -alias burgershop-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

You'll be prompted for:

- **Keystore password**: Choose a strong password (remember this!)
- **Key password**: Can be the same as keystore password
- **Name**: Your name or company name
- **Organizational unit**: Your team/department (e.g., "Development")
- **Organization**: Your company name
- **City**: Your city
- **State**: Your state/province
- **Country code**: Two-letter country code (e.g., "US", "PK")

This creates `burgershop-release.keystore` in the `android/app/` directory.

### Backup Your Keystore

1. Copy `burgershop-release.keystore` to a secure location (USB drive, password manager, encrypted cloud storage)
2. Save your passwords securely
3. **Never commit the keystore to Git** (already protected by `.gitignore`)

## Step 2: Configure Gradle Properties

The configuration has already been added to `android/gradle.properties`. Update these values with your actual passwords:

```properties
BURGERSHOP_RELEASE_STORE_FILE=burgershop-release.keystore
BURGERSHOP_RELEASE_KEY_ALIAS=burgershop-key-alias
BURGERSHOP_RELEASE_STORE_PASSWORD=your_actual_keystore_password
BURGERSHOP_RELEASE_KEY_PASSWORD=your_actual_key_password
```

⚠️ **Security Note**: For team projects, consider using environment variables or a secure secrets manager instead of storing passwords in `gradle.properties`.

## Step 3: Get Release SHA-1 for Firebase

For Firebase features (Google Sign-In, etc.) to work in the release APK, you need to add the release SHA-1 to Firebase:

```bash
cd android
.\gradlew signingReport
```

Look for the **SHA-1** under the **release** variant (not debug). Copy it.

### Add SHA-1 to Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon)
4. Select your Android app
5. Click "Add fingerprint"
6. Paste the release SHA-1
7. Download the new `google-services.json` and replace the old one in `android/app/`

## Step 4: Generate the Signed APK

### Option A: Generate APK (Recommended for Testing)

```bash
cd android
.\gradlew assembleRelease
```

The signed APK will be generated at:

```
android/app/build/outputs/apk/release/app-release.apk
```

### Option B: Generate AAB (Required for Play Store)

Google Play Store requires Android App Bundle (AAB) format:

```bash
cd android
.\gradlew bundleRelease
```

The signed AAB will be generated at:

```
android/app/build/outputs/bundle/release/app-release.aab
```

## Step 5: Test the Release APK

### Install on Device

```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

### Test Checklist:

- ✅ App launches successfully
- ✅ Firebase Authentication works (Email/Password and Google Sign-In)
- ✅ Firestore data loads correctly
- ✅ All navigation flows work
- ✅ No crashes or errors
- ✅ App icon and splash screen display correctly

## Step 6: Prepare for Play Store Upload

### Required Assets:

1. **App Bundle**: `app-release.aab` (from Step 4)
2. **App Icon**: 512x512 PNG
3. **Feature Graphic**: 1024x500 PNG
4. **Screenshots**: At least 2 screenshots (phone and/or tablet)
5. **Privacy Policy**: URL to your privacy policy
6. **App Description**: Short and full description

### Version Management:

Before each release, update in `android/app/build.gradle`:

```gradle
defaultConfig {
    applicationId "com.burgershop"
    versionCode 2  // Increment this for each release
    versionName "1.1"  // User-facing version
}
```

## Troubleshooting

**Error: "Keystore file not found"**

- Ensure `burgershop-release.keystore` is in `android/app/` directory
- Check the `BURGERSHOP_RELEASE_STORE_FILE` path in `gradle.properties`

**Error: "Incorrect keystore password"**

- Verify passwords in `gradle.properties` match what you set during keystore generation

**Google Sign-In doesn't work in release**

- Make sure you added the release SHA-1 to Firebase (Step 3)
- Download and replace `google-services.json` after adding SHA-1

**App crashes on startup**

- Check ProGuard rules if `enableProguardInReleaseBuilds = true`
- Test with `enableProguardInReleaseBuilds = false` first

## Quick Reference Commands

```bash
# Generate release APK
cd android && .\gradlew assembleRelease

# Generate release AAB (for Play Store)
cd android && .\gradlew bundleRelease

# Install release APK on device
adb install android/app/build/outputs/apk/release/app-release.apk

# Get release SHA-1
cd android && .\gradlew signingReport

# Clean build
cd android && .\gradlew clean
```

---

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
