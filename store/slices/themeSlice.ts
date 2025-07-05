import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  currentTheme: "light" | "dark";
}

const initialState: ThemeState = {
  currentTheme: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      state.currentTheme = state.currentTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", state.currentTheme);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
