import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  lastActivity: number | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  lastActivity: null,
};

const setAuthToken = (token: string) => {
  Cookies.set("authToken", token, { expires: 7 });
};

const removeAuthToken = () => {
  Cookies.remove("authToken");
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      state.token = action.payload;
      state.lastActivity = Date.now();
      setAuthToken(action.payload);
    },
    signOut(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.lastActivity = null;
      removeAuthToken();
    },
    updateActivity(state) {
      state.lastActivity = Date.now();
    },
    initializeAuth(state) {
      const token = Cookies.get("authToken");
      if (token) {
        state.isAuthenticated = true;
        state.token = token;
      }
    },
  },
});

export const { signIn, signOut, updateActivity, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
