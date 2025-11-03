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

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
