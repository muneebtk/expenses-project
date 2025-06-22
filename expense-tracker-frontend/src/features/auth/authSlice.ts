import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export const authReducer = authSlice.reducer;
export default authSlice.reducer;
