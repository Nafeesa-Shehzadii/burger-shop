import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    signupSuccess: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    logout: state => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
    restoreAuth: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
  },
});

export const { setLoading, loginSuccess, signupSuccess, logout, restoreAuth } =
  authSlice.actions;

// Helper function to get Firebase error messages
const getFirebaseErrorMessage = (error: any): string => {
  // Safely access error code
  const errorCode = error?.code;

  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'This email is already registered. Please login instead.';
    case 'auth/invalid-email':
      return 'Invalid email address format.';
    case 'auth/user-not-found':
      return 'No account found with this email.';
    case 'auth/wrong-password':
      return 'Incorrect password. Please try again.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters.';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection.';
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    default:
      return error?.message || 'An error occurred. Please try again.';
  }
};

// Async actions
export const loginUser =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      // Firebase Authentication
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );

      const firebaseUser = userCredential.user;
      const token = await firebaseUser.getIdToken();

      const user: User = {
        id: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email || email,
      };

      // Save to AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      dispatch(loginSuccess({ user, token }));
      return { success: true };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: getFirebaseErrorMessage(error) };
    }
  };

export const signupUser =
  (name: string, email: string, password: string, phone?: string) =>
  async (dispatch: any) => {
    try {
      // Firebase Authentication - Create user
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );

      const firebaseUser = userCredential.user;

      // Update user profile with display name
      await firebaseUser.updateProfile({
        displayName: name,
      });

      const token = await firebaseUser.getIdToken();

      const user: User = {
        id: firebaseUser.uid,
        name: name,
        email: firebaseUser.email || email,
        phone: phone,
      };

      // Sync user data to Firestore
      await firestore()
        .collection('users')
        .doc(firebaseUser.uid)
        .set({
          id: firebaseUser.uid,
          name,
          email: firebaseUser.email || email,
          phone,
          createdAt: firestore.FieldValue.serverTimestamp(),
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });

      // Save to AsyncStorage
      await AsyncStorage.setItem('userToken', token);
      await AsyncStorage.setItem('userData', JSON.stringify(user));

      dispatch(signupSuccess({ user, token }));
      return { success: true };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, error: getFirebaseErrorMessage(error) };
    }
  };

export const googleSignIn = () => async (dispatch: any) => {
  try {
    console.log('Starting Google Sign-In...');
    
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log('Google Play Services available');

    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();
    console.log('Google Sign-In result:', signInResult ? 'Success' : 'Failed');

    if (!signInResult?.data?.idToken) {
      console.error('No idToken received from Google Sign-In');
      throw new Error('Google Sign-In was cancelled or failed');
    }

    const { idToken } = signInResult.data;
    console.log('Got idToken, creating Firebase credential...');

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    console.log('Signing in with Firebase...');
    const userCredential = await auth().signInWithCredential(googleCredential);

    const firebaseUser = userCredential.user;
    const token = await firebaseUser.getIdToken();

    const user: User = {
      id: firebaseUser.uid,
      name: firebaseUser.displayName || 'User',
      email: firebaseUser.email || '',
    };

    console.log('User signed in successfully:', user.email);

    // TODO: Sync user data to Firestore (uncomment after installing firestore)
    // const userRef = firestore().collection('users').doc(firebaseUser.uid);
    // const userDoc = await userRef.get();
    //
    // if (!userDoc.exists) {
    //   await userRef.set({
    //     id: firebaseUser.uid,
    //     name: firebaseUser.displayName || 'User',
    //     email: firebaseUser.email || '',
    //     photoURL: firebaseUser.photoURL || null,
    //     createdAt: firestore.FieldValue.serverTimestamp(),
    //     updatedAt: firestore.FieldValue.serverTimestamp(),
    //   });
    // } else {
    //   await userRef.update({
    //     updatedAt: firestore.FieldValue.serverTimestamp(),
    //   });
    // }

    // Save to AsyncStorage
    await AsyncStorage.setItem('userToken', token);
    await AsyncStorage.setItem('userData', JSON.stringify(user));

    dispatch(loginSuccess({ user, token }));
    return { success: true };
  } catch (error: any) {
    console.error('Google Sign-In error details:', {
      message: error?.message,
      code: error?.code,
      fullError: error,
    });

    // Handle specific Google Sign-In errors
    if (error.code === '12501') {
      return { success: false, error: 'Google Sign-In was cancelled' };
    }
    if (error.code === '12500') {
      return { success: false, error: 'Google Sign-In configuration error. Please check your setup.' };
    }
    if (error.message && error.message.includes('DEVELOPER_ERROR')) {
      return { success: false, error: 'Google Sign-In setup error. Please check SHA-1 fingerprint in Firebase Console.' };
    }
    if (error.message && error.message.includes('SIGN_IN_CANCELLED')) {
      return { success: false, error: 'Sign-in was cancelled' };
    }

    // Use the helper function for Firebase errors
    return { success: false, error: getFirebaseErrorMessage(error) };
  }
};

export const logoutUser = () => async (dispatch: any) => {
  try {
    // Check if there's a current Firebase user before signing out
    const currentUser = auth().currentUser;
    if (currentUser) {
      await auth().signOut();
    }

    // Always clear AsyncStorage (handles old mock data)
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');

    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
    // Even if logout fails, clear local data
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    dispatch(logout());
  }
};

export const restoreAuthFromStorage = () => async (dispatch: any) => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    const userData = await AsyncStorage.getItem('userData');

    if (token && userData) {
      const user = JSON.parse(userData);
      dispatch(restoreAuth({ user, token }));
    } else {
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.error('Restore auth error:', error);
    dispatch(setLoading(false));
  }
};

export default authSlice.reducer;
