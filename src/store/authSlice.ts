import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

// Async actions
export const loginUser =
  (email: string, password: string) => async (dispatch: any) => {
    try {
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise(resolve => setTimeout(() => resolve(undefined), 1000));

      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: email,
      };
      const mockToken = 'mock-jwt-token-' + Date.now();

      // Save to AsyncStorage
      await AsyncStorage.setItem('userToken', mockToken);
      await AsyncStorage.setItem('userData', JSON.stringify(mockUser));

      dispatch(loginSuccess({ user: mockUser, token: mockToken }));
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed' };
    }
  };

export const signupUser =
  (name: string, email: string, password: string, phone?: string) =>
  async (dispatch: any) => {
    try {
      // TODO: Replace with actual API call
      // Simulating API call
      await new Promise(resolve => setTimeout(() => resolve(undefined), 1000));

      const mockUser: User = {
        id: '1',
        name: name,
        email: email,
        phone: phone,
      };
      const mockToken = 'mock-jwt-token-' + Date.now();

      // Save to AsyncStorage
      await AsyncStorage.setItem('userToken', mockToken);
      await AsyncStorage.setItem('userData', JSON.stringify(mockUser));

      dispatch(signupSuccess({ user: mockUser, token: mockToken }));
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: 'Signup failed' };
    }
  };

export const logoutUser = () => async (dispatch: any) => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userData');
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
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