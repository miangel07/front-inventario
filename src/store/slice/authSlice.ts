import { AuthState, AuthUserType } from '@/types/authTypes/authTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  tempUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state, action: PayloadAction<{ user: AuthUserType | null; token: string | null }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = !!action.payload.token;
      state.isLoading = false;
    },
    login: (state, action: PayloadAction<{ user: AuthUserType; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.tempUser = null;
    },
    setTempUser: (state, action: PayloadAction<AuthUserType>) => {
      state.tempUser = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },
    confirmStorage: (state, action: PayloadAction<{ user: AuthUserType; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.tempUser = null;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.tempUser = null;
      state.isAuthenticated = false;
    },
    clearTempUser: (state) => {
      state.tempUser = null;
    },
    updateUser: (state, action: PayloadAction<AuthUserType>) => {
      if (state.user) {
        state.user = action.payload;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  initializeAuth,
  login,
  setTempUser,
  confirmStorage,
  logout,
  clearTempUser,
  updateUser,
  setLoading,
} = authSlice.actions;

// Selectores
export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectUserRole = (state: { auth: AuthState }) => state.auth.user?.role;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectTempUser = (state: { auth: AuthState }) => state.auth.tempUser;
export const selectAuthIsLoading = (state: { auth: AuthState }) => state.auth.isLoading;

export default authSlice.reducer;