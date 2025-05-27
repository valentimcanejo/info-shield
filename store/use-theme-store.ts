import { Appearance } from "react-native";
import { create } from "zustand";

type ThemeType = "light" | "dark";

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: Appearance.getColorScheme() === "dark" ? "dark" : "light",
  setTheme: (theme) => set({ theme }),
  toggleTheme: () => set({ theme: get().theme === "light" ? "dark" : "light" }),
}));
